import * as React from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  StatusBar, 
  TouchableOpacity,
  View
} from 'react-native';
import Constants from 'expo-constants';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

class AdmConfigScreen extends React.Component {
  state = {
    isStartDateTimePickerVisible: false,
    isStopDateTimePickerVisible: false,
    chosenStartTime: '',
    chosenStopTime: '',
  };

  _showStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: true });

  _showStopDateTimePicker = () => this.setState({ isStopDateTimePickerVisible: true });

  _hideStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: false });

  _hideStopDateTimePicker = () => this.setState({ isStopDateTimePickerVisible: false });

  _handleStartDatePicked = (date) => {
    this.setState({ chosenStartTime: moment(date).format('HH:mm') });
  };

  _handleStopDatePicked = (date) => {
    this.setState({ chosenStopTime: moment(date).format('HH:mm') });
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
            Configurações
          </Text>
        </View>

        <View style={styles.elementosConfig}>
          <View style={{ flex: 1 }}>
            <Text style={styles.legenda}>Horário Inicial:</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.button} onPress={this._showStartDateTimePicker}>
              <Text style={styles.legenda, { color: '#4169E1', fontSize: 25 }}>
                {this.state.chosenStartTime}
              </Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isStartDateTimePickerVisible}
              onConfirm={this._handleStartDatePicked}
              onCancel={this._hideStartDateTimePicker}
              mode={'time'}
              datePickerModeAndroid={'spinner'}
            />
          </View>
        </View>

        <View style={styles.elementosConfig}>
          <View style={{ flex: 1 }}>
            <Text style={styles.legenda}>Horário Final:</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.button} onPress={this._showStopDateTimePicker}>
              <Text style={styles.legenda, { color: '#4169E1', fontSize: 25 }}>
                {this.state.chosenStopTime}
              </Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isStopDateTimePickerVisible}
              onConfirm={this._handleStopDatePicked}
              onCancel={this._hideStopDateTimePicker}
              mode={'time'}
            />
          </View>
        </View>

        <View style={styles.elementosConfig}>
          <View style={{ flex: 1 }}>
            <Text style={styles.legenda}>Duração (minutos):</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}>
            <NumericInput
              onChange={value => console.log(value)}
              totalWidth={170}
              totalHeight={50}
              iconSize={15}
              initValue={15}
              minValue={15}
              step={15}
              editable={false}
              rounded
              textColor='white'
              iconStyle={{ color: '#4169E1' }}
              rightButtonBackgroundColor='white'
              leftButtonBackgroundColor='white'
            />
          </View>
        </View>

        <View style={styles.elementosConfig}>
          <View style={{ flex: 1 }}>
            <Text style={styles.legenda}>Nº Dias</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'flex-end' }}>
            <NumericInput
              onChange={value => console.log(value)}
              totalWidth={170}
              totalHeight={50}
              iconSize={15}
              initValue={1}
              step={1}
              editable={false}
              minValue={1}
              maxValue={30}
              rounded
              textColor='white'
              iconStyle={{ color: '#4169E1' }}
              rightButtonBackgroundColor='white'
              leftButtonBackgroundColor='white'
            />
          </View>
        </View>

      </SafeAreaView>
    );
  }
}

export default AdmConfigScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
  headerBar: {
    height: 42,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    alignContent: 'center',
  },
  legenda: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 170,
  },
  elementosConfig: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    borderRadius: 10,
    padding: 15,
    margin: 8,
    marginVertical: 4,
    alignItems: 'center',
    backgroundColor: '#4169E1',
  },
});