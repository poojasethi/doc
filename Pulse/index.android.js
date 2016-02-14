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
  Switch
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
var CheckBox = require('react-native-checkbox');
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
          <View style={styles.painQuestions}>
            <CheckBox label='Sharp' checked={false} onChange={() => {}}/>
            <CheckBox style={styles.detailsCheck} label='Dull' checked={false} onChange={() => {}}/>
            <CheckBox label='Crashing' checked={false} onChange={() => {}}/>
            <CheckBox label='Burning' checked={false} onChange={() => {}}/>
            <CheckBox label='Tearing' checked={false} onChange={() => {}}/>
            <Text>Frequency</Text>
            <CheckBox label='Intermittent' checked={false} onChange={() => {}}/>
            <CheckBox label='Constant' checked={false} onChange={() => {}}/>
            <CheckBox label='Throbbing' checked={false} onChange={() => {}}/>
            <Text>Applying pressure</Text>
            <Switch></Switch>
          </View>
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
  painQuestions: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  detailsCheck: {
    color: 'rgb(22, 106, 249)',
    fontSize: 100
  }
});

AppRegistry.registerComponent('EagleEye', () => EagleEye);
