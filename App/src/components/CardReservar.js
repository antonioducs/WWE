import React, { Component } from 'react';
import firebase from 'firebase';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import Collapsible from 'react-native-collapsible';
import { LinearGradient } from 'expo-linear-gradient';
import Ripple from 'react-native-material-ripple';

import { connect } from 'react-redux';

import theme from '../styles/theme';

class CardReservar extends Component {

    state = {
        isOpen: true,
        currentUser: null,
    };

    componentDidMount() {
        const { currentUser } = firebase.auth();
        if (this.props.isOpen != null)
            this.setState({
                isOpen: !this.props.isOpen,
            });

        this.setState({
            currentUser: currentUser.uid
        });
    }

    renderContentColapsible = () => {
        if (this.props.userRes != null) {
            if (this.props.userRes.userid === this.state.currentUser) {
                return (
                    <View style={{
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}>
                        <Ripple
                            style={styles.btnReservar}
                            onPress={this.props.cancelarReserva}
                            rippleContainerBorderRadius={20}
                        >
                            <Text style={styles.txtBtnReservar}>Cancelar reserva!</Text>
                        </Ripple>
                    </View>
                );
            } else {
                return (
                    <View>
                        <Text style={styles.txtReservar}>Horário já reservado por:</Text>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 30
                        }}>
                            <Image
                                source={{ uri: `data: image/jpeg;base64,${this.props.userRes.photo}` }}
                                style={styles.img}
                            />
                            <Text style={styles.txtName}>{this.props.userRes.name}</Text>
                            <Text style={styles.txtReservar}>Apartamento: {this.props.userRes.apt}</Text>
                        </View>
                    </View>
                );
            }
        }

        return (
            <View style={{
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
            }}>
                <Ripple
                    style={styles.btnReservar}
                    onPress={this.props.fazerReserva}
                    rippleContainerBorderRadius={20}
                >
                    <Text style={styles.txtBtnReservar}>Reservar este horário</Text>
                </Ripple>
            </View>
        );
    }
    render() {
        return (
            <View>
                <Ripple
                    style={styles.card}
                    onPress={() => this.setState({ isOpen: !this.state.isOpen })}
                    rippleContainerBorderRadius={20}
                >
                    <LinearGradient
                        style={styles.contentCard}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0.2, y: 0 }}
                        colors={[this.props.userRes != null ? '#D31027' : '#11998E', this.props.userRes != null ? '#EA384D' : '#38Ef7D']}
                    >
                        <Text style={styles.txt}>{this.props.hora}</Text>
                    </LinearGradient>
                </Ripple>

                <Collapsible collapsed={this.state.isOpen}>
                    <LinearGradient
                        style={
                            {
                                ...styles.viewReservar,
                                height: (this.props.userRes != null
                                    && this.props.userRes.userid != this.state.currentUser)
                                    ? 250 : 150
                            }
                        }
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0.2, y: 0 }}
                        colors={[this.props.userRes != null ? '#D31027' : '#11998E', this.props.userRes != null ? '#EA384D' : '#38Ef7D']}
                    >
                        {this.renderContentColapsible()}
                    </LinearGradient>
                </Collapsible>
            </View>
        );
    }
}

const mapToStateToPros = state => {
    const { user, reservationsDay } = state;
    return { user, reservationsDay };
}

export default connect(mapToStateToPros)(CardReservar);
const styles = StyleSheet.create({
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
    txt: {
        color: theme.secondaryColor,
        fontSize: 36,
        fontWeight: 'bold'
    },
    viewReservar: {
        padding: 15,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius: 14,
        marginLeft: 18,
        marginRight: 18,
        marginBottom: 10
    },
    txtReservar: {
        color: theme.secondaryColor,
        fontWeight: 'bold',
        fontSize: 16
    },
    txtBtnReservar:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    btnReservar: {
        backgroundColor: theme.secondaryColor,
        height: 70,
        width: '70%',
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 4
    },
    img: {
        borderRadius: 50,
        height: 100,
        width: 100,
        borderColor: theme.secondaryColor,
        borderWidth: 2
    },
    txtName: {
        color: theme.secondaryColor,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 4
    }
})