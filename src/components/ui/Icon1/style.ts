import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';

export const styles = StyleSheet.create({
  imgsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: scaleSize(15),
  },
  imageContainer: {
    alignItems: 'center',
    width: scaleSize(125),
    height: scaleSize(125),
    borderWidth: 2,
    borderColor: Colors.COLOR1,
    borderRadius: scaleSize(10),
  },
  image: {
    // width: scaleSize(125),
    // height: scaleSize(125),
  },
});
