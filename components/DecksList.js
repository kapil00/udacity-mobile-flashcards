import React, {Component} from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Platform } from 'react-native'
import {getDecks} from '../utils/api';
import { purple, white } from '../utils/colors'

function SubmitBtn ({displayText, deckId, navigation}) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => navigation.navigate('DeckDetails', { 'deckId': deckId})}>
        <Text style={styles.submitBtnText}>{displayText}</Text>
    </TouchableOpacity>
  )
}

class DecksList extends Component {

    state = {
        decks: []
    };

    async componentDidMount() {
        const decks = await getDecks();

        this.setState({
            decks: decks
        });
    }

    async componentWillUpdate() {
        const decks = await getDecks();

        this.setState({
            decks: decks
        });
    }

    getDeckDisplay = (deckId, decks) => {
        //let aDeck = decks[deckId]
        //console.log('--aDeck--' + aDeck);
        //console.log('--aDeck.stringify--' + JSON.stringify(aDeck));
        //console.log('--aDeck.deckId--' + aDeck.deckId);
        //console.log('--aDeck.cards--' + aDeck.cards);
        //console.log('--aDeck.cards.length--' + aDeck.cards.length);

        return decks[deckId].deckId + ' -- ' + decks[deckId].cards.length + ' Cards';
    };

    render() {
        const decks = this.state.decks;

        if (decks) {
            return (
                <View style={styles.container}>
                  {
                    Object.keys(decks).map((deckId) => {
                        return <SubmitBtn 
                          key={decks[deckId].deckId} 
                          displayText = {this.getDeckDisplay(deckId, decks)} 
                          deckId = {deckId}
                          navigation = {this.props.navigation}/>;
                    })
                  }
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
    flex: 1,
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
    marginTop:5,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'flex-start'
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
  input: {
    width: 200,
    height: 44,
    padding:8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
  }
})

export default DecksList;