import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  imgsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: scaleSize(15),
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 125,
    height: 125,
  },
});
