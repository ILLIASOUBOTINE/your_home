import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  container: {
    marginBottom: scaleSize(20),
  },
  taskBtn: {
    marginBottom: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
  styleLastItem: {
    borderBottomLeftRadius: scaleSize(12),
    borderBottomRightRadius: scaleSize(12),
  },
});
