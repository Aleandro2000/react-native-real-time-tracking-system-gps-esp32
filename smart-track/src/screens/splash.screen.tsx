import React, { useEffect } from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import LogoSvg from '../svgs/logo-svg';

export default function SplashScreen(): React.JSX.Element {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
        <LogoSvg width={300} height={300} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  center: {
    alignItems: 'center',
  },
});
