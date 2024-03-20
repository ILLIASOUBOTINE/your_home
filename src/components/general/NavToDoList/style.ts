import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';

export const styles = StyleSheet.create({
  navTodoList: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.COLOR1,
    borderRadius: scaleSize(6),
    padding: scaleSize(2),
  },
  activeButton: {
    backgroundColor: Colors.COLOR2,
    color: Colors.COLOR3,
  },
});
