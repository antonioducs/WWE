import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import IconMaquina from '../../assets/maquina.svg';

export default class CardHorario extends Component {

    render() {
        return (
            <Ripple
                style={[styles.card, {
                    backgroundColor: this.props.primaryColor
                }]
                }
                rippleContainerBorderRadius={20}
                onPress={this.props.onPress}>
                <View style={styles.contentCard} >
                    <IconMaquina fill={this.props.secondaryColor} />
                    <View>

                        <Text
                            style={[styles.txtCard, {color: this.props.secondaryColor}]}
                        >
                            Dia {this.props.date}
                        </Text>
                        <Text
                            style={[styles.txtCard, {color: this.props.secondaryColor}]}
                        >
                            {this.props.time}
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
        height: 130,
        borderRadius: 10,
        padding: 15,
        margin: 8,
        marginVertical: 4
    },
    contentCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 15
    },
    txtCard: {
        fontSize: 16,
        fontWeight: 'bold'
    },
})