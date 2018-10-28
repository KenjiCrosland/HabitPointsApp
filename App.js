import React from 'react';
import { Text, View, Button } from 'react-native';
import HabitScreen from './components/HabitScreen';
import HabitFormScreen from './components/HabitFormScreen';
import StatsScreen from './components/StatsScreen';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailsScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
  </View>
);

const HabitStackNavigator = createStackNavigator({
  HabitScreen: { screen: HabitScreen },
  HabitFormScreen: { screen: HabitFormScreen },
});

const RootNavigator = createBottomTabNavigator({
  Home: {
    screen: HabitStackNavigator,
    navigationOptions: () => ({
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
  StatsScreen: {
    screen: StatsScreen,
    navigationOptions: () => ({
      tabBarLabel: 'Stats',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-stats' : 'ios-stats-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }),
  },
}, {
  lazy: false,
});

export default RootNavigator;
