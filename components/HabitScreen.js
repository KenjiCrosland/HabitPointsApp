import React, { Component } from 'react';
import moment from 'moment/src/moment';
import 
{ 	View, 
	Text, 
	Button, 
	FlatList, 
	StyleSheet, 
	Dimensions,
	AsyncStorage 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HabitListItem from './HabitListItem';
import util from './HabitScreenUtil';
let deviceWidth = Dimensions.get('window').width;

export default class HabitScreen extends Component {
  static navigationOptions = {

  	tabBarLabel: 'Home',
  	tabBarIcon: ({tintColor, focused}) => (
  		<Ionicons
  		name={focused ? 'ios-home' : 'ios-home-outline'}
  		size={26}
  		style={{color: tintColor}}
  		/>
  	)
  }
	constructor(props) {
		super(props)
		let habit = this.props.habit;
		this.state = {
			data: []
		}
	}

  componentDidMount (){
    AsyncStorage.getItem("habits").then((habitKeyArray) => {
        if (habitKeyArray !== null) {
        console.log(habitKeyArray);
        console.log("retrieved!");
        this.setState({"habits": JSON.parse(habitKeyArray)});
        this._updateData(habitKeyArray);
      } else {
        AsyncStorage.setItem("habits", "[]");
            this._updateData();

      }
    })
  }

  async _updateData (habitKeyArray) {
    if (habitKeyArray && habitKeyArray.length > 0) {
  	let habitsArray = await AsyncStorage.multiGet(JSON.parse(habitKeyArray)) || [];
  	habitsArray = habitsArray.map((habit) => {
  		return JSON.parse(habit[1])
  	})

  	this.setState({data: habitsArray})
        console.log(habitsArray);

  }
  }

  render () {
    return (
    	<FlatList
 			data={this.state.data}
 			 renderItem={({item}) => 

 			 <HabitListItem habit={item} />

 			}
    	/>
      ) 

  } 
}