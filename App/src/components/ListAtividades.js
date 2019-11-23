import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import Ripple from 'react-native-material-ripple';


import theme from '../styles/theme';
import IconMaquina from '../../assets/maquina.svg';


export default class ListAtividades extends Component {

    state = {
        list: [
            {
                machineNumber: 1,
                date: '25-09-2019',
                time: '19h30min'
            },
            {
                machineNumber: 1,
                date: '25-09-2019',
                time: '20h30min'
            },
            {
                machineNumber: 1,
                date: '26-09-2019',
                time: '9h30min'
            },
            {
                machineNumber: 2,
                date: '27-09-2019',
                time: '6h30min'
            },
            {
                machineNumber: 2,
                date: '27-09-2019',
                time: '7h30min'
            },
            {
                machineNumber: 2,
                date: '27-09-2019',
                time: '7h30min'
            },
            {
                machineNumber: 2,
                date: '27-09-2019',
                time: '7h30min'
            },
            {
                machineNumber: 2,
                date: '27-09-2019',
                time: '7h30min'
            }]
    };


    render() {

        return (
            <View style={styles.safeArea}>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Atividades</Text>
                </View>
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.props.scrollY } } }], {
                        useNativeDriver: true
                    })}
                >
                    {this.state.list.length && this.state.list.map((item, key) => {
                        return (
                            <Fragment key={key.toString()}>
                                <View>
                                    <Ripple
                                        style={[styles.card, {
                                            backgroundColor: key % 2 === 1 ? theme.primaryColor : theme.secondaryColor
                                        }]
                                        }
                                        rippleContainerBorderRadius={20}
                                        onPress={() => console.log("ListAtvPress")}>
                                        <View style={styles.contentCard} >
                                            <IconMaquina fill={key % 2 === 1 ? theme.secondaryColor : theme.primaryColor} />
                                            <View>
                                                <Text style={[styles.txtCard, {
                                                    color: key % 2 === 1 ? theme.secondaryColor : theme.primaryColor
                                                }]
                                                }>Maquina {item.machineNumber}</Text>
                                                <Text style={[styles.txtCard, {
                                                    color: key % 2 === 1 ? theme.secondaryColor : theme.primaryColor
                                                }]
                                                }>Dia {item.date}</Text>
                                                <Text style={[styles.txtCard, {
                                                    color: key % 2 === 1 ? theme.secondaryColor : theme.primaryColor
                                                }]
                                                }>{item.time}</Text>
                                            </View>
                                        </View>
                                    </Ripple>
                                </View>
                            </Fragment>
                        );
                    })}
                </Animated.ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme.backgroundGray
    },
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
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: theme.borderGray,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    txtTitle: {
        padding: 4,
        color: theme.primaryColor,
        fontWeight: 'bold',
        fontSize: 16
    },
})