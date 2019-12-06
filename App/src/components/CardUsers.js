import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import Collapsible from 'react-native-collapsible';
import { Switch } from 'react-native-paper';

export default class CardUsers extends Component {
    state = {
        hide: false,
        statusAdm: false
    }

    admStatus = () => {
        return (
            <Collapsible collapsed={!this.state.hide}>

                <View style={styles.admStatus}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Administrador:</Text>

                    <Switch
                        style={{ marginLeft: 135 }}
                        value={this.state.statusAdm}
                        color='white'
                        onValueChange={() => {
                            this.setState({ statusAdm: !this.state.statusAdm });
                        }}
                    />
                </View>
            </Collapsible>
        );
    };

    render() {
        return (
            <View>
                <Ripple
                    style={[styles.card, {
                        backgroundColor: "#4169E1"
                    }]
                    }
                    rippleContainerBorderRadius={20}
                    onPress={() => this.setState({ hide: !this.state.hide })} >

                    <View style={styles.contentCard} >
                        <View>
                            <Image
                                source={{ uri: `data: image/jpeg;base64,${this.props.user.photo}` }}
                                style={styles.img}
                            />
                        </View>
                        <View style={styles.txtCard}>
                            <Text
                                style={styles.txtCard}
                            >
                                Nome: {this.props.user.name}
                            </Text>
                            <Text
                                style={styles.txtCard}
                            >
                                Apartamento: {this.props.user.apt}
                            </Text>
                        </View>
                    </View>
                </Ripple>
                {
                    this.admStatus()
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
        borderRadius: 10,
        padding: 15,
        margin: 8,
        marginBottom: 0,
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
        flexDirection: "column",
        marginLeft: 20,
    },
    img: {
        borderRadius: 50,
        height: 80,
        width: 80,
        borderColor: "#4169E1",
        borderWidth: 2,
        alignSelf: "auto",
    },
    admStatus: {
        height: 50,
        flexDirection: 'row',
        width: '90%',
        borderRadius: 10,
        padding: 15,
        margin: 8,
        marginTop: -10,
        marginVertical: 4,
        backgroundColor: '#4169E1',
        alignSelf: 'center',
    },
})