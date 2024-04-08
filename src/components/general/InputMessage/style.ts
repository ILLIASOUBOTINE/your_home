import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';
import {WINDOW_WIDTH, scaleSize} from '../../../utils/scaleSize';
import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.COLOR2,
    height: scaleSize(60),
  },
  input: {
    height: scaleSize(60),
    width: WINDOW_WIDTH - scaleSize(50),
    margin: scaleSize(5),
    color: Colors.COLOR6,
    fontSize: FontSize.H4,
    fontFamily: Fonts.ROBOTO500,
  },
  icon: {
    margin: scaleSize(5),
    paddingRight: scaleSize(5),
    justifyContent: 'center',
  },
});
