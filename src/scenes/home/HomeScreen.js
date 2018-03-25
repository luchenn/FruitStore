import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList} from "react-native";
import FruitItem from './ItemView'
import {connect} from "react-redux";
import {fetchItems, invalidateStore, selectStore} from "../../redux/actions/fetcher";
import theme from "../../common/Styles";


class ListScreen extends Component {
    constructor(props) {
        super(props);
    }

    _shouldFetchItems = () => {
        const items = this.props.fruitItems
        if (!items || items.length === 0) {
            return true
        } else if (items.isFetching) {
            return false
        } else {
            return items.didInvalidate
        }
    }

    _fetchItemsIfNeeded = () => {
        if (this._shouldFetchItems()) {
            return this.props.fetchItems(this.props.selectedStore)
        }
    }

    componentDidMount() {
        this._fetchItemsIfNeeded()
    }


    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item, index}) => (
        <FruitItem onPress={() => this.props.navigation.navigate('Details', {item})}
                   name={item.name} price={item.price} image={{uri: item.image}} key={index}/>
    );

    _onRefresh() {
        this.props.invalidateStore(this.props.selectedStore)
        this._fetchItemsIfNeeded()
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={[styles.lineStyle]}>
                    <Text style={[styles.lineTextStyle]}>Welcome to my Fruit Store!</Text>
                </View>

                <FlatList
                    data={this.props.fruitItems}
                    numColumns={2}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh.bind(this)}
                    refreshing={this.props.isFetching}
                />
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    const { selectedStore, itemsByStore } = state.fetcherReducer;
    const {
        isFetching,
        lastUpdated,
        fruitItems
    } = itemsByStore[selectedStore] || {
        isFetching: true,
        fruitItems: []
    }

    return {
        selectedStore,
        fruitItems,
        isFetching,
        lastUpdated,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItems: (store) => dispatch(fetchItems(store)),
        selectStore: (store) => dispatch(selectStore(store)),
        invalidateStore: (store) => dispatch(invalidateStore(store))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    lineStyle: {
        //flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lineTextStyle: {
        color: theme.color,
    }
});