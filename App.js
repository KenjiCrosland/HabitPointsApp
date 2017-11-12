import React from 'react';
import { Text, View, Button } from 'react-native';
import HabitScreen from './components/HabitScreen';
import StatsScreen from './components/StatsScreen';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';




const DetailsScreen = ({navigation}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
  </View>
);

const RootNavigator = TabNavigator({
  HabitScreen: { 
    screen: HabitScreen
    }, 
  Details: {
    screen: StatsScreen
  },
});

export default RootNavigator;