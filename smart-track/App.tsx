import React from "react";
import { PaperProvider } from "react-native-paper";
import MainScreen from "./src/screens/main.screen";

export default function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <MainScreen />
    </PaperProvider>
  );
}
