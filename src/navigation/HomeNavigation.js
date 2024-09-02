import { createStackNavigator } from "@react-navigation/stack";
import TelaAparelhos from "../screens/TelaAparelhos";
import TelaConfigAparelho from "../screens/ConfigAparelho";
import TelaAdicionar from "../screens/AdicionarAparelho";

const Stack = createStackNavigator();

export default function HomeNavigation(){
    //navegação entre a tela principal do app e a tela de detalhes dos aparelhos conectados
    
    return(
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
    )
}