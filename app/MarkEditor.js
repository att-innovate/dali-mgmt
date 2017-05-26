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
import Display from './Components/Display'
import ModalPicker from './ModalPicker'

export default class MarkEditor extends React.Component {

  constructor(props) {
    super(props)

    var newContent = this.props.mark.type == "tasklist" ? this.convertFromRawTaskList(this.props.mark.content) : this.props.mark.content

    this.state = {
      selectedType: this.props.mark.type.substring(0, 1).toLocaleUpperCase() + this.props.mark.type.substring(1),
      content: newContent 
    }
  }

  convertFromRawTaskList = function (tasklist) {
    var result = ''
    if (tasklist == null) return result

    tasklist.forEach((task) => {
      result = result+task+'\n'
    })

    return result    
  }

  convertToRawTaskList = function (text) {
    if (text.length == 0) return ''
    return text.match(/[^\r\n]+/g)
  }

  handleSave = function () {
    const { mark, setModalVisible, updateMark } = this.props
    const { selectedType, content } = this.state

    var newContent = content == null ? '' : content
    newContent = selectedType == "Tasklist" ? this.convertToRawTaskList(newContent) : newContent
    
    let newMark = {
        id: mark.id,
        title: mark.title,
        type: selectedType.toLowerCase(),
        content: newContent      
    }

    updateMark(newMark)
    setModalVisible(false)
  }

  render = function () {
    const { mark, setModalVisible } = this.props
    const { selectedType, content } = this.state

    let index = 0;
    const typeList = [
      { key: index++, label: 'Undefined' },
      { key: index++, label: 'Note' },
      { key: index++, label: 'Tasklist' },
      { key: index++, label: 'Image' },
      { key: index++, label: 'Link' }]

    index = 0;
    const imageList = [
      { key: index++, label: 'Danger' },
      { key: index++, label: 'DontTouch' },
      { key: index++, label: 'DownArrow' },
      { key: index++, label: 'UpArrow' }]

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Mark Editor
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
            <View style={{ flex: 0.2 }}>
              <Text style={styles.formText}>
                Title:
              </Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.formText}>
                {mark.title}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 0.2 }}>
              <Text style={styles.pickerText}>
                Type:
              </Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <ModalPicker
                data={typeList}
                initValue={selectedType}
                onChange={(option) => {
                  this.setState({ selectedType: option.label })
                  this.setState({ content: null }) }}>
                <TextInput
                  style={styles.picker}
                  editable={false}
                  placeholder={selectedType}
                  value={selectedType} />
              </ModalPicker>
            </View>
          </View>
        </View>
        <View style={styles.form}>
          <Display enable={selectedType == "Undefined"}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.formText}>
                  ... select a type first
              </Text>
              </View>
            </View>
          </Display>
          <Display enable={selectedType == "Note"}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  multiline={true}
                  style={styles.contentText}
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  autoFocus={true}
                  onChangeText={(content) => this.setState({ content })}
                  value={content} />
              </View>
            </View>
          </Display>
          <Display enable={selectedType == "Link"}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  multiline={false}
                  style={styles.contentLink}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  autoFocus={true}
                  defaultValue={'http://'}
                  onChangeText={(content) => this.setState({ content })}
                  value={content} />
              </View>
            </View>
          </Display>
          <Display enable={selectedType == "Tasklist"}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  multiline={true}
                  style={styles.contentText}
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  autoFocus={true}
                  defaultValue={'task 1\ntask 2'}
                  onChangeText={(content) => this.setState({content})}
                  value={content} />
              </View>
            </View>
          </Display>
          <Display enable={selectedType == "Image"}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
              <ModalPicker
                data={imageList}
                initValue={content}
                onChange={(option) => {
                  this.setState({ content: option.label })}}>
                <TextInput
                  style={styles.picker}
                  editable={false}
                  placeholder={'select image'}
                  value={content} />
              </ModalPicker>
              </View>
            </View>
          </Display>
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
    paddingBottom: 7
  },
  pickerText: {
    color: '#777777',
    fontSize: 17,
    paddingTop: 3
  },
  picker: {
    height: 25,
    padding: 4,
    borderColor: '#ededed',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 17,
    color: '#777777',
    marginRight: 20,
    paddingTop: 7,
    paddingBottom: 7
  },
  contentText: {
    height: 100,
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
  contentLink: {
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
