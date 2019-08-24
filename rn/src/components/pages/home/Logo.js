import React from 'react';
import { View, Image } from 'react-native';
export default Logo = () =>
    <Image
        style={{
            width: '100%',
            height: undefined,
            aspectRatio: 5
        }}
        source={require('../../../../assets/images/gamelo-01.png')}
    />;