import { createStackNavigator } from "@react-navigation/stack";
import TelaCadastro from "../screens/TelaCadastro";
import TelaLogin from "../screens/TelaLogin";
import HomeNavigation from "./HomeNavigation";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function StackNavigator() {
    const [lembrarLogin, setLembrarLogin] = useState(AsyncStorage.getItem("lembrar_senha"));

    // Configuração da navegação inicial do app, entre tela inicial, login, cadastro, e Home.

    return lembrarLogin ? (
        <HomeNavigation />
    ) : (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={TelaLogin} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}