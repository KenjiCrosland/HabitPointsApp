import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { PointPickerButton } from './PointPickerButton';

export default class PointPicker extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const buttons = [];
    for (let i = 1; i <= this.props.numberOfButtons; i += 1) {
      buttons.push(<PointPickerButton
        key={i.toString()}
        number={i.toString()}
        pickPointValue={this.props.pickPointValue}
        selected={this.props.currentPointValue === i}
      />);
    }
    return <View style={styles.buttonRow}>{buttons}</View>;
  }
}

const styles = StyleSheet.create({
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
