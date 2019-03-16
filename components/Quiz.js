import React, {Component} from 'react';
import { Alert, View, TouchableOpacity, Text, TextInput, StyleSheet, Platform } from 'react-native'
import {setLocalNotification, clearLocalNotifications} from '../utils/api';
import { purple, white } from '../utils/colors'

class Quiz extends Component {

    state = {
        correctAnswers: 0,
        questionAnswered: 0,
        showingAnswer: false
    };

    handleNotifications = () => {
        clearLocalNotifications()
            .then(setLocalNotification);
    };

    handleAnswer = (isCorrect) => {
        let newCorrect = isCorrect ? this.state.correctAnswers + 1 : this.state.correctAnswers;

        this.setState({
            questionAnswered: this.state.questionAnswered + 1,
            correctAnswers: newCorrect,
            showingAnswer: false
        });
    };

    handleRestartQuiz = () => {
        this.handleNotifications();

        this.setState({
            correctAnswers: 0,
            questionAnswered: 0,
            showingAnswer: false
        });
    };

    render() {
        const deckDetails = this.props.navigation.state.params.deckDetails;
        const totalQuestions = deckDetails.cards.length;

        const { questionAnswered } = this.state;

        return (
            <View style={styles.container}>
                {
                    (totalQuestions > questionAnswered) ? (

                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.header}>{deckDetails.deckId}</Text>
                        <Text style={styles.normalText}>Question {questionAnswered + 1} of {totalQuestions}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.normalText}>Question: {deckDetails.cards[questionAnswered].question}</Text>
                    </View>


                    {(this.state.showingAnswer === true) ? (
                        <View style={styles.row}>
                            <Text style={styles.normalTextRed}>Answer: {deckDetails.cards[questionAnswered].answer}</Text>
                        </View>
                    ) : (
                        <View style={styles.row}>
                            <Text style={styles.normalTextRed} onPress={() => {this.setState({showingAnswer: true})}}>Show Answer</Text>
                        </View>

                    )}
                    <View style={styles.row}>
                        <TouchableOpacity
                          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                          onPress={() => this.handleAnswer(true)}>
                            <Text style={styles.submitBtnText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                          onPress={() => this.handleAnswer(false)}>
                            <Text style={styles.submitBtnText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    ) : (

                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.header}>{deckDetails.deckId}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.normalText}>Score: {this.state.correctAnswers} of {totalQuestions} answers were correct.</Text>
                    </View>
                <View style={styles.row}>
                    <TouchableOpacity
                      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                      onPress={() => this.handleRestartQuiz()}>
                        <Text style={styles.submitBtnText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                      onPress={() => this.props.navigation.navigate('DecksList')}>
                        <Text style={styles.submitBtnText}>Back to Home</Text>
                    </TouchableOpacity>
                </View>

                </View>

                    )
                }
            </View>
        );
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
    padding: 10,
    alignItems: 'center',
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
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
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
  topLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 30,
    marginRight: 30,
  },
  header: {
    flex: 1,
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 30,
    marginRight: 30,
  },
  normalText: {
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
  },
  normalTextRed: {
    flex: 1,
    fontSize: 16,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
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

export default Quiz;