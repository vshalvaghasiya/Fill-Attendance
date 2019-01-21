/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, StatusBar, View} from 'react-native';
import { Root } from 'native-base';

import Navigator from './src/action/Navigator';
export default class App extends Component{
  
  spinerRender() {
      return (
        <View style={{ flex: 1 }}>
          <Navigator />
        </View>
      )
   }

  render() {
    return (
      <Root style={styles.container}>
        <StatusBar
          backgroundColor="#232323"
          barStyle="dark-content"
        />
        {this.spinerRender()}
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
