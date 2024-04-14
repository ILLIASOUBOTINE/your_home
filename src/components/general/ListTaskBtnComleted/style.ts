import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';
import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';

export const styles = StyleSheet.create({
  container: {
    marginBottom: scaleSize(20),
  },
  taskBtn: {
    borderWidth: 0,
    color: Colors.COLOR1,
  },
  styleLastItem: {
    borderBottomLeftRadius: scaleSize(12),
    borderBottomRightRadius: scaleSize(12),
  },
  title: {
    color: Colors.COLOR4,
    fontSize: FontSize.H3,
    fontFamily: Fonts.ROBOTO500,
    marginBottom: scaleSize(8),
  },
});
