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
  Switch,
  ToastAndroid,
} = React;

var Button = require('react-native-button');
var CheckBox = require('react-native-checkbox');

var logs = [];

var HomePageComponent = React.createClass({
  getInitialState: function() {
    return {
      buttonText: this.props.buttonText,
      dotData: [],
    };
  },

  getDots: function() {
    var dotData = this.state.dotData;
    return dotData.map(function(data) {
      var transform = [{translateX: data.x}, {translateY: data.y - 150}];
      var positionStyles = {transform: transform};
      return (
        <View style={[styles.dot, positionStyles]}></View>
      );
    });
  },

  render: function() {
    var dots = this.getDots();
    return (
      <View 
        style={styles.homePageContainer}
        onResponderMove={this.setPosition}
        onResponderRelease={this.resetPosition}
        onStartShouldSetResponder={this._onStartShouldSetResponder}
        onMoveShouldSetResponder={this._onMoveShouldSetResponder}>
        <View style={{position: 'absolute'}}>
          {dots}
        </View>
        <Image
          source={require('./images/assets/human_body/drawable-hdpi/asset0.png')}
          style={styles.bodyimage}/>
        <Button
          style={styles.homeButton}
          onPress={this._handlePressForward}
        >
          Done
        </Button>
      </View>
    );
  },

  _handlePressForward: function(event) {
    this.props.onForward();
  },

  setPosition: function(event) {
    console.log("setPosition");
  },

  resetPosition: function(event) {
    console.log("resetPosition");
  },

   _onStartShouldSetResponder: function(event) {
    console.log("start should set responder");
  },

  _onMoveShouldSetResponder: function(event) {
    var dots = this.state.dotData;
    dots.push({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    });
    this.setState(dots);
    console.log('move', {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    });
    // console.log("move should set responder");
  }
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
            resizeMode={"cover"}
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
    console.log('Submitted pain rating');
    console.log(event);
    this.props.onForward();
  },
});

var DetailsPageComponent = React.createClass({
  getInitialState: function() {
    return { 
      checkedMap: {},
    };
  },

  render: function() {
    var pageComponent = this;
    var getCheckBox = function(label) {
      return (
        <View style={styles.detailsCheckWrapper}>
          <CheckBox
            labelStyle={styles.detailsCheck}
            label={label}
            checked={pageComponent.state.checkedMap[label]}
            onChange={function() {
              var newCheckedMap = pageComponent.state.checkedMap;
              newCheckedMap[this.label] = !newCheckedMap[this.label];
              pageComponent.setState({
                checkedMap: newCheckedMap
              });
            }}/>
        </View>
      );
    }

    return (
      <View style={styles.painQuestions}>
          <View>
            <Text style={styles.detailsTitle}>Frequency</Text>
            {getCheckBox('Sharp')}
            {getCheckBox('Dull')}
            {getCheckBox('Crashing')}
            {getCheckBox('Burning')}
            {getCheckBox('Tearing')}
          </View>
          <View>
            <Text style={styles.detailsTitle}>Frequency</Text>
            {getCheckBox('Intermittent')}
            {getCheckBox('Constant')}
            {getCheckBox('Throbbing')}
          </View>
          <View style={styles.homePageContainer}>
            <Button
              style={styles.homeButton}
              onPress={this._handlePressForward}
            >Done</Button>
          </View>
      </View>
    );
  },

  _handlePressForward: function(event) {
    ToastAndroid.show('Logged your submission!', ToastAndroid.SHORT);
    this.props.onForward();
  }
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
      return (
        <HomePageComponent
          name={route.name}
          buttonText={'Done'}
          onForward={() => {
            var nextIndex = route.index + 1;
            navigator.push({
              name: 'Pain',
              index: nextIndex,
            });
          }}
          onBack={() => {
            if (route.index > 0) {
              navigator.pop();
            }
          }}
        />);
        break;
      case 'Pain':
      return (
        <PainPageComponent
          name={route.name}
          onForward={() => {
            var nextIndex = route.index + 1;
            navigator.push({
              name: 'Details',
              index: nextIndex,
            });
          }}
          onBack={() => {
            if (route.index > 0) {
              navigator.pop();
            }
          }}
        />);
      break;
      case 'Details':
        return (
          <DetailsPageComponent
            name={route.name}
            onForward={() => {
            var nextIndex = route.index + 1;
            navigator.push({
              name: 'Home',
              index: nextIndex,
            });
            console.log(route);
            console.log(navigator);
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />);
        break;
    default:
      break;
  }
}

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'rgb(22, 131, 251)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },

  navBarText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
    margin: 68,
    color: 'white',
    paddingBottom: 10,
  },

  homeButton: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'rgb(255, 1, 128)',
    width: 350,
    height: 50,
    textAlign:'center',
    fontSize: 32,
    marginVertical: 10,
    borderRadius: 5,
  },

  homePageContainer: {
    flex:1,
    alignItems:'center',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  painList: {
    marginTop: 55,
  },

  painQuestions: {
    marginTop: 75,
    marginLeft: 30,
    marginRight: 30,
  },

  detailsCheck: {
    color: 'rgb(22, 106, 249)',
    fontSize: 15,
    borderWidth: 1,
    marginBottom: 10,
    lineHeight: 20,
  },

  detailsCheckWrapper: {
    marginTop: 4,
    marginBottom: 4,
  },

  detailsTitle: {
    fontSize: 18,
    marginBottom: 10,
  },

  bodyimage: {
    // flex:1,
    // alignItems:'center',
    // flexDirection:'row',
    // justifyContent:'center',
    // backgroundColor:'blue',
    marginBottom: 40,
  },

  dot: {
    position: 'absolute',
    backgroundColor: 'red',
    opacity: 0.3,
    width: 10,
    height: 10,
    borderRadius: 5,
  }
});

AppRegistry.registerComponent('EagleEye', () => EagleEye);
