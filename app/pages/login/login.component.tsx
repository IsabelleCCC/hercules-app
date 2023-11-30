import React, {useState} from 'react';
import {Input, Layout, Button, Text} from '@ui-kitten/components';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {EyeSlashIcon, EyeIcon} from 'react-native-heroicons/outline';
import {Controller, useForm} from 'react-hook-form';
import TextComponent from '../../components/text.component';
import LoginFormData from '../../interfaces/login.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Login = ({navigation}: {navigation: any}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/auth/login', {
        email: data.email,
        password: data.password,
      });

      await AsyncStorage.setItem('access-token', response.data.access_token);
      await AsyncStorage.setItem('refresh-token', response.data.refresh_token);

      console.log(response.data.access_token);

      navigation.navigate('Home', {name: 'Isa'});
    } catch (error) {
      console.log('Error sign in', error);
    }
  };

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

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Layout style={styles.container}>
      <Layout style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.brand}>Hercules</Text>
      </Layout>

      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="nome@exemplo.com"
            label="E-mail"
            style={{marginTop: 20}}
            keyboardType="email-address"
            textContentType="emailAddress"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && (
        <TextComponent style={{color: '#ff3d71'}}>
          Campo obrigatório.
        </TextComponent>
      )}

      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label="Senha"
            placeholder="Digite a senha"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            style={{marginTop: 10}}
            textContentType="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && (
        <TextComponent style={{color: '#ff3d71'}}>
          Campo obrigatório.
        </TextComponent>
      )}

      <Layout style={styles.row}>
        <Text>Primeiro acesso?</Text>
        <Text status="info"> Criar conta</Text>
      </Layout>

      <Button
        appearance="outline"
        status="warning"
        onPress={handleSubmit(onSubmit)}>
        Entrar
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 185,
    height: 185,
  },
  brand: {
    color: '#fbc123',
    fontSize: 50,
    fontFamily: 'Caveat',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});

export default Login;
