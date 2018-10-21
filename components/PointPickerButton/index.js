import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';

export default class PointPickerButton extends PureComponent {
  render() {
    return (
      <TouchableHighlight
        onPress={() => this.props.pickPointValue(this.props.number)}
        style={[styles.base, this.props.selected && styles.selected]}
      >
        <View style={styles.transparent}>
          <Text style={[styles.pickerText, this.props.selected && styles.whitePickerText]}>
            {this.props.number.toString()}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
let styles = StyleSheet.create({
  base: {
    borderRadius: 100,
    height: 40,
    width: 40,
    margin: 3,
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#FA7B12',
  },
  transparent: {
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  pickerText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 18,
  },
  whitePickerText: {
    color: '#FFFFFF',
  },
  buttonRow: {
    flex: 0,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
