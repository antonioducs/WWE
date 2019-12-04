import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import IconMaquina from '../../assets/maquina.svg';

export default class  CardHorario extends Component {

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
                    <IconMaquina fill={'#4071f4'} />
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Dia: </Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Horário: </Text>
                    </View>
                    <View>

                        <Text
                            style={styles.txtCard}
                        >
                             {this.props.date}
                        </Text>
                        <Text
                            style={styles.txtCard}
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
        height: 100,
        borderRadius: 10,
        marginHorizontal: 30,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderColor: '#9cb5f9',
        borderWidth: 0.8,
        },
    txtCard: {
        fontSize: 16
    },
    contentCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',   
        padding: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
})