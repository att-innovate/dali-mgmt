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

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SimpleButton from './SimpleButton'

const Heading = ({ refreshList, showSettings }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>
      Marks
    </Text>
    <View style={styles.buttons}>
      <View>
        <SimpleButton name='Settings' onPress={() => showSettings()} />
      </View>
      <View>
        <SimpleButton name='Refresh' onPress={() => refreshList()} />
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
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
})

export default Heading
