import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const { viewStyle, textStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.title}</Text>
        </View>
    );
};


const styles = {
    textStyle: {
        fontSize: 30,
        color: 'black'
    },
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        elevation: 20,
        paddingTop: 30,
        paddingBottom: 30,
        position: 'relative'
    }
};

export default Header;
