// HomeNavigation.js
import { createStackNavigator } from "@react-navigation/stack";
import TelaAparelhos from "../screens/TelaAparelhos";
import TelaConfigAparelho from "../screens/ConfigAparelho";
import TelaAdicionar from "../screens/AdicionarAparelho";

import Header from '../components/Header';

const Stack = createStackNavigator();

export default function HomeNavigation() {

  return (
    <Stack.Navigator
      initialRouteName="Aparelhos">

      <Stack.Screen
        name="Aparelhos"
        component={TelaAparelhos}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} titulo="HOME" />
        })}
      />

      <Stack.Screen
        name="TelaConfig"
        component={TelaConfigAparelho}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} titulo="DETALHES" />
        })}
      />
      <Stack.Screen
        name="Adicionar"
        component={TelaAdicionar}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} titulo="ADICIONAR" />
        })}
      />
    </Stack.Navigator>
  );
}
