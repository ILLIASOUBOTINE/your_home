import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingVertical: scaleSize(10),
    marginBottom: scaleSize(20),
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: scaleSize(5),
  },
  text: {
    marginBottom: scaleSize(25),
  },
});
