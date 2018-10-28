import React, { Component } from 'react';
import moment from 'moment/src/moment';
import { View, Text, AsyncStorage, Dimensions, StyleSheet } from 'react-native';
import loadInitialData from '../../lib/load-initial-data';
import getStats from '../../lib/get-stats';

export default class StatsScreen extends Component {
  static navigationOptions = () => ({
    async tabBarOnPress({ navigation, defaultHandler }) {
      await navigation.state.params.onTabFocus();
      defaultHandler();
    },
  });

  constructor(props) {
    super(props);
    this.state = {};
    this._updateData = this._updateData.bind(this);
    this.props.navigation.setParams({
      onTabFocus: this._handleTabFocus.bind(this),
    });
    // this._addInterval = this._addInterval.bind(this);
  }

  async _handleTabFocus() {
    const habitKeyArray = await AsyncStorage.getItem('habits');
    this.setState({ interval: moment().toDate() });
    this.setState({ intervalType: 'day' });
    if (habitKeyArray !== null) {
      const habitData = await loadInitialData(habitKeyArray);
      const stats = await getStats(habitData, this.state.interval, this.state.intervalType);
      this.setState({ ...stats });
    } else {
      await AsyncStorage.setItem('habits', '[]');
      this._updateData();
    }
  }

  async _subtractInterval(num, intervalType) {
    const currentInterval = this.state.interval;
    const newInterval = moment(currentInterval).subtract(num, intervalType);
    this.setState({ interval: newInterval });
  }

  async _updateData() {
    const habitKeyArray = await AsyncStorage.getItem('habits');
    if (habitKeyArray && habitKeyArray.length > 0) {
      let habitsArray = (await AsyncStorage.multiGet(JSON.parse(habitKeyArray))) || [];
      habitsArray = habitsArray.map(habit => JSON.parse(habit[1]));
      this.setState({ habits: habitsArray });
      console.log(this.state.habits);
    } else {
      loadInitialData(habitKeyArray);
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.navigationBar}>
          <Text style={styles.mainTitle}>Stats</Text>
        </View>
        <View style={styles.container}>
          <View>
            <Text>
              {moment(this.state.interval).date()} {moment(this.state.interval).format('MMM')}
            </Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.h2}>Total Points Today</Text>
            <Text style={styles.mainPointValue}>{this.state.thisIntervalTotal}</Text>
          </View>
          <View style={styles.overview}>
            <View style={styles.listItem}>
              <Text>vs all-time Avg:</Text>
              <Text style={[styles.greenText, this.state.todayVsAllTimeAvg < 0 && styles.redText]}>
                {this.state.todayVsAllTimeAvg}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text>vs this week&apos;s Avg:</Text>
              <Text style={[styles.greenText, this.state.todayVsThisWeekAvg < 0 && styles.redText]}>
                {this.state.todayVsThisWeekAvg}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text>vs this months&apos;s Avg:</Text>
              <Text
                style={[styles.greenText, this.state.todayVsThisMonthAvg < 0 && styles.redText]}
              >
                {this.state.todayVsThisMonthAvg}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

let styles = StyleSheet.create({
  main: {
    height: deviceHeight,
    width: deviceWidth,
  },
  navigationBar: {
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  mainTitle: {
    top: 7,
    fontWeight: '600',
    fontSize: 18,
  },
  total: {
    marginTop: 10,
    alignItems: 'center',
  },
  mainPointValue: {
    fontSize: 48,
  },
  h2: {
    fontSize: 20,
  },
  greenText: {
    color: 'green',
  },
  redText: {
    color: 'red',
  },
  overview: {
    width: deviceWidth * 0.75,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  listItem: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#EEE',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
