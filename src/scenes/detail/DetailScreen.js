import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";

class DetailScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {name, price, image} = this.props.navigation.state.params.item;
        return (
            <View style={styles.container}>
                <Text> This is Detail Screen for {name}!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
});

export default DetailScreen;