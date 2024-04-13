import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from '../storage/storage-keys';

export const SetDataString = async (
  key: StorageKeys,
  value: string | boolean,
) => {
  try {
    if (typeof value === 'boolean') {
      value = value === true ? 'true' : 'false';
    }

    await AsyncStorage.setItem(key, value);
    // console.log('StoreIsLogin', value);
  } catch (e) {
    throw e;
  }
};

export const SetDataObject = async (key: StorageKeys, value: {}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const GetDataString = async (key: StorageKeys) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === 'true' || value === 'false') {
      return JSON.parse(value);
    } else {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const GetDataObject = async (key: StorageKeys) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const RemoveValue = async (key: StorageKeys) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw e;
    // remove error
  }
};
