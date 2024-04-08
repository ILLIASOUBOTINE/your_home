import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';
import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';

export const styles = StyleSheet.create({
  containerMain: {
    // justifyContent: 'flex-start',
    // paddingVertical: scaleSize(10),
    paddingHorizontal: 0,
  },
  container: {
    justifyContent: 'flex-start',
    paddingVertical: scaleSize(20),
  },
  containerHeader: {
    backgroundColor: Colors.COLOR2,
    paddingVertical: scaleSize(15),
    paddingLeft: scaleSize(20),
  },
  textBlock: {
    backgroundColor: Colors.COLOR1,
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(10),
    marginBottom: scaleSize(15),
  },
  textId: {
    color: Colors.COLOR6,
    fontSize: FontSize.H3,
    fontFamily: Fonts.ROBOTO500,
  },
  textPhoto: {
    color: Colors.COLOR4,
    fontSize: FontSize.H4,
    fontFamily: Fonts.ROBOTO400,
  },
  containerImg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scaleSize(15),
    justifyContent: 'space-evenly',
    paddingVertical: scaleSize(10),
  },
  img: {
    borderRadius: scaleSize(12),
    width: scaleSize(125),
    height: scaleSize(125),
  },
  closeButton: {
    position: 'absolute',
    top: scaleSize(40),
    right: scaleSize(40),
  },
  containerModal: {
    flex: 1,
    // backgroundColor: Colors.COLOR1,
  },
});
