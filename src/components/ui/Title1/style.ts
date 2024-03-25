import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';

import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';
import {scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  textTitle1: {
    color: Colors.COLOR4,
    fontSize: FontSize.H2,
    fontFamily: Fonts.ROBOTO500,
    paddingVertical: scaleSize(5),
    textAlign: 'center',
  },
});
