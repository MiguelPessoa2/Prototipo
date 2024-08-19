import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function TelaLogin({navigation}) {

    //tela onde o usuário fará login com email e senha.

    //dados resgatados do AsyncStorage de email e senha
    const [userEmail, setUserEmail] = useState("");
    const [userSenha, setUserSenha] = useState("");

    //dados inseridos pelo o usuário para fazer login
    const [senhaInput, setSenhaInput] = useState("")
    const [emailInput, setEmailInput] = useState("")

    //função para resgatar dados de cadastro
    const resgatarData = async () => {
      try {
        const emailArmazenado = await AsyncStorage.getItem("user_email");
        const senhaArmazenada = await AsyncStorage.getItem("user_senha");

        if (emailArmazenado !== null) setUserEmail(emailArmazenado);
        if (senhaArmazenada !== null) setUserSenha(senhaArmazenada);
      } catch (error) {

        Alert.alert("erro", "erro ao resgatar dados.")
      }
    }

    const handleLogin = async () => {
      
      if(!userEmail || !userSenha || !senhaInput || !emailInput){
        return Alert.alert("Erro", "os campos usuário e senha não podem estar vazios.");
      }

      if((userEmail === emailInput) && (userSenha === senhaInput)){
        navigation.navigate("NavPrincipal")

      } else {
        Alert.alert("erro", "usuário ou senha incorreta")
      }
    }

    useEffect(() => {
      resgatarData();

    }, [])
    return(

        <View style={styles.container}>

            <Text style={styles.titulo}>FAZER LOGIN</Text>

            <TextInput
            style={styles.textInput}
            placeholder="E-mail:"
            placeholderTextColor="#BDC3C7"
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailInput}
            onChangeText={(email) => setEmailInput(email)}>
            </TextInput>

            <TextInput
            style={styles.textInput}
            placeholder="Senha:"
            placeholderTextColor="#BDC3C7"
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry
            value={senhaInput}
            onChangeText={(senha) => setSenhaInput(senha)}>
            </TextInput>

            <TouchableOpacity style={styles.cadastrar} onPress={handleLogin}>
                <Text style={styles.textoCadastrar}> FAZER LOGIN</Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Centraliza horizontalmente o conteúdo
        backgroundColor: "#2C3E50",
        gap: 10
      },

      textInput: {
        height:40,
        width: "80%",
        backgroundColor: "#34495E",
        borderColor: "transparent",
        borderBottomColor: "gray",
        borderBottomWidth: 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 8,
        color: '#ECF0F1',
        fontSize: 16,
      },
      cadastrar: {
        backgroundColor: "#FFA500",
        width: "80%",
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      textoCadastrar: {
        color: "#8B4513",
        fontWeight: "bold",
      },
      titulo: {
        color: "#E6E6E6",
        fontSize: 26,
        fontWeight: "600",
        textDecorationLine: "underline" 
      }
})