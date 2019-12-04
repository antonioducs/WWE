import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions } from 'react-native';

import theme from '../styles/theme';
import CardHorario from './CardHorario';

import { connect } from 'react-redux';
import {
    deleteUserNewReservationDay,
    deleteReservationDay
} from '../actions';

const { height } = Dimensions.get('window');

class ListAtividades extends Component {

    openCalendar = () => {
        this.props.navigation.navigate('CalendarScreen');
    }

    componentWillMount() {
        let data = new Date();
        let day = data.getDay();
        let month = data.getMonth();
        let year = data.getFullYear();

        const copyUser = {...this.props.user};

        if (copyUser.horarios && copyUser.horarios.length) {
            copyUser.horarios.map(async (item) => {
                if (month >= parseInt(item.substr(2, 2)) && day > parseInt(item.substr(0, 2))
                    && year >= parseInt(item.substr(4, 4))) {
                    const date = item.substr(0, 2) + "" + item.substr(2, 2) + "" + item.substr(4, 4);
                    const time = item.substr(8, 2) + "" + item.substr(10, 2);
                    await this.props.deleteUserNewReservationDay(day, time, this.props.user);
                    await this.props.deleteReservationDay(date, time);
                }
            }
            )
        }
    }


    render() {

        return (
            <View style={styles.safeArea}>

                <View >
                    <Text style={{
                        fontSize: 15, color: 'black',
                        flexDirection: 'row',
                        marginTop: 10,
                        marginLeft: 30,
                        marginBottom: 5,
                        fontWeight: 'bold'
                    }}
                    >
                        Atividades:
                    </Text>
                </View>
                <Animated.ScrollView
                    style={{ height: height }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.props.scrollY } } }], {
                        useNativeDriver: true
                    })}
                >
                    {(this.props.user.horarios
                        && this.props.user.horarios.length
                        && this.props.user.horarios.map((item, key) => {
                            const date = item.substr(0, 2) + "/" + item.substr(2, 2) + "/" + item.substr(4, 4);
                            const time = item.substr(8, 2) + ":" + item.substr(10, 2);
                            return (
                                <Fragment key={key.toString()}>
                                    <View>
                                        <CardHorario
                                            primaryColor={'white'}
                                            secondaryColor={'white'}
                                            date={date}
                                            time={time}
                                            onPress={() => console.log('Press Card')}
                                        />
                                    </View>
                                </Fragment>
                            );
                        })) ||
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Nenhuma atividade por aqui.</Text>
                        </View>
                    }
                </Animated.ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state;
    return { user };
}

const mapDispatchToProps = {
    deleteReservationDay,
    deleteUserNewReservationDay
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAtividades);

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme.backgroundGray
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
        color: 'black',
        fontSize: 18,

    },
    button: {
        backgroundColor: theme.secondaryColor,
        height: 50,
        marginHorizontal: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginTop: 20,
        marginBottom: 10
    },
})