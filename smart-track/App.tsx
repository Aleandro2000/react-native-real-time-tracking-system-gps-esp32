import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import MainScreen from './src/screens/main.screen';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <PaperProvider>
        <MainScreen />
      </PaperProvider>
    </SafeAreaView>
  );
}
