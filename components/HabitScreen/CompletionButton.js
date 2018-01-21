import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	View,
	Text
} from 'react-native';

export default class CompletionButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			completed: this.props.completed
		}

		this._onPressIn = this._onPressIn.bind(this);
	}

	_onPressIn(){
		this.setState({completed: this.state.completed ? false : true}, function(){
			if(this.state.completed === true){
				this.props.addCompletion(this.props.habit);
			}
			else{
				this.props.removeCompletion(this.props.habit);
			}
		})

		//probably need to do a query for the id?
	}

	render(){
		return(
			<TouchableHighlight 
			onPress={this._onPressIn}
			style={[styles.base, this.state.completed && styles.completed]}>
			<View style={styles.transparent}>
			<Text style={styles.checkmark}>
			{this.state.completed ? '\u2713' : ''}
			</Text>
			</View>
			</TouchableHighlight>
			);
	}
}

var styles = StyleSheet.create({
	base: {
		backgroundColor: '#CCCCCC',
		borderRadius: 100,
		height: 44,
		width: 44,
		margin: 3,
		justifyContent: 'center'
	},
	touchable: {
		borderRadius: 100,
		height: 44,
		width: 44
	},
	completed: {
		backgroundColor: '#59CC0D'
	},
	transparent: {
		borderRadius: 100,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	checkmark: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 24,
		color: '#FFFFFF'
	}


})