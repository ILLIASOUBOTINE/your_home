import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';
import {scaleSize} from '../../../utils/scaleSize';
import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';

export const styles = StyleSheet.create({
  containerBtn: {
    flexDirection: 'row',

    width: '100%',
    backgroundColor: Colors.COLOR2,
    borderRadius: scaleSize(12),
    minHeight: scaleSize(42),
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: scaleSize(10),
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: Colors.COLOR1,
    paddingVertical: scaleSize(5),
  },
  containerText: {marginLeft: scaleSize(8)},
  textBtn: {
    color: Colors.COLOR4,
    fontSize: FontSize.H2,
    fontFamily: Fonts.ROBOTO500,
  },
  iconFlash: {
    height: scaleSize(40),
    width: scaleSize(40),
  },
  textOptional: {
    fontSize: FontSize.H5,
    fontFamily: Fonts.INTER500,
    color: Colors.COLOR1,
    marginLeft: scaleSize(10),
  },
  containerOptional: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
