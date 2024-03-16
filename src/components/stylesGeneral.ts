import {StyleSheet} from 'react-native';
import {scaleSize} from '../utils/scaleSize';
import {Colors} from '../constans/colors';

export const stylesGeneral = StyleSheet.create({
  containerScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleSize(6),
    backgroundColor: Colors.COLOR5,
  },
});
