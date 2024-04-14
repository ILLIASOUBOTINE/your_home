import {StyleSheet} from 'react-native';

import {WINDOW_HEIGHT, WINDOW_WIDTH, scaleSize} from '../../../utils/scaleSize';

export const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    position: 'absolute',
    top: scaleSize(-50),
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 254, 0.4)',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
