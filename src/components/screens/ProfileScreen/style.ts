import {StyleSheet} from 'react-native';
import {Colors} from '../../../constans/colors';
import {scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  containerScroll: {
    justifyContent: 'center',
  },
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
