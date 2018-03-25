import React from "react";
import {StackNavigator, TabBarBottom, TabNavigator} from 'react-navigation';
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";

import ListScreen from "../scenes/home/HomeScreen";
import DetailScreen from "../scenes/detail/DetailScreen";
import CartScreen from "../scenes/cart/CartScreen";
import theme from "../common/Styles";
import TabBarItem from "./TabBarItem";



const ListStack = StackNavigator(
    {
        Lists: {
            screen: ListScreen,
        },
        Details: {
            screen: DetailScreen,
        },
    },
    {
        navigationOptions: {
            animationEnabled: true,
            gesturesEnabled: true
        },
        mode: 'card',
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        })
    }
);


const AppNavigator = TabNavigator(
    {
        Home: {
            screen: ListStack,
            navigationOptions: ({navigation}) => (
                {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused, tintColor}) =>
                        (
                            <TabBarItem
                                tintColor={tintColor}
                                focused={focused}
                                selectedImage = {require('../img/homeSelect.png')}
                                normalImage = {require('../img/home.png')}
                            />
                        )

                }
            )
        },
        Cart: {
            screen: CartScreen,
            navigationOptions: ({navigation}) => (
                {
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({focused, tintColor}) =>
                        (
                            <TabBarItem
                                tintColor={tintColor}
                                focused={focused}
                                selectedImage = {require('../img/cartSelect.png')}
                                normalImage = {require('../img/cart.png')}
                            />
                        )

                }
            )
        },
    },

    // tabScreen settings
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: theme.color,
            inactiveTintColor: '#979797',
            labelStyle: {
                fontSize: 12,
            },
        }

    }
);


export default AppNavigator;