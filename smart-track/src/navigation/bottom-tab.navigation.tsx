import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/settings.screen';
import TrackingScreen from '../screens/tracking.screen';
import {View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWifi, faCog} from '@fortawesome/free-solid-svg-icons';
import {normalize} from '../utils/intex';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarInactiveTintColor: '#492a60',
        tabBarActiveTintColor: '#221b27',
        headerStyle: {
          backgroundColor: '#492a60',
        },
        headerTintColor: 'white',
        tabBarIcon: ({color}) => {
          switch (route.name) {
            case 'Tracking':
              return (
                <View accessibilityLabel="Tracking Screen Button">
                  <FontAwesomeIcon
                    icon={faWifi}
                    color={color}
                    size={normalize(24)}
                  />
                </View>
              );
            case 'Settings':
              return (
                <View accessibilityLabel="Settings Screen Button">
                  <FontAwesomeIcon
                    icon={faCog}
                    color={color}
                    size={normalize(24)}
                  />
                </View>
              );
            default:
              return null;
          }
        },
      })}>
      <Tab.Screen name="Tracking" component={TrackingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
