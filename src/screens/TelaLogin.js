import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Checkbox from 'expo-checkbox';
import { useFocusEffect } from '@react-navigation/native';

export default function TelaLogin({navigation}) {

    //tela onde o usuário fará login com email e senha.

    //dados resgatados do AsyncStorage de email e senha
    const [userEmail, setUserEmail] = useState("");
    const [userSenha, setUserSenha] = useState("");

    //dados inseridos pelo o usuário para fazer login
    const [senhaInput, setSenhaInput] = useState("")
    const [emailInput, setEmailInput] = useState("")

    const [isChecked, setChecked] = useState(false)

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
        navigation.navigate("NavPrincipal")

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
    <View style={styles.container}>
        <Icon name="bolt" size={100} color="#FFB300" style={{paddingBottom: 50}}/>
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

        <View style={{flexDirection: "row", padding: 10, width: "90%", justifyContent: "center", alignItems: "center"}}>
          <Checkbox 
          value={isChecked} 
          onValueChange={setChecked} 
          style={{borderRadius: 10, borderColor: "darkorange"}}/>
          <Text style={{color: "gray", fontSize: 18, paddingLeft: 16}}>Deseja lembrar sua senha?</Text>
        </View>


            <TouchableOpacity style={styles.cadastrar} onPress={handleLogin}>
                <Text style={{color: "black", fontWeight: "700"}}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.criar} onPress={() => navigation.navigate("Cadastro")}>
                <Text style={{color: "black", fontWeight: "700"}}>CRIAR CONTA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deletar} onPress={async () => await AsyncStorage.clear()}>
                <Text style={{color: "black", fontWeight: "700"}}>DELETAR DADOS</Text>
            </TouchableOpacity>

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
        width: "60%",
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
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
      criar: {
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
      wrapperCheckBox: {
        flexDirection: "row",
        width: "89%",
        height: "fot-content",
        padding: 8
      },
      deletar: {
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        width: "60%",
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "rgb(139, 0, 0)",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
      }
})