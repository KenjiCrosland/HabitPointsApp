import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import { StackNavigator, Navigator } from 'react-navigation';

import { HabitScreen } from '../HabitScreen';
import { HabitFormScreen } from '../HabitFormScreen';

export default class HabitPointsNavigator extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
  }
  _renderScene(route, navigator) {
    const RouteComponent = route.component;
    return (
      <RouteComponent
        {...route.props}
        navigator={navigator}
        route={route}
        events={this.props.events}
      />
    );
  }
  render() {
    return (
      <StackNavigator
        initialRoute={{
          component: HabitScreen,
          index: 0,
        }}
        renderScene={this._renderScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navigationBar}
            routeMapper={{
              LeftButton: (route, navigator) => {
                if (route.index === 0) {
                  return null;
                }
                return (
                  <TouchableHighlight onPress={() => navigator.pop()}>
                    <Text style={styles.backButton}>Back</Text>
                  </TouchableHighlight>
                );
              },
              RightButton: (route, navigator) => {
                if (route.index === 0) {
                  return (
                    <TouchableHighlight
                      onPress={() =>
                        navigator.push({
                          component: HabitFormScreen,
                          index: 1,
                        })
                      }
                    >
                      <Text style={styles.addHabit}>+</Text>
                    </TouchableHighlight>
                  );
                }
                return null;
              },
              Title: () => (
                <Text style={styles.mainTitle}>HabitPoints</Text>
              ),
            }}
          />
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#FFBB20',
  },
  addHabit: {
    top: -7,
    marginRight: 5,
    padding: 2,
    fontSize: 32,
    color: '#FFFFFF',
  },
  mainTitle: {
    top: 7,
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
  backButton: {
    top: 8,
    marginLeft: 5,
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
