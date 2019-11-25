import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import theme from '../styles/theme';

class UserDetailsScreen extends Component {

    render() {
        return (
            <View>
                <Text> UserDetailsScreen </Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps)(UserDetailsScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.primaryColor,
        color: theme.secondaryColor
    }
});

