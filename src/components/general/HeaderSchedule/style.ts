import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';
import {FontSize} from '../../../constans/fontSize';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingVertical: scaleSize(10),
    marginBottom: scaleSize(20),
    backgroundColor: Colors.COLOR3,
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: scaleSize(5),
  },
  text: {
    marginTop: scaleSize(15),
    color: Colors.COLOR2,
    fontSize: FontSize.H1,
    paddingLeft: scaleSize(6),
  },
});
