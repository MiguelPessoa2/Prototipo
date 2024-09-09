// HomeNavigation.js
import { createStackNavigator } from "@react-navigation/stack";
import TelaAparelhos from "../screens/TelaAparelhos";
import TelaConfigAparelho from "../screens/ConfigAparelho";
import TelaAdicionar from "../screens/AdicionarAparelho";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  const Header = ({ titulo }) => {
    return (
      <View>
        <LinearGradient
          colors={['#1C1C1C', '#2F2F2F', '#1C1C1C']}
          style={{
            width: "100%",
            height: 110,
            justifyContent: "center",
            alignItems: "center",
            borderBottomColor: "black",
            borderBottomWidth: 2,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >

            <Text style={styles.titulo}>ESmartHome</Text>

          <Text style={styles.titulo2}>{titulo}</Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName="Aparelhos"
      screenOptions={({ route }) => ({
        header: () => <Header titulo={route.params?.titulo || "padrão"}/>,
      })}
    >
      <Stack.Screen
        name="Aparelhos"
        component={TelaAparelhos}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="TelaConfig"
        component={TelaConfigAparelho}
      />
      <Stack.Screen
        name="Adicionar"
        component={TelaAdicionar}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "#FFB300",
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 10,
  },
  titulo2: {
    color: "#F5F5F5",
    fontWeight: "bold",
    fontSize: 20,
  },
  titulo3: {
    color: '#00BFFF', // Texto claro
    fontSize: 15, // Tamanho do texto
    fontWeight: '300', // Peso da fonte mais leve
    textAlign: 'center', // Centraliza o texto
    letterSpacing: 0.5, // Espaçamento entre letras
    fontWeight: "500",
    textDecorationLine: "underline",
    marginLeft: 10
  }
});
