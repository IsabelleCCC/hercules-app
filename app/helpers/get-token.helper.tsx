import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import React from 'react';

interface CustomJwtPayload {
  id: number;
}

const [token, setToken] = React.useState<null | string>();
const [isLoading, setIsLoading] = React.useState(true);

const GetToken = async ({navigation}: {navigation: any}) => {
  try {
    let token = await AsyncStorage.getItem('access-token');
    setToken(token);
    console.log('Token obtido:', token);
    if (token == null) {
      navigation.navigate('Login');
    } else {
      const decoded = jwtDecode(token) as CustomJwtPayload;
      let userId = decoded.id;

      return [userId, token];
      // listExerciseWorkoutPlan(userId, token);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export default GetToken;
