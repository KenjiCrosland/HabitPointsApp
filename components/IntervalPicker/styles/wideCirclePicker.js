'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
} from 'react-native';

module.exports = StyleSheet.create({

	base:{
		borderRadius: 15,
		height: 35,
		width: 55,
		justifyContent: 'center'
	},
	selected: {
		backgroundColor: '#FA7B12'
	},
	transparent: {
		borderRadius: 100,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	pickerText: {
		color: '#000000',
		textAlign: 'center',
		fontSize: 16
	},
	whitePickerText: {
		color: '#FFFFFF'
	},
	selectedPickerText: {
		color: '#FFFFFF',
	},
	buttonRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}

});