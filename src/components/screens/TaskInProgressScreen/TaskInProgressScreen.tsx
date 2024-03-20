import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';

import {styles} from './style';

import HeaderToDoList from '../../general/HeaderToDoList/HeaderToDoList';
import {scaleSize} from '../../../utils/scaleSize';

const TaskInProgressScreen = () => {
  const DATA = Array.from({length: 20}, () => Math.floor(Math.random() * 100));
  return (
    <View style={[stylesGeneral.containerScreen, styles.container]}>
      <HeaderToDoList />
      <FlatList
        style={{flex: 1, marginBottom: scaleSize(20)}} // Установите flex: 1
        data={DATA}
        renderItem={({item, index}) => (
          <Text>
            Index: {index}, Number: {item}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default TaskInProgressScreen;
