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
  navTodoList: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.COLOR1,
    borderRadius: scaleSize(6),
    padding: scaleSize(2),
  },
});
