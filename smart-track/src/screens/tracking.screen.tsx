import React, {useState} from 'react';
import {ScrollView, Text, ActivityIndicator, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {Card} from 'react-native-paper';
import WifiManager from 'react-native-wifi-reborn';
import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import axios from 'axios';
import useGpsDataStore from '../stores/gps-data.store';
import {SMART_TRACKER_SSID, SMART_TRACKER_PASSWORD} from '@env';
import {NetworkInfo} from 'react-native-network-info';

const ConnectToESP32 = () => {
  const [loading, setLoading] = useState(false);
  const setGpsData = useGpsDataStore(state => state.setGpsData);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      const result = await check(permission);
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission);
        if (requestResult !== RESULTS.GRANTED) {
          return false;
        }
      }
    }
    return true;
  };

  const connectAndFetchData = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    setLoading(true);
    setGpsData({
      ...gpsData,
      error: '',
    });

    try {
      await WifiManager.connectToProtectedSSID(
        SMART_TRACKER_SSID,
        SMART_TRACKER_PASSWORD,
        false,
        false,
      );
      const ipAddress = await NetworkInfo.getGatewayIPAddress();
      const response = await axios.get(`http://${ipAddress}/`);
      setGpsData(response.data);
    } catch (error: any) {
      setGpsData({
        ...gpsData,
        error: error?.message || 'Failed to fetch data from ESP32',
      });
    } finally {
      setLoading(false);
    }
  };

  const gpsData = useGpsDataStore(state => state.gpsData);

  return (
    <ScrollView style={{paddingBottom: 100}}>
      <Button
        style={{marginHorizontal: 5, marginVertical: 10}}
        mode="elevated"
        onPress={connectAndFetchData}>
        Connect and Fetch Data
      </Button>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{marginVertical: 16}}
        />
      )}
      {gpsData?.error && (
        <Text
          style={{
            color: 'red',
            marginVertical: 16,
            marginHorizontal: 10,
            fontWeight: 'bold',
          }}>
          {gpsData?.error}
        </Text>
      )}
      {gpsData && !gpsData?.error && (
        <Card style={{marginTop: 16, marginHorizontal: 10}}>
          <Card.Title title="Received Data" />
          <Card.Content>
            <Text>Latitude: {gpsData?.latitude}</Text>
            <Text>Longitude: {gpsData?.longitude}</Text>
            <Text>Speed (km/h): {gpsData?.speed_kmph}</Text>
            <Text>Altitude (m): {gpsData?.altitude_m}</Text>
            <Text>HDOP: {gpsData?.hdop}</Text>
            <Text>Satellites: {gpsData?.satellites}</Text>
            <Text>Time (UTC): {gpsData?.time_utc}</Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

export default ConnectToESP32;
