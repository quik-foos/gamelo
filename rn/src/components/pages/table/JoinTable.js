import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class JoinTable extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Join {this.props.navigation.state.params.name}'s Table</Text>
            </View>
        );
    }
}
export default JoinTable;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});