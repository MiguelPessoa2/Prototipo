import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome6";

export default function TelaCadastro ({navigation}){

  //tela em que o usuário fará cadastro no app

  //variáveis de estado para obter a senha e email do usuário
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const [email, setEmail] = useState("")

  const [senhaValida, setSenhaValida] = useState(false)
  const [emailValido, setEmailValido] = useState(false)

  const handleCadastro = async () => {
    checarSenha();
    
    if(!emailValido){
      Alert.alert("Usuário inválido", "Seu nome de usuário deve conter, no mínimo, 4 caracteres.")
      return
    }

    if(!senhaValida){
      Alert.alert("Senha inválida", "Sua senha deve possuir, no mínimo, 7 caracteres e uma letra Maiúscula.")
      return
    }
    
    if(senha !== confirmSenha){
      Alert.alert('Erro ao confirmar senha', 'As senhas inseridas não são compatíveis')
      return
    }
    
    if(senhaValida && emailValido) {
      try {
        await AsyncStorage.setItem("user_email", email);
        await AsyncStorage.setItem("user_senha", senha);
        await AsyncStorage.setItem("user_cadastrado", "true");
        Alert.alert("sucesso", "cadastro realizado com sucesso.");

      } catch (error) {
        Alert.alert("Erro", "erro ao cadastrar usuário.");
      }

      finally {
        navigation.navigate("Login");
      }

    } else {
      Alert.alert("Erro ao cadastrar", "Houve um erro inesperado ao fazer o cadastro.")
    }
  }
  
  function checarSenha() {
    if (
      senha.length >= 7 &&
      /[A-Z]/.test(senha) 
    ) {
      setSenhaValida(true);
    } else {
      setSenhaValida(false);
    }

    if(email.length >= 4){
      setEmailValido(true)
    } else {
      setEmailValido(false)
    }
    console.log(email, emailValido)
  }

  useEffect(() => {

    checarSenha()

  }, [senha, email])

  return (
    <ImageBackground source={require("../assets/prism.png")} style={styles.background}>
    <View style={styles.container}>
    <Icon name="bolt" size={100} color="#FFB300" style={{paddingBottom: 50}}/>

      <Text style={styles.titulo}>CADASTRO</Text>

      <View style={styles.wrapperInput}>

        <Icon name="user" style={{flex: 1}} size={24} />
        <TextInput
        style={styles.textInput}
        placeholder="Usuário:"
        placeholderTextColor="#BDC3C7"
        keyboardType="default"
        autoCapitalize="none"
        value={email}
        onChangeText={(novoEmail) => setEmail(novoEmail)}>
        </TextInput>
      </View>

      <View style={styles.wrapperInput}>

        <Icon name="lock" style={{flex: 1}} size={24} />
        <TextInput
        style={styles.textInput}
        placeholder="Senha:"
        placeholderTextColor="#BDC3C7"
        keyboardType="default"
        autoCapitalize="none"
        value={senha}
        secureTextEntry
        onChangeText={(novaSenha) => setSenha(novaSenha)}>

        </TextInput>
      </View>

      <View style={styles.wrapperInput}>

        <Icon name="lock" style={{flex: 1}} size={24} />
        <TextInput
        style={styles.textInput}
        placeholder="Confirmar senha:"
        placeholderTextColor="#BDC3C7"
        keyboardType="default"
        autoCapitalize="none"
        value={confirmSenha}
        secureTextEntry
        onChangeText={(novaSenha) => setConfirmSenha(novaSenha)}>

        </TextInput>
      </View>

      <View style={styles.wrapperInput2}>

      {senhaValida?
      <> 
        <Icon name="info" size={20} color="green"/>
        <Text style={{color: "green", fontSize: 15, fontWeight: "600"}}>Senha válida!</Text>
      </>   :
      <>
        <Icon name="info" size={20} color="red" />
        <Text style={{color: "red", fontSize: 15, fontWeight: "600"}}>Insira no mínimo 7 caracteres e uma Maiúscula</Text>

      </>
      }
      </View>

      <TouchableOpacity style={styles.cadastrar} onPress={handleCadastro}>
        <Text style={styles.textoCadastrar}> CADASTRAR</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "transparent",
    gap: 10
  },
  textInput: {
    flex: 10,
    height:40,
    backgroundColor: "transparent",
    paddingHorizontal: 8,
    color: '#ECF0F1',
    fontSize: 16,
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

  wrapperInput2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "80%",
    height: 40,
    marginBottom: 15,
    flexWrap: "wrap"
  },

  cadastrar: {
    backgroundColor: "rgba(76, 175, 80, 0.7)",
    width: "60%",
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "darkgreen",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },

  textoCadastrar: {
    color: "#ECF0F1",
    fontWeight: "bold",
  },

  titulo: {
    color: "#E6E6E6",
    fontSize: 26,
    fontWeight: "600",
    textDecorationLine: "underline" 
  },
        background: {
        flex: 1, // Ocupa todo o espaço disponível na tela
        resizeMode: 'cover', // Ajusta a imagem para cobrir a tela inteira
      },
});
