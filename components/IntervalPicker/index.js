import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import wideCirclePicker from './styles/wideCirclePicker';
import topBarMenu from './styles/topBarMenu';

let styles;

class BaseComponent extends Component {
  _bind(...methods) {
    methods.forEach(method => (this[method] = this[method].bind(this)));
  }
}

export default class IntervalPicker extends BaseComponent {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.pickerType === 'wideCirclePicker') {
      styles = wideCirclePicker;
    } else if (this.props.pickerType === 'topBarMenu') {
      styles = topBarMenu;
    }
    const buttons = [];
    for (let i = 0; i < this.props.intervalArray.length; i++) {
      buttons.push(<IntervalPickerButton
        key={this.props.intervalArray[i] + i.toString()}
        interval={this.props.intervalArray[i]}
        pickIntervalValue={this.props.pickIntervalValue}
        selected={this.props.currentInterval === this.props.intervalArray[i]}
      />);
    }
    return <View style={styles.buttonRow}>{buttons}</View>;
  }
}

class IntervalPickerButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableHighlight
        onPress={() => this.props.pickIntervalValue(this.props.interval)}
        style={[styles.base, this.props.selected && styles.selected]}
      >
        <View style={styles.transparent}>
          <Text style={[styles.pickerText, this.props.selected && styles.selectedPickerText]}>
            {this.props.interval}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
