import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaAparelhos from "./TelaAparelhos";
import TelaConfigAparelho from "./ConfigAparelho";
import TelaAdicionar from "./AdicionarAparelho";

const Stack = createStackNavigator();

export default function HomeNavigation(){
    //navegação entre a tela principal do app e a tela de detalhes dos aparelhos conectados
    
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Aparelhos"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1C2A38", 
                    },
                headerTintColor: "#F5F5F5",
                headerTitleStyle: {
                    fontSize: 26
                }
                }}>
                <Stack.Screen name="Aparelhos" component={TelaAparelhos} options={{title: "APARELHOS", headerLeft: null}}/>
                <Stack.Screen name="TelaConfig" component={TelaConfigAparelho} options={{title: "DETALHES", headerBackTitle: "VOLTAR"}}/>
                <Stack.Screen name="Adicionar" component={TelaAdicionar} options={{title: "ADICIONAR"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}