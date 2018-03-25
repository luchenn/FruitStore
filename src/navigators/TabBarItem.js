import React from 'react';
import { Image } from 'react-native';

export default TabBarItem = ({focused, tintColor, selectedImage, normalImage}) => {
    return (
        <Image
            source = {focused ? selectedImage : normalImage}
            style={{ tintColor: tintColor, width: 25, height: 25 }}
        />
    )
}