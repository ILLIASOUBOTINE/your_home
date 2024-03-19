import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';
import {scaleSize} from '../../../utils/scaleSize';
import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';

export const styles = StyleSheet.create({
  containerBtn: {
    width: '33%',
    height: scaleSize(30),
    backgroundColor: Colors.COLOR1,
    borderRadius: scaleSize(6),
    borderColor: Colors.COLOR2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: Colors.COLOR6,
    fontSize: FontSize.H5,
    fontFamily: Fonts.INTER500,
  },
});
