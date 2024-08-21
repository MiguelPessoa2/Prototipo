
import { createStackNavigator } from "@react-navigation/stack";
import TelaCadastro from "../screens/TelaCadastro";
import TelaLogin from "../screens/TelaLogin";
import NavPrincipal from "./NavPrincipal";

const Stack = createStackNavigator();

export default function StackNavigator() {

    //configuração da navegação inicial do app, entre tela inicial, login, cadastro, e Home.

    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Cadastro" component={TelaCadastro} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={TelaLogin} options={{headerShown: false}}/>
            <Stack.Screen name="NavPrincipal" component={NavPrincipal} options={{headerShown: false, gestureEnabled: false}}/>
        </Stack.Navigator>
    )
}