import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  TextInput,
  View,
} from 'react-native';

import {styles} from './style';
import Btn1 from '../../ui/Btn1/Btn1';
import {stylesGeneral} from '../../stylesGeneral';
import Task from '../../../types/Task';
import {Status} from '../../../types/status';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import ImgTask from '../../ui/ImgTask/ImgTask';
import ImgTaskPhoto from '../../ui/ImgTaskPhoto/ImgTaskPhoto';

type TFormAddTaskParams = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormAddTask = ({setIsLoading}: TFormAddTaskParams) => {
  const userId = useSelector((state: RootState) => state.user.id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsePhoto, setResponsePhoto] = useState<ImagePicker.Asset[]>([]);
  const [isHidePhoto, setIsHidePhoto] = useState<boolean>(true);

  const createNewTask = (images: string[]): Task => {
    const newTask: Task = {
      title: title,
      description: description,
      photos: images,
      status: Status.INPROGRESS,
      schedule: false,
      dateSchedule: null,
      userId: userId,
      dateCreation: new Date(),
      dateCompleted: null,
    };
    return {...newTask};
  };

  const uploadTaskInFirestore = async (newTask: Task) => {
    try {
      const uploadedTaskInFirestore = await firestore()
        .collection('Tasks')
        .add(newTask);
      return uploadedTaskInFirestore;
    } catch (error) {
      throw error;
    }
  };

  const handlerAddTask = async () => {
    setIsLoading(true);

    if (!title || !description) {
      Alert.alert('Add task', ' all fields must be filled in');
      setIsLoading(false);
      return;
    }

    try {
      const imagePathInStorage = await uploadImagesInStorage();

      const newTask = createNewTask(imagePathInStorage);
      await uploadTaskInFirestore(newTask);
      Alert.alert('Add Task', 'Task added!');
      setTitle('');
      setDescription('');

      setResponsePhoto([]);
    } catch (error) {
      Alert.alert('Add Task', 'Task didn`t add!');
    } finally {
      setIsLoading(false);
    }
  };

  const handlerCameraLaunch = async () => {
    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
      quality: 0.1,
      includeBase64: false,
      maxHeight: 500,
      maxWidth: 500,
    };
    const launchCamera = () => {
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorCode);
        } else {
          if (response.assets !== undefined) {
            const newAssets = [...response.assets];
            setResponsePhoto(prev => [...prev, ...newAssets]);
            console.log('asset', response.assets);
          }
        }
      });
    };
    try {
      if (Platform.OS === 'android') {
        const grantedAndroid = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );

        if (grantedAndroid === PermissionsAndroid.RESULTS.GRANTED) {
          launchCamera();
        } else {
          Alert.alert(
            'Permission Denied',
            'You need to grant camera permission to take a picture.',
          );
        }
      }
      if (Platform.OS === 'ios') {
        launchCamera();
      }
    } catch (error) {
      console.error('Error requesting camera permission: ', error);
    }
  };

  const handlerLaunchImageLibrary = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.1,
      includeBase64: false,
      maxHeight: 500,
      maxWidth: 500,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else {
        if (response.assets !== undefined) {
          const newAssets = [...response.assets];
          setResponsePhoto(prev => [...prev, ...newAssets]);
          console.log('asset', response.assets);
        }
      }
    });
  };

  const uploadImagesInStorage = async () => {
    const uploadTasks = responsePhoto.map(async (asset: ImagePicker.Asset) => {
      const pathToFile = asset.uri;
      const fileNameImg = asset.fileName;
      const reference = storage().ref(fileNameImg);

      try {
        if (pathToFile && fileNameImg) {
          await reference.putFile(pathToFile);

          return fileNameImg;
        }

        throw new Error('Path to file or file name is invalid');
      } catch (error) {
        console.error(`Error uploading image ${fileNameImg}: `, error);
        throw error;
      }
    });

    try {
      const uploadedImages = await Promise.all(uploadTasks);
      return uploadedImages;
    } catch (error) {
      console.error('Error uploading images: ', error);
      throw error;
    }
  };

  const handlerAddPhoto = () => {
    setIsHidePhoto(prev => !prev);
  };

  const handlerDeletePhoto = (indexPhoto: number) => {
    Alert.alert('Do you wont delete photo?', undefined, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const newArr = responsePhoto.filter(
            (_, index) => index !== indexPhoto,
          );
          setResponsePhoto(newArr);
        },
      },
    ]);
  };

  return (
    <View style={stylesGeneral.containerForm}>
      <TextInput
        style={stylesGeneral.input1}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[stylesGeneral.input1, stylesGeneral.input2]}
        placeholder="Discription"
        value={description}
        multiline={true}
        onChangeText={setDescription}
      />
      {!isHidePhoto && (
        <View style={styles.imgsContainer}>
          <ImgTask
            onPressSelectPhoto={handlerLaunchImageLibrary}
            onPressTakePhoto={handlerCameraLaunch}
          />
          {responsePhoto.length !== 0 &&
            responsePhoto.map((asset: ImagePicker.Asset, index) => (
              <ImgTaskPhoto
                key={`${new Date().getSeconds()}${index}`}
                onPressDelletePhoto={() => handlerDeletePhoto(index)}
                urlImage={asset.uri}
              />
            ))}
        </View>
      )}
      <Btn1 onPressBtn={handlerAddPhoto}>
        {!isHidePhoto
          ? 'Hide photo'
          : responsePhoto.length == 0
          ? 'Add photo'
          : `Add photo (${responsePhoto.length})`}
      </Btn1>

      <Btn1 onPressBtn={handlerAddTask}>Add Task</Btn1>
    </View>
  );
};

export default FormAddTask;
