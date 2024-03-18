import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';
import {scaleSize} from '../../../utils/scaleSize';
import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';

export const styles = StyleSheet.create({
  containerBtn: {
    width: '100%',
    backgroundColor: Colors.COLOR4,
    borderRadius: scaleSize(12),
    height: scaleSize(42),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleSize(10),
  },
  textBtn: {
    color: Colors.COLOR2,
    fontSize: FontSize.H3,
    fontFamily: Fonts.ROBOTO500,
  },
});
