import React, {useEffect, useState} from 'react';
import storage from '@react-native-firebase/storage';

import ImageViewer from 'react-native-image-zoom-viewer';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
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
import IconCloseOutline from '../../../../assets/icon_app/closeOutline.svg';
import {Colors} from '../../../constans/colors';
import {dateFromReduxToDateWithYear} from '../../../utils/convertTask';
import {NameNavigators} from '../../../types/nameNavigators';

const TaskDetailsScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TTabBottomNavParamList>>();
  const route =
    useRoute<RouteProp<TTabBottomNavParamList, NameScreens.TASKDETAILS>>();

  const {task, fromScreen} = route.params;
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<
    number | undefined
  >();

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
      throw error;
    }
  };

  const onPressBtn = () => {
    if (fromScreen === NameScreens.TASKCOMPLETED) {
      navigation.navigate(NameNavigators.TODOLISTSTACKNAVIGATOR, {
        screen: fromScreen,
      });
    } else if (fromScreen === NameScreens.TASKINPROGRESS) {
      navigation.navigate(NameNavigators.TODOLISTSTACKNAVIGATOR, {
        screen: fromScreen,
      });
    } else {
      navigation.goBack();
    }
  };

  const handleImagePress = (index: number) => {
    setCurrentImageIndex(index);
  };
  const handleCloseModal = () => {
    setCurrentImageIndex(undefined);
  };

  return (
    <View style={[stylesGeneral.containerScreen, styles.containerMain]}>
      <TouchableOpacity style={styles.containerHeader} onPress={onPressBtn}>
        <IconFlashGoBack height={scaleSize(30)} width={scaleSize(30)} />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.textId}>№ {task.id}</Text>
          <Text1
            title="creation date:"
            text={dateFromReduxToDateWithYear(task.dateCreation)}
            isRow={true}
          />
          {task.dateCompleted === null ? (
            <Text1 title="status:" text={task.status} isRow={true} />
          ) : (
            <Text1
              title="status:"
              text={`${task.status} (${dateFromReduxToDateWithYear(
                task.dateCompleted,
              )})`}
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
                    <TouchableOpacity
                      key={`${url}${index}`}
                      onPress={() => handleImagePress(index)}>
                      <Image
                        key={`${url}Image${index}`}
                        style={styles.img}
                        source={{uri: url}}
                      />
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
        )}
        {currentImageIndex !== undefined && (
          <Modal visible={true} transparent={true}>
            <View style={styles.containerModal}>
              <ImageViewer
                imageUrls={images.map(url => ({url}))}
                index={currentImageIndex}
                onCancel={handleCloseModal}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}>
                <IconCloseOutline fill={Colors.COLOR7} />
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
};

export default TaskDetailsScreen;
