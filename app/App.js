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
  AsyncStorage,
  Blob,
  Modal,
  Text,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'

import Heading from './Components/Heading'
import Settings from './Settings'
import MarkList from './MarkList'
import TabBar from './TabBar'
import MarkEditor from './MarkEditor'

var SERVER_KEY = '@Dali:server';
var server = '';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      marks: [],
      type: 'All',
      activeMark: '',
      loaded: false,
      markEditorVisible: false,
      settingsVisible: false
    }
  }

  editMark = (mark) => {
    this.setMarkEditorVisible(true)
    this.setState({ activeMark: mark })
  }

  updateMark = async (mark) => {
    let rawMark = this.convertToRawMark(mark)
    await this.postMark(rawMark)
    this.refreshList()
  }

  updateServer = (newServer) => {
    server = newServer
    this.setSettingsVisible(false)
    this.refreshList()
    AsyncStorage.setItem(SERVER_KEY, server)
  }

  setMarkEditorVisible = (visible) => {
    this.setState({ markEditorVisible: visible })
  }

  setSettingsVisible = (visible) => {
    this.setState({ settingsVisible: visible })
  }

  setType = (type) => {
    this.setState({ type })
  }

  refreshList = () => {
    this.retrieveMarks()
      .then(rawMarks => {
        console.log(rawMarks)
        this.setState({
          marks: this.convertFromRawMarks(rawMarks)
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          marks: []
        })
      });
  }

  showSettings = () => {
    this.setSettingsVisible(true)
  }

  retrieveMarks = async function () {
    let response = await fetch(server + '/mark/')
    let responseJson = await response.json()
    return responseJson.marks;
  }

  postMark = async function (mark) {
    console.log(mark)

    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    var request = new Request(server + '/mark/' + mark.Id, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(mark)
    });

    await fetch(request)
      .then(function (response) {
        if (response.status != 202)
          console.log('Something went wrong on api server!');
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  convertFromRawMarks = function (rawMarks) {
    let markIndex = 0
    let marks = []

    rawMarks.forEach((rawMark) => {
      let mark = {
        id: rawMark.Id,
        type: rawMark.Type,
        title: rawMark.Label,
        content: rawMark.Content == '' ? null : rawMark.Content,
        markIndex: markIndex++,
        notAugmented: rawMark.Type == "undefined" ? true : false
      }
      marks.push(mark)
    })

    return marks
  }

  convertToRawMark = function (mark) {
    let rawMark = {
      Id: mark.id,
      Type: mark.type,
      Label: mark.title,
      Content: mark.type == "undefined" ? '' : mark.content
    }
    return rawMark
  }

  componentDidMount = function () {
    this.loadInitialState().done();
  }

  loadInitialState = async () => {
    try {
      server = await AsyncStorage.getItem(SERVER_KEY);
      this.setState({ loaded: true });
      if (server !== null) {
        this.refreshList()
      } else {
        this.setSettingsVisible(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  render = function () {
    const { marks, type } = this.state

    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Loading...
          </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.settingsVisible}
            supportedOrientations={['portrait', 'landscape']} >
            <View style={styles.container} >
              <Settings
                server={server}
                setModalVisible={this.setSettingsVisible}
                updateServer={this.updateServer} />
            </View>
          </Modal>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.markEditorVisible}
            supportedOrientations={['portrait', 'landscape']} >
            <View style={styles.container} >
              <MarkEditor
                mark={this.state.activeMark}
                setModalVisible={this.setMarkEditorVisible}
                updateMark={this.updateMark} />
            </View>
          </Modal>
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={styles.content}>
            <Heading
              refreshList={this.refreshList}
              showSettings={this.showSettings} />
            <MarkList
              type={type}
              editMark={this.editMark}
              marks={marks} />
          </ScrollView>
          <TabBar
            type={type}
            setType={this.setType} />
        </View>
      )
    }
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
  content: {
    flex: 1
  }
})
