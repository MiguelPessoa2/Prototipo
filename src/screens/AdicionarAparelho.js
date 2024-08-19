import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function AdicionarAparelho({navigation}) {

    const [nome, setNome] = useState("");
    const [desc, setDesc] = useState("");
    const [enderecoIP, setEnderecoIP] = useState("");

    const handleAddDispositivo = async () => {
        
        try {
            
            const JSONdispositivos = await AsyncStorage.getItem("user_dispositivos");
            let listaDispositivos = JSONdispositivos !== null? JSON.parse(JSONdispositivos) : [];

            // Encontrar o maior ID na lista de dispositivos e incrementar
            const maxId = listaDispositivos.reduce((max, dispositivo) => Math.max(max, dispositivo.id), 0);
            const novoId = maxId + 1;
            

            const dispositivo = {

                nome: nome,
                desc: desc,
                IP: enderecoIP,
                id: novoId
            }

            listaDispositivos.push(dispositivo);
            AsyncStorage.setItem("user_dispositivos", JSON.stringify(listaDispositivos));
            
            setNome("");
            setDesc("");
            setEnderecoIP("");
            
            console.log(listaDispositivos);

            Alert.alert("Sucesso!", "dispositivo cadastrado com sucesso!")

        } catch (error) {
            Alert.alert("Erro", "Não foi possivel resgatar so dispositivos");

        }

        navigation.navigate("Aparelhos");
    }

    return(

        <View style={styles.container}>
            <View style={styles.panel}>
                
                <Text style={styles.panelTitulo}>Preencha os campos abaixo para cadastrar um aparelho:</Text>

                <Text style={styles.labelInput}>Nome: </Text>
                <TextInput 
                style={styles.inputEstilo} 
                placeholder='Nome do aparelho: '
                placeholderTextColor="#000000"
                value={nome}
                onChangeText={(novoNome) => setNome(novoNome)}
                >

                </TextInput>

                <Text style={styles.labelInput}>Descrição: </Text>
                <TextInput 
                style={styles.inputEstilo} 
                placeholder='Descrição do aparelho: '
                placeholderTextColor="#000000"
                value={desc}
                onChangeText={(novoDesc) => setDesc(novoDesc)}
                >

                </TextInput>

                <Text style={styles.labelInput}>Endereço IP: </Text>
                <TextInput 
                style={styles.inputEstilo} 
                placeholder='Endereço IP do aparelho: '
                placeholderTextColor="#000000"
                value={enderecoIP}
                onChangeText={(novoIP) => setEnderecoIP(novoIP)}
                >

                </TextInput>
                <TouchableOpacity style={styles.botaoEstilo} onPress={handleAddDispositivo}><Text style={styles.labelbotao}>ADICIONAR APARELHO</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C3E50",
        justifyContent: "center",
        alignItems: "center"
    },
    panel: {
        width: "90%",
        height: "95%",
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        paddingLeft: "5%",
        borderRadius: 15,
        bordercolor: "black",
        borderWidth: 1.5,
        gap: 10
    },
    labelInput: {
        fontSize: 22,
        color: "#333333",
        fontWeight: "600"
    },
    inputEstilo: {
        backgroundColor: "#C0C0C0",
        width: "90%",
        height: 50,
        borderRadius: 8,
        paddingLeft: 10
    },
    botaoEstilo: {
        backgroundColor: "#FFA500",
        width: "90%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 15
    },
    labelbotao: {
        fontSize: 16,
        color: "#333333",
        fontWeight: "500"
    },
    panelTitulo: {
        fontSize: 22,
        color: "#8B4513",
        fontWeight: "bold",
        paddingBottom: 25
    }
})