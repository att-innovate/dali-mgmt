// The MIT License (MIT)
//
// Copyright (c) 2017 AT&T
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'

import SimpleButton from './Components/SimpleButton'

export default class Settings extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newServer: this.props.server
    }
  }

  handleSave = function () {
    const { updateServer } = this.props
    const { newServer } = this.state

    updateServer(newServer)
  }

  render = function () {
    const { setModalVisible } = this.props
    const { newServer } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Settings
          </Text>
          <View style={styles.buttons}>
            <View style={styles.saveButton}>
              <SimpleButton name='Save' onPress={() => this.handleSave()} />
            </View>
            <View style={styles.cancelButton}>
              <SimpleButton name='Cancel' onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
        <View style={styles.form}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 0.3 }}>
              <Text style={styles.formText}>
                Server:
              </Text>
            </View>
              <View style={{ flex: 0.7 }}>
                <TextInput
                  multiline={false}
                  style={styles.contentServer}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  autoFocus={true}
                  placeholder={'http://127.0.0.1:8085'}
                  onChangeText={(newServer) => this.setState({ newServer })}
                  value={newServer} />
              </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  header: {
    marginTop: 40,
    marginBottom: 10,
    flexDirection: 'row',
  },
  headerText: {
    flex: 1.5,
    textAlign: 'left',
    paddingLeft: 18,
    fontSize: 36,
    color: '#666666',
    fontWeight: '100'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    marginTop: 10
  },
  saveButton: {
  },
  cancelButton: {
  },
  formText: {
    color: '#777777',
    fontSize: 17,
    paddingTop: 6,
    paddingBottom: 7
  },
  contentServer: {
    height: 32,
    padding: 4,
    borderColor: '#ededed',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 17,
    color: '#777777',
    marginRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
  },
  form: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    paddingLeft: 14,
    paddingTop: 7,
    paddingBottom: 7,
  }
})
