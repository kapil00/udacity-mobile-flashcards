import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import {getDecks} from '../utils/api';
import { purple, white } from '../utils/colors'

class DeckDetails extends Component {

    state = {
        decks: {},
    };

    async componentDidMount() {
        const decks = await getDecks();

        this.setState({
            decks: decks
        });
    };

    async componentWillUpdate() {
        const decks = await getDecks();

        this.setState({
            decks: decks
        });
    }

    render() {
        const decks = this.state.decks;
        const deckId = this.props.navigation.state.params.deckId;

        if (Object.keys(decks).length > 0) {
            return (
                <View key={deckId} style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.header}>{decks[deckId].deckId}</Text>
                        <Text style={styles.header}>{decks[deckId].cards.length} Cards</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.header}></Text>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                          onPress={() => this.props.navigation.navigate('AddCard', {'deckId': deckId})}>
                            <Text style={styles.submitBtnText}>New Question</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                          onPress={() => this.props.navigation.navigate('Quiz', {'deckDetails': decks[deckId]})}>
                            <Text style={styles.submitBtnText}>Take Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container} />
            );
        }
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
    paddingLeft: 30,
    paddingRight: 30,
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
  input: {
    width: 200,
    height: 44,
    padding:8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
  }
})

export default DeckDetails;