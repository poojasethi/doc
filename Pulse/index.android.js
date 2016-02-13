/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;

// var MySceneComponent = React.createClass({
//   render: function() {
//     return (
//       <View>
//         <Text onClick={}>hello</Text>
//       </View>
//     );
//   }
// });
var Button = require('react-native-button');
var React = require('react-native');

var MySceneComponent = React.createClass({
  getInitialState: function() {
    return {
      buttonText: this.props.buttonText
    };
  },

  render: function() {
    return (
      <Button
        style={{fontSize: 100, color: 'green'}}
        styleDisabled={{color: 'red'}}
        onPress={this._handlePress}
      >
        {this.state.buttonText}
      </Button>
    );
  },

  _handlePress: function(event) {
    this.setState({
      buttonText: 'clicked'
    })
  },
});


var EagleEye = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'My First Scene', index: 0}}
        renderScene={(route, navigator) =>
          <MySceneComponent
            name={route.name}
            buttonText={'hello there'}
            onForward={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    color: 'red',
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

AppRegistry.registerComponent('EagleEye', () => EagleEye);
