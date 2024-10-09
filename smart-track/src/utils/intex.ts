import {Dimensions, PixelRatio, Platform} from 'react-native';

const scale = Dimensions.get('window').width / 380;

export const normalize = (size: number) => {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
  }
  return Math.round(PixelRatio.roundToNearestPixel(size * scale)) - 2;
};
