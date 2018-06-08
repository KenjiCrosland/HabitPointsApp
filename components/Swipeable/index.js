import React, { PureComponent } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Animated, Dimensions, Easing, PanResponder, StyleSheet, View, Text } from 'react-native';
import {PropTypes} from 'prop-types';
import colors from '../../lib/style-colors';

export default class Swipeable extends PureComponent { 
    translateX = new Animated.Value(0);
    swipeTextTranslate = new Animated.Value(0);
    backgroundColor = new Animated.Value(0);
    cellHeight = new Animated.Value(0);
    cellOpacity = new Animated.Value(1);
    textOpacity = new Animated.Value(1);
    constructor(props) {
        super(props);
        this.screenWidth = Dimensions.get("window").width;

        this.state = {
            setScrollEnabled: this.props.setScrollEnabled,
            swiping: false,
            pressed: false,
            scrollEnabled: true,
            backgroundColor: "#ffffff",
            swipeState: "pendingDone",
            swipeText: "Done"
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderRelease.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this)
        });
        style: {
            right: this._previousRight
        }
    }
    componentWillUnmount() {
    }
    _handlePanResponderGrant(e, gestureState) {
        this.setState({pressed: true})
    }

    _handlePanResponderRelease(e, {vx, dx}) {
        this.translateX.flattenOffset(0);
        this.setState({pressed: false});
        this.setState({swiping: false});
        if(Math.abs(vx) >= 0.25 || Math.abs(dx) >= 0.25 * this.screenWidth) {
            //TODO: this needs to be less than half
            (dx > 0) ? this.backgroundColor.setValue(1) : this.backgroundColor.setValue(-1);
            Animated.timing(this.translateX, {
                toValue: dx > 0 ? this.screenWidth : -this.screenWidth,
                duration: 100
            }).start();
            Animated.timing(this.cellOpacity, {
                toValue: .5
            }).start(()=>{
                Animated.timing(this.textOpacity, {
                    toValue: 0
                }).start()
                Animated.timing(this.cellOpacity, {
                    toValue: 0
                }).start();
                Animated.timing(this.cellHeight, {
                    toValue: 80,
                    duration: 1000
                }).start();
                if (dx > 0){
                    this.props.addCompletion(this.props.habit);
                }
                this.props.hideHabit();
            });
        } else {
            Animated.spring(this.translateX, {
                toValue: 0,
                bounciness: 5
            }).start();
        }
        this.setState({scrollEnabled: true});
        this.state.setScrollEnabled(true); 
    }

    _handlePanResponderEnd(e, gestureState) {
        console.log("end")
        this.setState({pressed: false});
        this.setState({swiping: false});
        Animated.spring(this.translateX, {
            toValue: 0,
            bounciness: 10
        }).start();
       
    }

    _handlePanResponderMove(e, gestureState) {
        
        this.setState({swipeText: (gestureState.dx > 0) ? "Done" : "Snooze" });

        if (Math.abs(gestureState.dx) > 5) {
            this.setState({swiping: true})
        }
        if (Math.abs(gestureState.dy) < 30 && Math.abs(gestureState.dx) > 5){
            this.setState({scrollEnabled: false});
            this.state.setScrollEnabled(false);
        }

        if ( 0 < gestureState.dx && gestureState.dx < 50 ) { 
            this.swipeTextTranslate.setValue(gestureState.dx);
        } else if ( 0 > gestureState.dx && gestureState.dx > - 50) { 
            this.swipeTextTranslate.setValue(gestureState.dx);
        } else if (gestureState.dx >= 50) {
            this.swipeTextTranslate.setValue(50);
        } else if (gestureState.dx <= -50) {
            this.swipeTextTranslate.setValue(-50);
        }

        if (this.state.swiping && !this.state.scrollEnabled) {
            this._animateBackgroundColors(gestureState);
            if ( 0 < gestureState.dx && gestureState.dx < 50 ) {
                this.setState({swipeState: "pendingDone"});
            } else if ( 0 > gestureState.dx && gestureState.dx > - 50) {
                this.setState({swipeState: "pendingSnooze"});
            } else if (gestureState.dx > 50) {
                this.setState({swipeState: "done"});
            } else if (gestureState.dx < -50) {
                this.setState({swipeState: "snooze"});
            }
        }

        let newX = gestureState.dx;
        this.translateX.setValue(newX);
    }

    _animateBackgroundColors(gestureState) {
        let currentValue = this.backgroundColor.__getValue();
        console.log(currentValue);
        if (gestureState.dx > 0 && currentValue < 0) {
            this.backgroundColor.setValue(0);
        } else if (gestureState.dx < 0 && currentValue > 0) {
            this.backgroundColor.setValue(0);
        }

        if (this.state.swiping && !this.state.scrollEnabled) {
            if ( 0 < gestureState.dx && gestureState.dx < 50 ) {
                Animated.timing(this.backgroundColor, {
                    toValue: 0,
                    duration: 50
                }).start();
            } else if ( 0 > gestureState.dx && gestureState.dx > - 50) {
                Animated.timing(this.backgroundColor, {
                    toValue: 0,
                    duration: 50
                }).start();
            } else if (gestureState.dx > 50) {
                Animated.timing(this.backgroundColor, {
                    toValue: 1,
                    duration: 50
                }).start();
            } else if (gestureState.dx < -50) {
                Animated.timing(this.backgroundColor, {
                    toValue: -1,
                    duration: 50
                }).start();
            }
        }
    }



    render() {
        let animatedBackgroundColor = this.backgroundColor.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [colors.orangeYellow, colors.gray80, colors.vividGreen]
        });
        let backgroundColor = this.state.pressed && !this.state.swiping ? "#e0ecff" : "#ffffff";
        let icons = {
            "Done": "md-checkmark-circle-outline",
            "Snooze": "md-alarm",
        }
        return (
            <View>
            <Animated.View style={[styles.underswipe, {bottom: this.cellHeight, opacity: this.cellOpacity}]}>
                <Animated.View style={[styles.underSwipeContainer, {backgroundColor: animatedBackgroundColor}]}>
                    <Animated.View style={[styles.swipeTextContainer, styles[this.state.swipeState], {opacity: this.textOpacity}, {transform: [{translateX: this.swipeTextTranslate}]}]}>
                        <Ionicons
                        name={icons[this.state.swipeText]}
                        size={26}
                        style={{color: "#FFFFFF", fontWeight: "bold"}}/>
                        <Text style={styles.swipeText}>{this.state.swipeText}</Text>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
            <Animated.View 
                style={{transform: [{translateX: this.translateX}], backgroundColor: backgroundColor}}
                {...this._panResponder.panHandlers}>
                {this.props.children}
            </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    underswipe: {
        position: "absolute",
        zIndex: -1,
        top: 0,
        bottom: 0,
        left: -25,
        right: -25
    },
    underSwipeContainer: {
        flex: 1,
        backgroundColor: colors.gray80,
    },
    swipeTextContainer: {
        flex: 1,
        zIndex: -1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    swipeText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        zIndex: -1,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 16
    },
    pendingDone: {
        justifyContent: 'flex-start'
    },
    pendingSnooze: {
        justifyContent: 'flex-start',
        flexDirection: 'row-reverse'
    },
    done: {
        justifyContent: 'flex-start'
    },
    snooze: {
        justifyContent: 'flex-start',
        flexDirection: 'row-reverse'
    }
})