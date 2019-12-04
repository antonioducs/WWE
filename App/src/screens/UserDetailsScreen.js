import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
    TextInput,
    TouchableOpacity
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { connect } from 'react-redux';
import { saveUser, loadRfid, saveNewUserRfid } from '../actions'

import theme from '../styles/theme';

class UserDetailsScreen extends Component {

    state = {
        user: {},
        isLoading: false,
        isCamera: false,
        isScanQR: false,
        hasCameraPermission: null,
    };

    //faz uma copia local para salvar as alterações

    async componentDidMount() {
        this.rollBackUser();

    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        })
        /*if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissões de rolagem da câmera para fazer isso funcionar!');
            }
        }*/
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: false,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            const attUser = this.state.user;
            attUser.photo = result.base64;
            this.setState({
                user: attUser
            });
        }

    }

    rollBackUser() {
        const { user } = this.props
        let saveUser = {};
        if (user.horarios != null) {
            saveUser = {
                name: user.name,
                photo: user.photo,
                apt: user.apt,
                rfid: user.rfid,
                horarios: user.horarios,
                isAdmin: user.admin
            }
        }else{
            saveUser = {
                name: user.name,
                photo: user.photo,
                apt: user.apt,
                rfid: user.rfid,
                isAdmin: user.admin
            }
        }
        this.setState({
            user: saveUser
        })
    }


    onChangeName = value => {
        const attUser = this.state.user;
        attUser.name = value;
        this.setState({
            user: attUser
        })
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />;

        return (
            <View style={styles.button}>
                <Button
                    title='Salvar'
                    onPress={async () => {
                        this.setState({
                            isLoading: true
                        })
                        try {
                            if (this.state.user.rfid != this.props.user.rfid) { //verifica se foi alterado o card
                                await this.props.saveNewUserRfid(this.state.user.rfid, this.props.rfid, this.state.user.name);
                            }
                            await this.props.saveUser(this.state.user);
                            this.props.navigation.goBack();
                        } catch (error) {
                            Alert.alert('Erro', error.message);
                        } finally {
                            this.setState({
                                isLoading: false
                            })
                        }
                    }}
                />
            </View>
        );
    }

    viewForm() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.viewTxt}>
                    <TextInput
                        style={styles.txt}
                        placeholder="Seu nome"
                        value={this.state.user.name}
                        onChangeText={value => this.onChangeName(value)}
                    />
                </View>
                <View style={styles.viewImg}>
                    <Image
                        source={{ uri: `data: image/jpeg;base64,${this.state.user.photo}` }}
                        style={styles.img}
                    />
                    <Button
                        title='Alterar Foto'
                        onPress={() => {
                            Alert.alert(
                                'Capturar Imagem',
                                'De onde você deseja obter a imagem?',
                                [
                                    {
                                        text: 'Camera',
                                        onPress: () => {
                                            this.setState({ isCamera: true })
                                        }
                                    },
                                    {
                                        text: 'Galeria',
                                        onPress: () => {
                                            this._pickImage();
                                        }
                                    }
                                ]
                            )
                        }}
                    />
                </View>

                <View style={styles.viewApt}>
                    <Text style={styles.txt}>Apartamento:
                      {this.state.user.apt ?
                            this.state.user.apt
                            : 'Nda'}
                    </Text>

                    <View style={{ marginLeft: 2 }}>
                        <Button
                            title='Alterar '
                            onPress={() =>
                                this.setState({ isScanQR: true })
                            }
                        />
                    </View>
                </View>

                {this.renderButton()}
                <View style={styles.button}>
                    <Button
                        style={styles.button}
                        color='red'
                        title='Cancelar'
                        onPress={() => {
                            this.rollBackUser();
                            this.props.navigation.goBack();
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);

            if (data) {
                const attUser = this.state.user;
                attUser.photo = data.base64;
                this.setState({
                    user: attUser
                })

                this.setState({
                    isCamera: false,
                })
            }
        }
    }

    viewCamera() {

        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            this.setState({ isCamera: false })
        } else if (hasCameraPermission === false) {
            Alert.alert('Sem acesso', 'Não possui acesso a camera');
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Camera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        ratio="16:9"
                        type={Camera.Constants.Type.front}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <TouchableOpacity
                        style={styles.capture}
                        onPress={this.takePicture.bind(this)}
                    >
                        <Text>Tirar foto!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.capture}
                        onPress={() => this.setState({ isCamera: false })}
                    >
                        <Text>Cancela</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    handleBarCodeScanned = async ({ data }) => {
        await this.props.loadRfid(data);

        const attUser = this.state.user;
        attUser.rfid = data;
        attUser.apt = this.props.rfid.apt;
        this.setState({
            isScanQR: false,
            user: attUser
        });

    };

    viewScanQR() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}>
                <BarCodeScanner
                    onBarCodeScanned={data => this.handleBarCodeScanned(data)}
                    style={StyleSheet.absoluteFillObject}
                />
                <TouchableOpacity
                    style={styles.capture}
                    onPress={() => this.setState({ isScanQR: false })}
                >
                    <Text>Cancela</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {

        if (this.state.isCamera)
            return (this.viewCamera());

        if (this.state.isScanQR)
            return (this.viewScanQR());

        return (this.viewForm());
    }
}


const mapStateToProps = state => {
    const { user, rfid } = state;
    return { user, rfid };
}

const mapDispatchToProps = {
    saveUser,
    loadRfid,
    saveNewUserRfid
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsScreen);

const styles = StyleSheet.create({
    containerCamera: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    container: {
        flex: 1,
        backgroundColor: theme.secondaryColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    img: {
        height: '86%',
        width: '100%',
    },
    viewImg: {
        height: 250,
        width: 250,
        borderColor: theme.primaryColor,
        borderWidth: 2
    },
    viewTxt: {
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10,
        marginTop: 20,
        width: 250,
        borderBottomColor: theme.primaryColor,
        borderBottomWidth: 2
    },
    txt: {
        color: theme.primaryColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    viewApt: {
        marginTop: 20,
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        width: 250,
        margin: 10,
    }

});

