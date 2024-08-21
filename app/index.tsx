import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from '../src/navigation/StackInicial';

export default function Index() {

  //módulos para a navegação inicial do app

  return (
      <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>

  );
}

