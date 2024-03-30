import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';
import IconFlashGoBack from '../../../../assets/icon_app/flashGoBack.svg';
import {scaleSize} from '../../../utils/scaleSize';
import Text1 from '../../ui/Text1/Text1';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TTabBottomNavParamList} from '../../../navigation/TabBottomNav';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NameScreens} from '../../../types/nameScreens';
import {Status} from '../../../types/status';

const TaskDetailsScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TTabBottomNavParamList>>();
  const route =
    useRoute<RouteProp<TTabBottomNavParamList, NameScreens.TASKDETAILS>>();
  // const {idTask, fromScreen} = route.params;
  const {task, fromScreen} = route.params;
  console.log(task.dateCreation);

  const onPressBtn = () => {
    navigation.navigate(fromScreen);
  };

  return (
    <View style={stylesGeneral.containerScreen}>
      <TouchableOpacity style={styles.containerHeader} onPress={onPressBtn}>
        <IconFlashGoBack height={scaleSize(30)} width={scaleSize(30)} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.textId}>№ {task.id}</Text>
          <Text1
            title="creation date:"
            text={new Date(
              task.dateCreation._seconds * 1000,
            ).toLocaleDateString()}
            isRow={true}
          />
          {task.status === Status.INPROGRESS ? (
            <Text1 title="status:" text={task.status} isRow={true} />
          ) : (
            <Text1
              title="status:"
              text={`${task.status} (${new Date(
                task.dateCompleted._seconds * 1000,
              ).toLocaleDateString()})`}
              isRow={true}
            />
          )}
        </View>
        <View style={styles.textBlock}>
          <Text1 title="Title:" text={task.title} />
        </View>
        <View style={styles.textBlock}>
          <Text1 title="Description:" text={task.description} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.textPhoto}>Photos</Text>
          <View style={styles.containerImg}>
            <Image
              style={styles.img}
              source={require('../../../../assets/image/img1.png')}
            />
            <Image
              style={styles.img}
              source={require('../../../../assets/image/img2.png')}
            />
            <Image
              style={styles.img}
              source={require('../../../../assets/image/img3.png')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskDetailsScreen;
