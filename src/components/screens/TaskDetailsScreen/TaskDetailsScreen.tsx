import React, {useEffect, useState} from 'react';
import storage from '@react-native-firebase/storage';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {stylesGeneral} from '../../stylesGeneral';
import {styles} from './style';
import IconFlashGoBack from '../../../../assets/icon_app/flashGoBack.svg';
import {scaleSize} from '../../../utils/scaleSize';
import Text1 from '../../ui/Text1/Text1';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TTabBottomNavParamList} from '../../../navigation/TabBottomNav';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NameScreens} from '../../../types/nameScreens';

import {Colors} from '../../../constans/colors';
import {dateFromReduxToDate} from '../../../utils/convertTask';

const TaskDetailsScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TTabBottomNavParamList>>();
  const route =
    useRoute<RouteProp<TTabBottomNavParamList, NameScreens.TASKDETAILS>>();

  const {task, fromScreen} = route.params;
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task.photos.length !== 0) {
      setIsLoading(true);
      getImageUrls(task.photos).finally(() => {
        setIsLoading(false);
      });
    }
  }, [task]);

  const getImageUrls = async (fileNames: string[]) => {
    //Создаем ссылку на бакет Cloud Storage
    const storageRef = storage().ref();
    try {
      const urls = await Promise.all(
        fileNames.map(async fileName => {
          const imageRef = storageRef.child(fileName);
          return await imageRef.getDownloadURL();
        }),
      );
      setImages(urls);

      return urls;
    } catch (error) {
      console.error('Error getting download URLs:', error);
      throw error;
    }
  };

  const onPressBtn = () => {
    // navigation.navigate(fromScreen);
    navigation.goBack();
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
            text={dateFromReduxToDate(task.dateCreation).toUTCString()}
            isRow={true}
          />
          {task.dateCompleted === null ? (
            <Text1 title="status:" text={task.status} isRow={true} />
          ) : (
            <Text1
              title="status:"
              text={`${task.status} (${dateFromReduxToDate(
                task.dateCompleted,
              ).toUTCString()})`}
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
        {task.photos.length !== 0 && (
          <View style={styles.textBlock}>
            <Text style={styles.textPhoto}>Photos</Text>
            {isLoading ? (
              <ActivityIndicator size={'large'} color={Colors.COLOR4} />
            ) : (
              <View style={styles.containerImg}>
                {task.photos.length != 0 &&
                  images.map((url, index) => (
                    <Image
                      key={`${url}Image`}
                      style={styles.img}
                      source={{uri: url}}
                    />
                  ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TaskDetailsScreen;
