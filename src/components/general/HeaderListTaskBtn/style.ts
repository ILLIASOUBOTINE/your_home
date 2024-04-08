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
    borderTopLeftRadius: scaleSize(12),
    borderTopRightRadius: scaleSize(12),
    minHeight: scaleSize(42),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.COLOR1,
    paddingVertical: scaleSize(5),
    paddingHorizontal: scaleSize(8),
  },
  containerText: {},
  textBtn: {
    color: Colors.COLOR4,
    fontSize: FontSize.H3,
    fontFamily: Fonts.ROBOTO500,
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
