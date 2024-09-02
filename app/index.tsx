import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import {ProviderConsumo} from '../src/context/contextConsumo';
import TelaLogin from "../src/screens/TelaLogin";
import TelaCadastro from "../src/screens/TelaCadastro";
import HomeNavigation from "../src/navigation/HomeNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';


const Stack = createStackNavigator();

export default function Index() {
  const [lembrarLogin, setLembrarLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLembrarLogin = async () => {
      try {
        const valor = await AsyncStorage.getItem("lembrar_login");

        // Se o valor não for nulo, atualize o estado
        if (valor !== null) {
          setLembrarLogin(JSON.parse(valor));
        }
      } catch (error) {
        console.error("Erro ao buscar o valor de lembrar_login:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLembrarLogin();
    
  }, []);
  
  if(isLoading){
    return (<ActivityIndicator />)
  }

  return(
    <ProviderConsumo>
      <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={lembrarLogin ? 'Home' : 'Login'} screenOptions={{ headerShown: false}}>

        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
        <Stack.Screen name="Home" component={HomeNavigation} />

      </Stack.Navigator>
    </NavigationContainer>
  </ProviderConsumo>
  )

}

