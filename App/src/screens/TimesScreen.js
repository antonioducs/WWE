import React, { Component, Fragment } from 'react';

import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';

import { SCREEN_HEIGHT } from '../config/constants';
import theme from '../styles/theme';

import { connect } from 'react-redux';
import {
    loadConfigs,
    loadReservationsDay,
    deleteReservationDay,
    setNewReservationDay,
    setUserNewReservationDay,
    deleteUserNewReservationDay
} from '../actions';

import CardReservar from '../components/CardReservar';

class TimesScreen extends Component {

    state = {
        isLoading: true,
        list: [],
        day: 10,
        month: 10,
        year: 2019,
        daySemana: 1,
        semana: ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
    };

    componentDidMount() {
        const data = new Date();

        const { day } = this.props.navigation.state.params;
        const dSemana = new Date(day.year, (day.month - 1), day.day)

        let refDay = "" + (day.day < 10 ? "0" + day.day : day.day) +
            (day.month < 10 ? "0" + day.month : day.month) + day.year;

        var min = parseInt(this.props.configs.horaMin.substr(0, 2)) * 60 + parseInt(
            this.props.configs.horaMin.substr(2, 2));

        var max = parseInt(this.props.configs.horaMax.substr(0, 2)) * 60 + parseInt(
            this.props.configs.horaMax.substr(2, 2)
        );

        let hoje = false
        if (data.getDate() === day.day
            && (data.getMonth() + 1) === day.month) {
            hoje = true;
        }
        
        const { tempoCicloEmMinutos } = this.props.configs;
        const listaHorarios = [];

        while (min <= max) {
            var hora = parseInt(min / 60);
            var minuto = min % 60;
            if (hoje) {
                if (data.getHours() <= hora){
                    listaHorarios.push("" + (hora < 10 ? ("0" + hora) : hora) + "h" +
                        (minuto < 10 ? ("0" + minuto) : minuto) + "min");
                }
            } else {
                listaHorarios.push("" + (hora < 10 ? ("0" + hora) : hora) + "h" +
                    (minuto < 10 ? ("0" + minuto) : minuto) + "min");
            }
            min = parseInt(min + tempoCicloEmMinutos);
        }

        this.props.loadReservationsDay(refDay);

        this.setState({
            day: day.day,
            month: day.month,
            year: day.year,
            daySemana: dSemana.getDay(),
            list: listaHorarios,
            isLoading: false
        });
    }

    fazerReserva = async (hora) => {
        const day = "" + (this.state.day < 10 ? "0" + this.state.day : this.state.day) + "" +
            (this.state.month < 10 ? "0" + this.state.month : this.state.month) + "" +
            this.state.year;
        const time = hora.substr(0, 2) + hora.substr(3, 2);

        await this.props.setUserNewReservationDay(day, time, this.props.user);
        await this.props.setNewReservationDay(day, time, this.props.user);
    }

    cancelarReserva = async (hora) => {
        const day = "" + (this.state.day < 10 ? "0" + this.state.day : this.state.day) + "" +
            (this.state.month < 10 ? "0" + this.state.month : this.state.month) + "" +
            this.state.year;

        const time = hora.substr(0, 2) + hora.substr(3, 2);

        await Alert.alert(
            'Cancelar',
            `Deseja cancelar a reserva?`,
            [{
                text: 'Não',
                style: 'cancel' //IOS
            }, {
                text: 'Sim',
                onPress: async () => {
                    await this.props.deleteUserNewReservationDay(day, time, this.props.user);
                    await this.props.deleteReservationDay(day, time);
                }
            }
            ],
            { cancelable: false }
        )

    }

    render() {
        if (this.state.isLoading)
            return <ActivityIndicator />

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 20 }}
            >
                <View style={styles.header}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.txtMes}>
                            {this.state.day < 10 ? "0" + this.state.day : this.state.day}
                            /{this.state.month < 10 ? "0" + this.state.month : this.state.month}
                            /{this.state.year}
                        </Text>
                        <Text style={styles.txtAno}>{this.state.semana[this.state.daySemana]}</Text>
                    </View>
                </View>
                {
                    this.state.list.length
                        ? this.state.list.map((item, key) => {
                            const refHora = item.substr(0, 2) + item.substr(3, 2);
                            return (
                                <Fragment key={key.toString()}>
                                    <View style={{
                                        marginTop: 20
                                    }}>
                                        <CardReservar
                                            userRes={
                                                (this.props.reservationsDay &&
                                                    this.props.reservationsDay[`"${refHora}"`]) ?
                                                    this.props.reservationsDay[`"${refHora}"`] :
                                                    null
                                            }
                                            hora={item}
                                            fazerReserva={() => this.fazerReserva(item)}
                                            cancelarReserva={() => this.cancelarReserva(item)}
                                        />
                                    </View>
                                </Fragment>
                            );
                        }) : <ActivityIndicator />
                }
            </ScrollView >
        );
    }
}

const mapStateToProps = state => {
    const { configs, reservationsDay, user } = state;
    return { configs, reservationsDay, user };
}

const mapDispatchToProps = {
    loadConfigs,
    loadReservationsDay,
    setNewReservationDay,
    deleteReservationDay,
    setUserNewReservationDay,
    deleteUserNewReservationDay
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesScreen);

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: theme.primaryColor,
        height: SCREEN_HEIGHT / 5,
        borderBottomStartRadius: 150,
        marginBottom: 20
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
});