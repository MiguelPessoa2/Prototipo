import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaHome from "./Home";
import TelaConfigAparelho from "./AdicionarAparelho";

const Stack = createStackNavigator();

export default function HomeNavigation(navigation){

    //essa função define a navegação entre a tela principal do app e a tela de detalhes dos aparelhos conectados
    return(
        <NavigationContainer independent={true}>

            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={TelaHome} options={{gestureEnabled: false}}/>
                <Stack.Screen name="TelaConfig" component={TelaConfigAparelho} options={{gestureEnabled: false}}/>
            </Stack.Navigator>

        </NavigationContainer>
    )
}