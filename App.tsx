import React from 'react';
import {WebView} from 'react-native-webview';

export default function App() {
  return (
    <WebView
      source={{uri: 'https://hercules.begapp.com.br/'}} // Replace with your desired URL
      originWhitelist={['*']}
      injectedJavaScript="document.addEventListener('message', (e) => console.log(e.data));"
      onError={syntheticEvent => console.log(syntheticEvent.nativeEvent)}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      style={{flex: 1}}
    />
  );
}

// import 'react-native-gesture-handler';
// import React, {useEffect, useState} from 'react'; // Added useState
// import * as eva from '@eva-design/eva';
// import {ApplicationProvider, Spinner} from '@ui-kitten/components';
// import {NavigationContainer} from '@react-navigation/native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import Login from './app/pages/login/login.component';
// import Home from './app/pages/home/home.component';
// import RegistrarTreino from './app/pages/registrar-treino/registrar-treino.component';
// import UserConfigs from './app/pages/user-configs/user-configs.component';
// import AvaliacaoFisica from './app/pages/avaliacao-fisica/avaliacao-fisica.component';
// import {PaperProvider} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {ActivityIndicator, View} from 'react-native';
// import {decode, encode} from 'base-64';

// if (!global.btoa) {
//   global.btoa = encode;
// }

// if (!global.atob) {
//   global.atob = decode;
// }

// const {Navigator, Screen} = createDrawerNavigator();

// const MyTheme = {
//   dark: true,
//   colors: {
//     primary: '#f3f3f3',
//     background: '#ffffff',
//     card: '#222b45',
//     text: '#ffffff',
//     border: 'rgb(21, 26, 48)',
//     notification: 'rgb(176, 255, 101)',
//   },
// };

// export default function App() {
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [userToken, setUserToken] = React.useState<string | null>(null);

//   const getUserToken = async () => {
//     try {
//       let token = await AsyncStorage.getItem('access-token');
//       setUserToken(token);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     getUserToken();
//   }, []);

//   if (isLoading) {
//     return (
//       <View
//         style={{
//           backgroundColor: '#222b45',
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <ActivityIndicator size="large" color={'#fbc123'} />
//       </View>
//     );
//   }

//   return (
//     <ApplicationProvider {...eva} theme={eva.dark}>
//       <PaperProvider>
//         <NavigationContainer theme={MyTheme}>
//           <Navigator
//             initialRouteName={userToken === null ? 'Login' : 'Home'}
//             screenOptions={{
//               headerTintColor: 'white',
//               headerTitleAlign: 'center',
//             }}>
//             <Screen
//               name="Login"
//               component={Login}
//               options={{headerShown: false}}
//             />
//             <Screen name="Home" component={Home} />
//             <Screen name="Registrar Treino" component={RegistrarTreino} />
//             <Screen name="Avaliação Física" component={AvaliacaoFisica} />
//             <Screen name="Configurações de Usuário" component={UserConfigs} />
//           </Navigator>
//         </NavigationContainer>
//       </PaperProvider>
//     </ApplicationProvider>
//   );
// }
