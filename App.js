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
  HabitScreen: {
    screen: HabitScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerRight: (
        <Button title="New Habit" onPress={() => navigation.navigate('HabitFormScreen')} />
      ),
    }),
  },
  HabitFormScreen: { screen: HabitFormScreen },
});

const RootNavigator = createBottomTabNavigator({
  HabitScreen: {
    screen: HabitStackNavigator,
  },
  StatsScreen: {
    screen: StatsScreen,
  },
});

export default RootNavigator;
