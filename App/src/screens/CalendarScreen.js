import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';

import { SCREEN_HEIGHT } from "../config/constants";
import theme from '../styles/theme';

import { connect } from 'react-redux';
import { loadConfigs } from '../actions';


class CalendarScreen extends Component {

    state = {
        loadComplete: true,
        selectd: 1,
        mes: ['0', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        ano: 2019,
        maxDias: 0
    };

    async componentDidMount() {
        await this.props.loadConfigs();

        const month = new Date().getMonth() + 1;
        const ano = new Date().getFullYear();
        const outher = new Date().setDate(new Date().getDate() + this.props.configs.dias - 2);

        this.setState({
            selectd: month,
            ano: ano,
            maxDias: outher,
            loadComplete: false
        });
    }

    monthChange = month => {
        const mes = month[0].month;
        const ano = month[0].year;
        this.setState({
            selectd: mes,
            ano: ano
        });
    }

    render() {

        LocaleConfig.locales['pt'] = {
            monthNames: [],
            monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set..', 'Out.', 'Nov.', 'Dez.'],
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
            dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            today: 'Hoje\'hj'
        };
        LocaleConfig.defaultLocale = 'pt';

        if(this.state.loadComplete)
            return(<ActivityIndicator />);

        return (
            <>
                <View>
                    <View style={styles.header}>
                        <View style={styles.contentHeader}>
                            <Text style={styles.txtMes}>{this.state.mes[this.state.selectd]}</Text>
                            <Text style={styles.txtAno}>{this.state.ano}</Text>
                        </View>
                    </View>
                    <View>
                        <CalendarList

                            // Enable horizontal scrolling, default = false
                            horizontal={true}
                            // Enable paging on horizontal, default = false
                            pagingEnabled={true}
                            minDate={new Date()}
                            maxDate={this.state.maxDias}
                            monthFormat=""
                            onDayPress={(day) => { this.props.navigation.navigate('TimesScreen', { day }) }}
                            onVisibleMonthsChange={(month) => { this.monthChange(month) }} />
                    </View>
                </View >
            </>
        );
    }
}

const mapStateToProps = state => {
    const { configs } = state;
    return { configs };
}

const mapDispatchToProps = {
    loadConfigs
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.secondaryColor
    },
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
    }
});