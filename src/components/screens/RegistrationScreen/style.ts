import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';

export const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: Colors.COLOR5,
    justifyContent: 'space-between',
  },
  containerHeader: {
    backgroundColor: Colors.COLOR2,
    paddingVertical: scaleSize(5),
    marginBottom: scaleSize(10),
  },
});
