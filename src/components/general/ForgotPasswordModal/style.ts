import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';

export const styles = StyleSheet.create({
  containerMain: {
    paddingHorizontal: scaleSize(6),
  },
  container: {
    gap: scaleSize(20),
    justifyContent: 'center',
    paddingVertical: scaleSize(20),
  },
  containerHeader: {
    backgroundColor: Colors.COLOR2,
    paddingVertical: scaleSize(30),
    paddingLeft: scaleSize(20),
  },

  containerModal: {
    flex: 1,
  },
});
