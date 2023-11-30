import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import TextComponent from '../../components/text.component';
import React, {useState} from 'react';
import DefaultScreenComponent from '../../components/default-screen.component';
import {
  Button,
  Datepicker,
  IndexPath,
  Input,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import {
  CalendarDaysIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import UserConfigFormData from '../../interfaces/user-config.interace';
import ModalError from '../../components/modal-error.component';

interface CustomJwtPayload {
  id: number;
}

const UserConfigs = ({navigation}: {navigation: any}) => {
  // Gender
  const [selectedGender, setSelectedGender] = useState('Feminino');

  const handleGenderSelect = (index: IndexPath | IndexPath[]) => {
    if (!Array.isArray(index)) {
      setSelectedGender(index.row === 0 ? 'Feminino' : 'Masculino');
    }
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState<null | string>();

  const [date, setDate] = React.useState(new Date());

  const getUserToken = async () => {
    try {
      let token = await AsyncStorage.getItem('access-token');
      setToken(token);
      console.log('Token obtido:', token);
      if (token == null || Object.keys(token).length == 0) {
        navigation.navigate('Login');
      } else {
        const decoded = jwtDecode(token) as CustomJwtPayload;
        let userId = decoded.id;

        getUser(userId, token);
      }
    } catch (error) {
      console.log(error);
      navigation.navigate('Login');
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (userId: number, userToken: string) => {
    try {
      await axios
        .get('http://10.0.2.2:8000/user/id/' + userId, {
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(response => {
          console.log(response.data);
          setInputFields(response.data);
        });
    } catch (error) {
      console.log('Error selecting user info', error);
    }
  };

  React.useEffect(() => {
    getUserToken();
  }, [token]);

  // Password
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (): React.ReactElement => {
    const icon = secureTextEntry ? (
      <EyeSlashIcon color={'#fff'} />
    ) : (
      <EyeIcon color={'#fff'} />
    );

    return (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        {icon}
      </TouchableWithoutFeedback>
    );
  };

  const [inputFields, setInputFields] = useState<UserConfigFormData>({
    id: 0,
    name: '',
    password: '',
    gender: '',
    birth_date: new Date().toString(),
    email: '',
  });

  const onSubmit = async () => {
    try {
      axios
        .put('http://10.0.2.2:8000/user', inputFields, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(response => {
          console.log(response);
        });
    } catch (error) {
      console.log('Error', error);
      return ModalError;
    }
  };

  const handleFormChange = (
    fieldName: keyof UserConfigFormData,
    fieldValue: string,
  ) => {
    setInputFields(prevFields => ({
      ...prevFields,
      [fieldName]: fieldValue,
    }));

    setDate(date);
    console.log(inputFields);
  };

  // Screen components
  return (
    <DefaultScreenComponent>
      <Input
        placeholder="Insira seu nome"
        label="Nome"
        style={{marginTop: 20}}
        keyboardType="default"
        textContentType="name"
        value={inputFields.name}
        onChangeText={event => handleFormChange('name', event)}
      />

      <Select
        label="Selecione o sexo"
        placeholder="Selecione uma opção"
        value={inputFields.gender || ''}
        onSelect={handleGenderSelect}
        style={{marginTop: 20}}>
        <SelectItem title="Feminino" />
        <SelectItem title="Masculino" />
      </Select>

      <Datepicker
        label="Data de nascimento"
        placeholder="dd/mm/aaaa"
        date={new Date(inputFields.birth_date) || undefined}
        onSelect={date => handleFormChange('birth_date', date.toString())}
        accessoryRight={<CalendarDaysIcon color={'#fff'} />}
        style={{marginTop: 20}}
      />

      <Input
        placeholder="nome@exemplo.com"
        label="E-mail"
        style={{marginTop: 20}}
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={event => handleFormChange('email', event)}
        value={inputFields.email || ''}
      />

      <Input
        label="Senha"
        placeholder="Digite a senha"
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        style={{marginTop: 20}}
        onChange={event => handleFormChange('password', event.nativeEvent.text)}
        value={inputFields.password || ''}
      />

      <Button
        appearance="outline"
        status="warning"
        accessoryLeft={<CheckIcon color={'#fda900'} />}
        onPress={onSubmit}
        style={{marginTop: 20}}>
        Salvar
      </Button>
    </DefaultScreenComponent>
  );
};

export default UserConfigs;

const styles = StyleSheet.create({});
