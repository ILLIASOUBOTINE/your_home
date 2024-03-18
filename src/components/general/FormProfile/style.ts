import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';
import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';
import {scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  containerForm: {width: '100%', gap: scaleSize(14)},
  input1: {
    color: Colors.COLOR1,
    fontSize: FontSize.H5,
    fontFamily: Fonts.INTER500,
    borderWidth: 2,
    borderColor: Colors.COLOR1,
    borderRadius: scaleSize(8),
    width: '100%',
    height: scaleSize(36),
    paddingLeft: scaleSize(10),
  },
  input2: {
    height: scaleSize(82),
  },
});
