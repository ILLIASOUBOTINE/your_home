import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';

import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';
import {scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  containerText: {
    alignItems: 'baseline',
    gap: scaleSize(5),
  },
  textTitle: {
    color: Colors.COLOR4,
    fontSize: FontSize.H4,
    fontFamily: Fonts.ROBOTO400,
  },
  text: {
    color: Colors.COLOR6,
    fontSize: FontSize.H5,
    fontFamily: Fonts.INTER500,
  },
  row: {
    flexDirection: 'row',
    gap: scaleSize(10),
  },
});
