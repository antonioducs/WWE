import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import { SCREEN_HEIGHT } from '../config/constants';
import theme from '../styles/theme';
import imgPerfil from '../../assets/user/perfil.jpg';


export default class UserDetails extends Component {

    state = {
        img: imgPerfil,
        nome: "Leonardo Batista",
        apt: 2
    };

    render() {
        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.txtInfo}>Suas informações:</Text>
                    <View style={styles.info}>
                        <Image source={imgPerfil} style={styles.img} />

                        <Text style={styles.txtApt}>{this.state.nome}</Text>
                        <View style={styles.containerTxt}>
                            <Text style={styles.txtApt}>Apt: </Text>
                            <Text style={styles.txt}>{this.state.apt}</Text>
                        </View>
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: theme.primaryColor,
        height: SCREEN_HEIGHT / 3.5,
    },
    info: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        borderRadius: 50,
        height: 100,
        width: 100,
        borderColor: theme.secondaryColor,
        borderWidth: 2
    },
    txt: {
        color: theme.secondaryColor,
        fontSize: 14
    },
    containerTxt: {
        display: 'flex',
        flexDirection: 'row'
    },
    txtApt: {
        color: theme.secondaryColor,
        fontSize: 14,
        fontWeight: 'bold'
    },
    txtInfo: {
        color: theme.secondaryColor,
        fontWeight: 'bold',
        fontSize: 14
    }
});
