import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';
import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';

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
  containerScroll: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.COLOR2,
    padding: scaleSize(10),
  },
  containerMessage: {
    justifyContent: 'flex-start',
    marginVertical: scaleSize(10),
  },
});
