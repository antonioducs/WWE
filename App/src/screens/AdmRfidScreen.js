import * as React from 'react';
import {
    ScrollView,
    TextInput,
    StyleSheet,
    StatusBar,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { FAB } from 'react-native-paper';
import Constants from 'expo-constants';
import CardRfid from '../components/CardRfid';
import { loadRfidList } from '../actions';
import Collapsible from 'react-native-collapsible';
import { setNewRfid } from '../actions';

import { connect } from 'react-redux';


class AdmRfidScreen extends React.Component {
    state = {
        hide: false,
        codRfid: "",
        aptRfid: null
    }

    async componentDidMount() {
        await this.props.loadRfidList();
        console.log(this.props.rfidsList)
    }

    onChangeHandler(field, valor) {
        this.setState({
            [field]: valor
        })
    }

    cadRfid = () => {

        return (
            <Collapsible collapsed={!this.state.hide}>
                <View style={styles.cadRfid}>

                    <Text style={styles.cadText}>Código do RFID:</Text>
                    <TextInput
                        style={styles.cadArea}
                        placeholder='Código do RFID'
                        value={this.state.codRfid}
                        onChangeText={valor => {
                            this.onChangeHandler('codRfid', valor.toUpperCase())
                        }}
                    />
                    <Text style={styles.cadText}>Apartamento:</Text>
                    <TextInput
                        style={styles.cadArea}
                        placeholder='Apartamento'
                        value={this.state.aptRfid}
                        onChangeText={valor => {
                            this.onChangeHandler('aptRfid', valor)
                        }}
                        keyboardType="decimal-pad"
                    />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.cadButton} onPress={async () => {
                            await this.props.setNewRfid(this.state.codRfid, this.state.aptRfid);
                        }}>
                            <Text style={styles.cadText, { color: '#4169E1', fontSize: 26, }}>
                                Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Collapsible>
        );
    };


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.headerBar}>
                    <Text style={{
                        fontSize: 30,
                        color: 'white',
                        alignItems: 'center',
                        alignSelf: 'center',
                        textAlign: 'center',
                        textAlignVertical: 'center'
                    }}
                    >
                        RFID
                    </Text>
                </View>
                {this.cadRfid()}
                <ScrollView>
                    <View>
                        {
                            (this.props.rfidsList && this.props.rfidsList.length) ?
                                this.props.rfidsList.map((item, key) => {
                                    return (<View key={key.toString()}><CardRfid rfid={item} /></View>);
                                }) : null
                        }
                    </View>
                </ScrollView>
                <FAB
                    style={styles.fab}
                    bigger
                    icon="add"
                    onPress={() => this.setState({ hide: !this.state.hide })}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const { rfidsList } = state;
    return { rfidsList };
}

const mapDispachToProps = {
    loadRfidList,
    setNewRfid
}

export default connect(mapStateToProps, mapDispachToProps)(AdmRfidScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: 'white',
    },
    headerBar: {
        height: 42,
        backgroundColor: '#4169E1',
        alignItems: 'center',
        alignContent: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#4169E1',
    },
    cadRfid: {
        height: 290,
        borderRadius: 10,
        padding: 15,
        margin: 8,
        marginVertical: 4,
        backgroundColor: '#4169E1',
    },
    cadArea: {
        color: "black",
        borderRadius: 10,
        borderColor: 'black',
        backgroundColor: 'white',
        fontSize: 25,
        height: 42,
        padding: 10,
        margin: 10,
    },
    cadText: {
        color: 'white',
        fontSize: 26,
    },
    cadButton: {
        borderRadius: 26,
        margin: 30,
        width: 100,
        backgroundColor: "white",
        alignItems: "center",
        padding: 8,
    }
});