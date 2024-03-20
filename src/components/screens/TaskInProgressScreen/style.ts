import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingVertical: scaleSize(10),
  },
  title: {
    alignSelf: 'flex-start',
  },
});
