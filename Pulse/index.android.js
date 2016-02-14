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
  Image,
  ListView,
  ToolbarAndroid,
  TouchableHighlight,
} = React;

var Button = require('react-native-button');
var React = require('react-native');

var HomePageComponent = React.createClass({
  getInitialState: function() {
    return {
      buttonText: this.props.buttonText
    };
  },

  render: function() {
    return (
      <View style={styles.homePageContainer}>
        <Image
          source={require('./images/assets/human_body/drawable-xhdpi/asset0.png')}
          style={styles.bodyimage}/>
        <Button
          style={{fontSize: 100, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={this._handlePressForward}
        >
          {this.state.buttonText}
        </Button>
      </View>
    );
  },

  _handlePressForward: function(event) {
    this.setState({
      buttonText: '-->'
    })
    this.props.onForward();
  },
});

var PainPageComponent = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([0, 1, 2, 3, 4, 5]),
    };
  },

  render: function() {
    return (
      <ListView
        style={styles.painList}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.getRow(rowData)}
      />
    );
  },

  getRow: function(rowData) {
    var imageData = [
      {
        title: 'Worst pain possible',
        image: require('./images/assets/asset5.png'),
        backgroundColor: 'rgb(237,22,128)',
        color: 'white',
      },
      {
        title: 'Very severe',
        image: require('./images/assets/asset4.png'),
        backgroundColor: 'rgb(241,75,158)',
        color: 'white',
      },
      {
        title: 'Severe',
        image: require('./images/assets/asset3.png'),
        backgroundColor: 'rgb(245,121,182)',
        color: 'white',
      },
      {
        title: 'Moderate',
        image: require('./images/assets/asset2.png'),
        backgroundColor: 'rgb(249,165,207)',
        color: 'rgb(237,22,128)',
      },
      {
        title: 'Mild',
        image: require('./images/assets/asset1.png'),
        backgroundColor: 'rgb(252,210,231)',
        color: 'rgb(237,22,128)',
      },
      {
        title: 'No pain',
        image: require('./images/assets/asset0.png'),
        backgroundColor: 'rgb(255,240,255)',
        color: 'rgb(237,22,128)',
      },
    ][rowData];
    var verticalSpace = 35;
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View
          style={{
            backgroundColor: imageData.backgroundColor,
            flex: 1,
            flexDirection: 'row',
            paddingTop: verticalSpace / 2,
            paddingBottom: verticalSpace / 2,
          }}
        >
          <Image
            source={imageData.image}
            style={{
              width: 50,
              height: 50,
              marginLeft: 10,
            }}
            />
          <Text
            style={{
              color: imageData.color,
              marginTop: verticalSpace / 2,
              marginLeft: verticalSpace / 2,
            }}>
            {imageData.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  },

  _handlePressForward: function(event) {
    this.setState({
      buttonText: 'Next'
    })
    this.props.onForward();
  },

  _onPress: function(event) {
    console.log('POOOOOJAAAA')
  },
});

var EagleEye = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'Home', index: 0}}
        renderScene={getPage}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navBar} 
            routeMapper={routeMapper}
          />
        }
      />
    );
  },
});

var routeMapper = {
  LeftButton: function(){
    return null;
  },
  RightButton: function(){
    return null;
  },
  Title: function(route, navigator, index, navState) {
   return (
     <Text style={styles.navBarText}>
       {route.name}
     </Text>
   );
 },
}

function getPage(route, navigator) {
  switch(route.name) {
    case 'Home':
    //   return (
    //     <HomePageComponent
    //       name={route.name}
    //       buttonText={'Done'}
    //       onForward={() => {
    //         var nextIndex = route.index + 1;
    //         navigator.push({
    //           name: 'Pain',
    //           index: nextIndex,
    //         });
    //         console.log(route);
    //         console.log(navigator);
    //       }}
    //       onBack={() => {
    //         if (route.index > 0) {
    //           navigator.pop();
    //         }
    //       }}
    //     />);
    //     break;
    // case 'Pain':
      return (
        <PainPageComponent
          name={route.name}
        />);
      break;
    default:
      break;
  }
}

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'cyan',
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
  },

  navBarText: {
    fontSize: 32,
    marginVertical: 20,
    borderWidth: 4,
    borderColor: 'red',
    backgroundColor: 'yellow',
    margin: 68,
    color: 'orange',
  },

  homePageContainer: {
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },

  painList: {
    marginTop: 55,
  },

  bodyimage: {
    // flex:1,
    // alignItems:'center',
    // flexDirection:'row',
    // justifyContent:'center',
    // backgroundColor:'blue',
  }
});

AppRegistry.registerComponent('EagleEye', () => EagleEye);
