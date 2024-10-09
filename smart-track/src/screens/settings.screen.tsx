import React from 'react';
import {ScrollView, Text, StyleSheet, Alert} from 'react-native';
import useGpsDataStore from '../stores/gps-data.store';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function SettingsScreen({}): React.JSX.Element {
  const setGpsData = useGpsDataStore(store => store.setGpsData);
  const navigation = useNavigation();

  const handleNullGpsData = () => {
    setGpsData(null);
    Alert.alert('GPS Data', 'GPS data has been deleted.');
  };

  const handleNavigateToAuthor = () => {
    navigation.navigate('Author' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <Button
        mode="elevated"
        style={styles.section}
        onPress={handleNullGpsData}>
        <Text style={styles.text}>Delete GPS Data</Text>
      </Button>
      <Button
        mode="elevated"
        style={styles.section}
        onPress={handleNavigateToAuthor}>
        <Text style={styles.text}>Got to Author Screen</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  section: {
    padding: 20,
    margin: 5,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
