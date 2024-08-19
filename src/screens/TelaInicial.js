import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TelaInicial({navigation}) {

    //tela default ao se abrir o app. Caso o usuário já esteja cadastrado, essa tela não será mais exibida.
    const limparDados = async () => {
      try {
        AsyncStorage.clear();
        Alert.alert("sucesso", "todos os dados foram limpos.")

      } catch (error) {
        Alert.alert("Erro", error);

      }
    }

    const checkCadastrado = async () => {
      try {
        const userCadastrado = await AsyncStorage.getItem("user_cadastrado");

        if(userCadastrado == "true"){
          Alert.alert("Não é possivel cadastrar", "você já realizou um cadastro.")
        } else {
          navigation.navigate("Cadastro");
        }

      } catch (error) {
        Alert.alert("Erro", "houve um erro ao resgatar dados de cadastro")
      }
    }
    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>BEM VINDO!</Text>
            <Text style={styles.subtitulo}>Escolha uma das opções abaixo para continuar:</Text>

            <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textoLogin}> FAZER LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cadastrar} onPress={checkCadastrado}>
                <Text style={styles.textoCadastrar}> CADASTRAR-SE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cadastrar} onPress={limparDados}>
                <Text style={styles.textoCadastrar}> limpar dados</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2C3E50",
        gap: 10
    },

    cadastrar: {
        backgroundColor: "#1ABC9C",
        width: "80%",
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },

      textoCadastrar: {
        color: "#ECF0F1",
        fontWeight: "bold",
      },

      login: {
        backgroundColor: "#FFA500",
        width: "80%",
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },

      textoLogin: {
        color: "#8B4513",
        fontWeight: "bold",
      },

      titulo: {
        color: "#BDC3C7",
        fontSize: 30,
        fontWeight: "600"
      },
      subtitulo: {
        color: "#CFCFCF",
        fontSize: 20,
        fontWeight: "600",
        width: "80%",
        textAlign: "center",
        paddingVertical: 30
      }
})