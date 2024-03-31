import React, {useEffect, useState} from 'react';
import storage from '@react-native-firebase/storage';
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
  const [images, setImages] = useState<string[]>([]);
  const {task, fromScreen} = route.params;

  useEffect(() => {
    if (task.photos) {
      getImageUrls(task.photos);
    }
  }, [task]);
  //Создаем ссылку на бакет Cloud Storage
  const storageRef = storage().ref();

  // Функция для получения URL каждой картинки из массива
  const getImageUrls = async (fileNames: string[]) => {
    try {
      const urls = await Promise.all(
        fileNames.map(async fileName => {
          const imageRef = storageRef.child(fileName);
          return await imageRef.getDownloadURL();
        }),
      );
      setImages(urls);
      console.log('Download URLs:', urls);
      // Здесь вы можете использовать полученные URLs для отображения изображений в вашем приложении
      return urls;
    } catch (error) {
      console.error('Error getting download URLs:', error);
      throw error;
    }
  };

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
            {task.photos &&
              images.map((url, index) => (
                <Image
                  key={`${url}Image`}
                  style={styles.img}
                  source={{uri: url}}
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskDetailsScreen;
