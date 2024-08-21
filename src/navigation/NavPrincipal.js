import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from '../screens/HomeNavigation';
import TelaConfig from '../screens/TelaConfig';
import Icon from 'react-native-vector-icons/FontAwesome6'
const Tab = createBottomTabNavigator();

export default function NavPrincipal({navigation}) {

    //essa função define a bottomTab navigation entre a tela principal e a tela de adicionar aparelho
    return(
        <NavigationContainer independent={true}>

            <Tab.Navigator
             initialRouteName='HomeNavigation'
             screenOptions={{
                headerStyle: {
                    backgroundColor: "#1C2A38", 
                    },
             headerTintColor: "#F5F5F5",
             headerTitleStyle: {
                    fontSize: 26
                    }
                }}>

                <Tab.Screen 
                name="HomeNavigation" 
                component={HomeNavigation} 
                options={{headerShown: false, tabBarIcon: () => (<Icon name="house" />), title: "Home"}}/>

                <Tab.Screen 
                name="Configuracao" 
                component={TelaConfig}  
                options={{title: "Ajustes", tabBarIcon: () => <Icon name="gear" />}}/>
                
            </Tab.Navigator>
        </NavigationContainer>
    )
}
