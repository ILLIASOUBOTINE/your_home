import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';

import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';
import {scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: scaleSize(10),
    marginBottom: scaleSize(15),
  },
  containerAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleSize(45) / 2,
    height: scaleSize(45),
    width: scaleSize(45),
    backgroundColor: Colors.COLOR3,
  },
  avatar: {
    color: Colors.COLOR4,
    fontSize: FontSize.H2,
  },
  containerText: {
    gap: scaleSize(5),
    flex: 1,
  },
  name: {
    color: Colors.COLOR4,
    fontSize: FontSize.H3,
    fontFamily: Fonts.ROBOTO500,
  },
  text: {
    color: Colors.COLOR6,
    fontSize: FontSize.H4,
    fontFamily: Fonts.ROBOTO400,
  },
  time: {
    color: Colors.COLOR1,
    fontSize: FontSize.H5,
    fontFamily: Fonts.INTER500,
  },
});
