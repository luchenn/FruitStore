import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";

class CartScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> This is Cart Screen under development!</Text>
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

export default CartScreen;