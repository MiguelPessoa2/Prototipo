import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Checkbox from 'expo-checkbox';
import {LinearGradient} from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

export default function TelaLogin({navigation}) {

    //tela onde o usuário fará login com email e senha.

    //dados resgatados do AsyncStorage de email e senha
    const [userEmail, setUserEmail] = useState("");
    const [userSenha, setUserSenha] = useState("");

    //dados inseridos pelo o usuário para fazer login
    const [senhaInput, setSenhaInput] = useState("")
    const [emailInput, setEmailInput] = useState("")

    const [isChecked, setIsChecked] = useState(false)

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

      if(!emailInput){
        return Alert.alert("Erro", "O campo usuário não pode ficar vazio.")
      }
            
      if(!senhaInput){
        return Alert.alert("Erro", "O campo senha não pode ficar vazio.");
      }

      if((userEmail === emailInput) && (userSenha === senhaInput)){
        await AsyncStorage.setItem("lembrar_login", isChecked.toString())
        navigation.navigate("Home", {titulo: "HOME"})

      } else {
        Alert.alert("Erro ao fazer Login", "usuário ou senha incorreto.")
      }
    }

    useFocusEffect(
      useCallback(() =>{
        resgatarData();

      }, [])
    )

    return(
    <ImageBackground source={require('../assets/prism.png')} style={styles.background}>
      <StatusBar hidden={true} />
    <View style={styles.container}>

        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 50}}>
          <Icon name="bolt" size={70} color="#FFB300"/>
              <Text style={styles.titulo}>ESmartHome</Text>
        </View>

        <Text style={styles.text3}>Faça Login para continuar</Text>

        <View style={styles.wrapperInput}>
          <Icon name="user" style={{flex: 1}} size={24}/>

          <TextInput
          style={styles.textInput}
          placeholder="Usuário:"
          placeholderTextColor="darkgray"
          keyboardType="email-address"
          autoCapitalize="none"
          value={emailInput}
          onChangeText={(email) => setEmailInput(email)}>
          </TextInput>
        </View>

        <View style={styles.wrapperInput}>
          <Icon name="lock" style={{flex: 1}} size={24} />
          
          <TextInput
          style={styles.textInput}
          placeholder="Senha:"
          placeholderTextColor="darkgray"
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry
          value={senhaInput}
          onChangeText={(senha) => setSenhaInput(senha)}>
          </TextInput>
        </View>

        <TouchableOpacity style={styles.cadastrar} onPress={handleLogin}>
          <LinearGradient 
          colors={['rgba(0, 100, 0, 0.85)', 'rgba(0, 150, 0, 0.85)', 'rgba(0, 200, 0, 0.85)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{width: "100%", height: "100%", borderRadius: 25, justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "black", fontWeight: "700"}}>ENTRAR</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{flexDirection: "row", gap: 5}}>
          <Text style={styles.text}>Não possui uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}><Text style={styles.text2}>Cadastrar-se</Text></TouchableOpacity>
        </View>

    </View>
    </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Centraliza horizontalmente o conteúdo
        backgroundColor: "transparent",
        gap: 10
      },

      textInput: {
        flex: 8,
        height: 40,
        borderColor: "transparent",
        paddingHorizontal: 8,
        color: '#ECF0F1',
        fontSize: 16,
      },
      cadastrar: {
        backgroundColor: "rgba(255, 165, 0, 0.7)",
        width: "88%",
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "darkgreen",
      },
      textoCadastrar: {
        color: "#D3D3D3",
        fontWeight: "bold",
      },
      wrapperInput: {
        width: "90%",
        height:"fit-content",
        borderColor: "gray",
        borderWidth: 2,
        padding: 10,
        paddingLeft: 30,
        marginBottom: 10,
        flexDirection: "row",
        backgroundColor: "rgba(169, 169, 169, 0.25)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
      },
      background: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover', // Ajusta a imagem para cobrir a tela inteira
      },

      wrapperCheckBox: {
        flexDirection: "row",
        width: "89%",
        height: "fot-content",
        padding: 8
      },

      titulo: {
        color: "#FFB300",
        fontWeight: "bold",
        fontSize: 25
      },
      text: {
        color: '#A9A9A9', // Texto claro
        fontSize: 15, // Tamanho do texto
        fontWeight: '300', // Peso da fonte mais leve
        textAlign: 'center', // Centraliza o texto
        letterSpacing: 0.5, // Espaçamento entre letras
        fontWeight: "500",
      },
      text2: {
        color: '#00BFFF', // Texto claro
        fontSize: 15, // Tamanho do texto
        fontWeight: '300', // Peso da fonte mais leve
        textAlign: 'center', // Centraliza o texto
        letterSpacing: 0.5, // Espaçamento entre letras
        fontWeight: "500",
      },
      text3: {
        color: "#F5F5F5",
        fontSize: 22,
        fontFamily: "roboto",
        fontWeight: "700",
        marginBottom: 40
      }
})