'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
} from 'react-native';

module.exports = StyleSheet.create({

	base:{
		flex: 1,
		borderTopWidth: 5,
		borderTopColor: '#EEEEEE',
		height: 35,
		justifyContent: 'center'
	},
	selected: {
		borderTopWidth: 5,
		borderTopColor: '#DDDDDD',
		backgroundColor: '#EEEEEE'
	},
	transparent: {
		borderRadius: 100,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	pickerText: {
		color: '#000000',
		textAlign: 'center',
		fontSize: 14
	},
	selectedPickerText: {
		color: '#FA7B12',
	},
	buttonRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}

});