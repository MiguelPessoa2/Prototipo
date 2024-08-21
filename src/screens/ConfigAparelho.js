import {View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfigAparelho({ navigation, route }) {

    //tela de detalhes dos aparelhos conectados, aqui é possível ligar e desligar aparelhos,
    //além de poder alterar informações customizáveis e deletar o dispositivo.

    //dados passados da flatlist na tela anterior
    const { item } = route.params;

    const handleDelete = async() => {
        try {
            const JSONdispositivos = await AsyncStorage.getItem("user_dispositivos");
            const dispositivos = JSON.parse(JSONdispositivos);

            let dispositivosAtt = dispositivos.filter(elemento => elemento.id != item.id)
            AsyncStorage.setItem("user_dispositivos", JSON.stringify(dispositivosAtt));

            Alert.alert("Sucesso!", "dispositivo deletado com sucesso!")
            navigation.navigate("Aparelhos")

        } catch (error) {
            Alert.alert("erro", "erro ao deletar dispositivo")
        }
    }

    const handleUpdate = () => {
        setModalVisible(true)
        console.log(item)
    }

    return(
        <View style={styles.container}>
            <View style={styles.panel}>
                <Text style={styles.legenda1}>Nome: <Text style={styles.legenda2}>{item.nome}</Text></Text>
                <Text style={styles.legenda1}>Descrição: <Text style={styles.legenda2}>{item.desc}</Text></Text>
                <Text style={styles.legenda1}>ID: <Text style={styles.legenda2}>#{item.id}</Text></Text>
                <Text style={styles.legenda1}>Estado: <Text style={styles.legenda2}></Text></Text>
                <Text style={styles.legenda1}>Tensão: <Text style={styles.legenda2}></Text></Text>
                <Text style={styles.legenda1}>Corrente: <Text style={styles.legenda2}></Text></Text>
                <Text style={styles.legenda1}>Consumo: <Text style={styles.legenda2}></Text></Text>
                <Text style={styles.legenda1}>Endereço IP: <Text style={styles.legenda2}>{item.IP}</Text></Text>

                <TouchableOpacity style={styles.deletar} onPress={handleDelete}>
                    <Text style={{fontWeight: "600", color:"#000000"}}>DELETAR DISPOSITIVO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deletar}>
                    <Text style={{fontWeight: "600", color:"#000000"}}>EDITAR INFORMAÇÕES</Text>
                </TouchableOpacity>
            </View>

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2C3E50",
   },
    panel: {
        width: "90%",
        height: "95%",
        backgroundColor: "#E0E0E0",
        padding: 15,
        borderRadius: 15,
        bordercolor: "black",
        borderWidth: 1.5,
        gap: 20
    },
    legenda1: {
        fontSize: 22,
        fontWeight: "bold",
    },
    legenda2: {
        fontSize: 18,
        fontWeight: "600"
    },
    deletar: {
        width: "95%",
        height: 50,
        backgroundColor: "#FFA500",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})