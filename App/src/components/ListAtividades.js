import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import Lottie from 'lottie-react-native';

import theme from '../styles/theme';
import CardHorario from './CardHorario';
import notFoundAnimation from '../../assets/animations/notFoundAnimation.json';

import { connect } from 'react-redux';

class ListAtividades extends Component {

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
                    {(this.props.user.horarios
                        && this.props.user.horarios.length
                        && this.props.user.horarios.map((item, key) => {
                            const date = item.substr(0, 2) + "/" + item.substr(2, 2) + "/" + item.substr(4, 4);
                            const time = item.substr(8, 2) + ":" + item.substr(10, 2);
                            const primaryColor = key % 2 === 0 ? theme.primaryColor : theme.secondaryColor;
                            const secondaryColor = key % 2 === 0 ? theme.secondaryColor : theme.primaryColor;
                            return (
                                <Fragment key={key.toString()}>
                                    <View>
                                        <CardHorario
                                            primaryColor={primaryColor}
                                            secondaryColor={secondaryColor}
                                            date={date}
                                            time={time}
                                            onPress={() => console.log('Press Card')}
                                        />
                                    </View>
                                </Fragment>
                            );
                        })) ||
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Lottie
                                autoSize
                                source={notFoundAnimation}
                                autoPlay
                                loop
                            />
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

export default connect(mapStateToProps)(ListAtividades);

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
        color: theme.primaryColor,
        fontWeight: 'bold',
        fontSize: 16
    },
})