import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaCadastro ({navigation}){

  //tela em que o usuário fará cadastro no app

  //variáveis de estado para obter a senha e email do usuário
  const [senha, setSenha] = useState("")
  const [email, setEmail] = useState("")

  const [senhaValida, setSenhaValida] = useState(false)
  const [emailValido, setEmailValido] = useState(true)

  const handleCadastro = async () => {
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
      Alert.alert("Senha ou email inválidos")
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
  }

  useEffect(() => {

    checarSenha()

  }, [senha])

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>CADASTRO</Text>

      <View style={styles.wrapperInput}>

        <TextInput
        style={styles.textInput}
        placeholder="E-mail:"
        placeholderTextColor="#BDC3C7"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(novoEmail) => setEmail(novoEmail)}>
        </TextInput>
      </View>

      <View style={styles.wrapperInput}>

        <TextInput
        style={styles.textInput}
        placeholder="Senha:"
        placeholderTextColor="#BDC3C7"
        keyboardType="default"
        autoCapitalize="none"
        value={senha}
        onChangeText={(novaSenha) => setSenha(novaSenha)}>

        </TextInput>
      </View>

      <View style={styles.wrapperInput2}>

      {senhaValida?
      <Text style={{color: "green", fontSize: 15, fontWeight: "600"}}>Senha válida!</Text> :
      <Text style={{color: "red", fontSize: 15, fontWeight: "600"}}>Insira no mínimo 7 caracteres e uma Maiúscula</Text>
      }
      </View>

      <TouchableOpacity style={styles.cadastrar} onPress={handleCadastro}>
        <Text style={styles.textoCadastrar}> CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#2C3E50",
    gap: 10
  },
  textInput: {
    flex: 10,
    height:40,
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

  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "80%",
    height: 40
  },

  wrapperInput2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "80%",
    height: 20,
    marginBottom: 15,
    flexWrap: "wrap"
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

  titulo: {
    color: "#E6E6E6",
    fontSize: 26,
    fontWeight: "600",
    textDecorationLine: "underline" 
  }
});
