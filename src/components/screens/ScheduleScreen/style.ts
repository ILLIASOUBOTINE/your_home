import {StyleSheet} from 'react-native';
import {scaleSize} from '../../../utils/scaleSize';
import {Colors} from '../../../constans/colors';
import {FontSize} from '../../../constans/fontSize';
import {Fonts} from '../../../constans/fonts';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',

    paddingHorizontal: 0,
  },
  listHeader: {
    color: Colors.COLOR3,
    fontSize: FontSize.H2,
    fontFamily: Fonts.ROBOTO500,
    marginBottom: scaleSize(20),
  },
});
