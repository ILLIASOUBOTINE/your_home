import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';

export const styles = StyleSheet.create({
  imgContainerEmpty: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: scaleSize(5),
  },
  imageContainer: {
    alignItems: 'center',
    width: scaleSize(135),
    height: scaleSize(135),
    borderWidth: 2,
    borderColor: Colors.COLOR1,
    borderRadius: scaleSize(10),
  },
});
