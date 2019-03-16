import React, {Component} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Platform } from 'react-native'
import {addNewDeck} from '../utils/api';
import { purple, white } from '../utils/colors'

import {Alert} from "react-native";

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {

    state = {
        input: '',
    };

    addDeck = async (event) => {
        event.preventDefault();

        const {input} = this.state;

        if (input === '') {
            Alert.alert('Required', 'Deck name must be filled in.');
            return;
        }

        await addNewDeck({[input]: {deckId: input, cards: []}});

        this.setState({
            input: ''
        });

        //this.props.navigation.navigate('DecksList');
        this.props.navigation.navigate('DeckDetails', { 'deckId': input});
    };

    render() {
        const { input } = this.state
        return (
          <View style={styles.container}>
            <View style={styles.row}>
                <Text>Deck Name </Text>
                <TextInput 
                  value={input}
                  style={styles.input}
                  onChangeText={(input) => this.setState({input})}
                />
            </View>
            <SubmitBtn onPress={this.addDeck} />
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  input: {
    width: 200,
    height: 44,
    padding:8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
  }
})

export default AddDeck;