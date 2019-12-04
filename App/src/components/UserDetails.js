import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, StatusBar } from 'react-native';

import theme from '../styles/theme';

import { connect } from 'react-redux';

import editImg from '../../assets/editData.png';
import editSair from '../../assets/mais.png'
import Ripple from 'react-native-material-ripple';
const { height } = Dimensions.get('window');


class UserDetails extends Component {

    openCalendar = () => {
        this.props.navigation.navigate('CalendarScreen');
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                barStyle='light-content'
                hidden={false}
                />
                <View style={styles.viewTop}>
                    <Ripple
                        style={styles.rippleEdit}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image
                            source={editSair}
                            style={styles.imgEdit}
                        />
                    </Ripple>
                    <Ripple
                        style={styles.rippleEdit}
                        onPress={() => this.props.navigation.navigate('UserDetailsScreen')}
                    >
                        <Image
                            source={editImg}
                           style={styles.imgEdit}
                        />
                    </Ripple>
                </View>

                <View style={styles.info}>

                    <Image
                        source={{ uri: `data: image/jpeg;base64,${this.props.user.photo}` }}
                        style={styles.img}
                    />

                   
                    <View style={styles.containerTxt}>
                        <Text style={styles.txtNom}>{this.props.user.name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop:5}}>
                            <Text style={styles.txtApt}>Apartamento: </Text>
                            <Text style={styles.txtApt}>{this.props.user.apt}</Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.primaryColor,
        height: (height / 3) - 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3  
    },
    info: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    img: {
        borderRadius: 60,
        height: 100,
        width: 100,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20
    },
    rippleEdit:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
    },
    imgEdit: {
        height: 20 ,
        width: 20
    },
    containerTxt: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    txtNom: {
        color: theme.secondaryColor,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10
    },
    txtApt: {
        color: theme.secondaryColor,
        fontSize: 16
    },
    viewTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
    }
});

const mapStateToProps = state => {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps)(UserDetails);