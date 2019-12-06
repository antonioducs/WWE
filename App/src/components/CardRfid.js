import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import Ripple from 'react-native-material-ripple';

export default class CardRfids extends Component {

    render() {
        return (
            <Ripple
                style={[styles.card, {
                    backgroundColor: "#4169E1"
                }]
                }
                rippleContainerBorderRadius={20}
                onPress={this.props.onPress} >

                <View style={styles.contentCard} >
                    <View>
                        <Image
                            source={require('../../assets/rfid.png')}
                            style={styles.img}
                        />
                    </View>
                    <View style={{ flexDirection: "column", marginLeft: 20 }}>
                        <Text style={styles.txtCard}>
                            Código: {this.props.rfid.id}
                        </Text>
                        <Text style={styles.txtCard}>
                            Apartamento:  {this.props.rfid.apt}
                        </Text>
                        <Text style={styles.txtCard}>
                            Usuário: {this.props.rfid.name}
                        </Text>
                    </View>
                </View>
            </Ripple>
        );
    }

}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 90,
        borderRadius: 10,
        padding: 15,
        margin: 8,
        marginVertical: 4,
        alignItems: 'center',
    },
    contentCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    txtCard: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    img: {
        borderRadius: 50,
        height: 70,
        width: 70,
        borderColor: '#4169E1',
        borderWidth: 2
    },
})