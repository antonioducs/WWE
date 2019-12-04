import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    Image, 
    Text 
} from 'react-native';

import { SCREEN_HEIGHT } from '../config/constants';
import theme from '../styles/theme';

import { connect } from 'react-redux';

import editImg from '../../assets/editData.png';
import Ripple from 'react-native-material-ripple';

class UserDetails extends Component {

    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.viewTop}>
                        <Text style={styles.txtInfo}>Suas informações:</Text>
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

                        <Text style={styles.txtApt}>{this.props.user.name}</Text>
                        <View style={styles.containerTxt}>
                            <Text style={styles.txtApt}>Apartamento: </Text>
                            <Text style={styles.txt}>{this.props.user.apt}</Text>
                        </View>
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: theme.primaryColor,
        height: SCREEN_HEIGHT / 3,
    },
    info: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        borderRadius: 50,
        height: 100,
        width: 100,
        borderColor: theme.secondaryColor,
        borderWidth: 2
    },
    rippleEdit: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        padding: 10,
        borderRadius: 4,
        borderColor: theme.secondaryColor,
        borderWidth: 2,
    },
    imgEdit: {
        height: 20,
        width: 20,
    },
    txt: {
        color: theme.secondaryColor,
        fontSize: 14
    },
    containerTxt: {
        display: 'flex',
        flexDirection: 'row'
    },
    txtApt: {
        color: theme.secondaryColor,
        fontSize: 14,
        fontWeight: 'bold'
    },
    txtInfo: {
        color: theme.secondaryColor,
        fontWeight: 'bold',
        fontSize: 14
    },
    viewTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});

const mapStateToProps = state => {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps)(UserDetails);