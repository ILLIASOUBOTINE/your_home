import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';
import {Fonts} from '../../../constans/fonts';
import {FontSize} from '../../../constans/fontSize';
import {scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  textForgot: {
    color: Colors.COLOR4,
    fontFamily: Fonts.INTER500,
    fontSize: FontSize.H4,
    paddingVertical: scaleSize(10),
  },
});
