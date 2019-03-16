import React, {Component} from 'react';
import {addCardToDeck} from '../utils/api';
import { Alert, View, TouchableOpacity, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { purple, white } from '../utils/colors'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
    };

    addQuestion = async (event) => {
        event.preventDefault();

        const {question, answer} = this.state;

        if (question === '') {
            Alert.alert(
                'Required',
                'Please fill in the Question field.'
            );

            return;
        }

        if (answer === '') {
            Alert.alert(
                'Required',
                'Please fill in the Answer field.'
            );

            return;
        }

        await addCardToDeck({
            question: question,
            answer: answer
        }, this.props.navigation.state.params.deckId);

        this.setState({
            question: '',
            answer: ''
        });

        this.props.navigation.navigate('DeckDetails', {'deckId': this.props.navigation.state.params.deckId});
    };

    render() {
        const deckId = this.props.navigation.state.params.deckId;
        const {question, answer} = this.state;

        return (

          <View style={styles.container}>
            <View style={styles.row}>
                <Text>Question: </Text>
                <TextInput 
                  value={question}
                  style={styles.input}
                  onChangeText={(question) => this.setState({question: question})}
                />
            </View>
            <View style={styles.row}>
                <Text>Answer: </Text>
                <TextInput 
                  value={answer}
                  style={styles.input}
                  onChangeText={(answer) => this.setState({answer: answer})}
                />
            </View>
            <SubmitBtn onPress={this.addQuestion} />
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
    alignSelf: 'flex-end',
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
    margin: 10,
  }
})

export default AddCard;
