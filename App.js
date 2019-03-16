import React, {Component} from 'react';
import {View, Platform, StatusBar} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import {Font, AppLoading} from 'expo';
import { purple, white } from './utils/colors'
import { Constants } from 'expo'
import DecksList from './components/DecksList';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetails';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import {setLocalNotification} from "./utils/api";

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs =
Platform.OS === "ios"
? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
: createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const TabsContainer = createAppContainer(Tabs)


const MainNavigator = createStackNavigator({
    home: {
        screen: TabsContainer,
        navigationOptions: {
          title: 'Mobile Flashcards',
          header: null,
        },
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: {
            headerTintColor: '#000',
        },
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: '#000',
        },
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add Question',
            headerTintColor: '#000',
        },
    },
});

const MainContainer = createAppContainer(MainNavigator)

class App extends Component {

    state = {
        loading: true
    };

    async componentDidMount() {
        this.setState({ loading: false });
        setLocalNotification();
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1}}>
                    <AppLoading />
                </View>
            );
        }

        return (
            <View style={{flex: 1}}>
                <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
                <MainContainer />
            </View>
        );
    }
}

export default App;