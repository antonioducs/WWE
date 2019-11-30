import React, { Component, Fragment } from 'react';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Ripple from 'react-native-material-ripple';
import { Button } from 'react-native-elements';
import { View, StyleSheet, Text, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { SCREEN_HEIGHT } from '../config/constants';
import theme from '../styles/theme';

export default class TimesScreen extends Component {

    state = {
        list: [],            
        descReservaNumber: -1,
        day: 10,
        month: 10,
        year: 2019,
        daySemana: 1,
        semana: ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
    };

    componentDidMount() {
        const { day } = this.props.navigation.state.params;
        const dSemana = new Date(day.year, (day.month - 1), day.day)

        this.setState({
            day: day.day,
            month: day.month,
            year: day.year,
            daySemana: dSemana.getDay()
        })
    }

    onClickCard = (key) => {
        const atual = this.state.descReservaNumber;
        const novo = atual === key ? -1 : key;
        this.setState({
            descReservaNumber: novo
        });
    }

    render() {
        return (
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.txtMes}>{this.state.day}-{this.state.month}-{this.state.year}</Text>
                        <Text style={styles.txtAno}>{this.state.semana[this.state.daySemana]}</Text>
                    </View>
                </View>
                <View style={{
                    paddingBottom: 20
                }}>
                    {this.state.list.length && this.state.list.map((item, index) => {
                        return (

                            <Fragment key={index.toString()}>

                                <Ripple
                                    style={styles.card}
                                    onPress={() => this.onClickCard(index)}
                                    rippleContainerBorderRadius={20}
                                >
                                    <LinearGradient
                                        style={styles.contentCard}
                                        start={{ x: 1, y: 0 }}
                                        end={{ x: 0.2, y: 0 }}
                                        colors={[item.qtdMaquinas === item.reservasDisponiveis ? 'green' : 'red', theme.primaryColor]}
                                    >
                                        <Text style={styles.txt}>{item.hora}h{item.min}min</Text>
                                    </LinearGradient>
                                </Ripple>

                                <Collapsible collapsed={!(this.state.descReservaNumber === index)}>
                                    <LinearGradient
                                        style={styles.viewReservar}
                                        start={{ x: 1, y: 0 }}
                                        end={{ x: 0.2, y: 0 }}
                                        colors={[theme.primaryColor, theme.textGray]}
                                    >
                                        <View style={styles.contentReserva}>
                                           {/* <Image
                                                sourcer={}
                                                style={styles.img}
                                           />*/}
                                            <Button buttonStyle={styles.btnReservar}
                                                title="Reservar"
                                                disabled
                                            />
                                        </View>
                                    </LinearGradient>
                                </Collapsible>

                            </Fragment>

                        );
                    })}

                </View>
            </Animated.ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: theme.primaryColor,
        height: SCREEN_HEIGHT / 5,
        borderBottomStartRadius: 150
    },
    contentHeader: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginLeft: 75,
        marginTop: 75
    },
    txtMes: {
        color: theme.secondaryColor,
        fontSize: 50,
        marginTop: 25
    },
    txtAno: {
        color: theme.secondaryColor
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 130,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10
    },
    contentCard: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    img: {
        borderRadius: 50,
        height: 50,
        width: 50,
        borderColor: theme.secondaryColor,
        borderWidth: 1,
        margin: 10
    },
    txt: {
        color: theme.secondaryColor,
        fontSize: 36,
        fontWeight: 'bold'
    },
    viewReservar: {
        alignItems: 'center',
        alignContent: 'center',
        height: 180,
        padding: 15,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius: 14,
        marginLeft: 18,
        marginRight: 18,
        marginBottom: 10
    },
    contentReserva: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    txtReservar: {
        color: theme.secondaryColor,
        fontWeight: 'bold',
        fontSize: 16
    },
    btnReservar: {
        backgroundColor: theme.primaryColor,
        paddingHorizontal: 20
    }
});