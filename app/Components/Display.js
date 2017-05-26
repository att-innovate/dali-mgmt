// The MIT License (MIT)
//
// Copyright (c) 2015 Joel Arvidsson
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// See https://github.com/sundayhd/react-native-display

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
const screen = Dimensions.get('window');
const WIDTH = screen.width;
const HEIGHT = screen.height;

const DEFAULT_DURATION = 250;

export default class Display extends Component {

    constructor(props) {
        super(props);

        this.state = { enable: this.props.enable };
    }

    onEndAnimation(endState) {
        if (endState.finished == true)
            this.setState({ enable: false });
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {

        if (nextProps.enable != this.props.enable) {
            if (nextProps.enable == false) {

                let duration = nextProps.exitDuration || nextProps.defaultDuration || DEFAULT_DURATION;

                if (nextProps.exit != null) {
                    this.refs.display[nextProps.exit](duration).then((endState) => this.onEndAnimation(endState));
                }
                else
                    nextState.enable = false;
            }
            else
                nextState.enable = true;
        }
    }

    enableStyle() {
        if (this.state.enable)
            return {};

        return {
            position: 'absolute',
            top: HEIGHT,
            left: WIDTH,
            height: 0,
            width: 0,
        };
    }

    render() {

        if (this.state.enable == false && this.props.keepAlive != true)
            return null;

        return (
            <Animatable.View ref="display" style={[this.props.style, this.enableStyle.bind(this)()]}>
                {this.props.children}
            </Animatable.View>
        );
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.enable != this.props.enable)
            if (this.props.enable == true) {

                this.refs.display.stopAnimation();

                let duration = this.props.enterDuration || this.props.defaultDuration || DEFAULT_DURATION;

                if (this.props.enter != null) {
                    this.refs.display[this.props.enter](duration).then((endState) => { });
                }
            }
    }

}