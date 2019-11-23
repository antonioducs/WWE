import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';

import theme from '../styles/theme';
import Logout from '../../assets/logout.svg';


export default class HeaderUser extends Component {

    openCalendar = () => {
        this.props.navigation.navigate('CalendarScreen');
    }
    render() {
        return (
            <View style={styles.container}>
                <Logout fill={theme.primaryColor} height={27} />
                <Ripple
                    style={styles.button}
                    rippleContainerBorderRadius={10}
                    onPress={this.openCalendar}>
                    <Text style={styles.txtButton}>+</Text>
                </Ripple>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: theme.secondaryColor,
        padding: 5
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        backgroundColor: theme.primaryColor
    },
    txtButton: {
        fontWeight: 'bold',
        fontSize: 14,
        color: theme.secondaryColor
    }
});
