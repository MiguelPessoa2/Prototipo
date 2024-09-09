import {View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfigAparelho({ navigation, route }) {

    useEffect(() => {
        navigation.setParams({titulo: "DETALHES"})
    }, [navigation])

    //dados passados da flatlist na tela anterior
    const { info } = route.params;

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

    return(
        <View style={styles.container}>
            <View style={styles.panel}>
                <Text style={styles.legenda1}>Nome: <Text style={styles.legenda2}>{info.nome}</Text></Text>
                <Text style={styles.legenda1}>Descrição: <Text style={styles.legenda2}>{info.desc}</Text></Text>
                <Text style={styles.legenda1}>ID: <Text style={styles.legenda2}>#{info.id}</Text></Text>
                <Text style={styles.legenda1}>Estado: <Text style={styles.legenda2}></Text></Text>
                <Text style={styles.legenda1}>Tensão: <Text style={styles.legenda2}></Text></Text>
                <Text style={styles.legenda1}>Corrente: <Text style={styles.legenda2}></Text></Text>
                <Text style={styles.legenda1}>Consumo: <Text style={styles.legenda2}></Text></Text>
                <Text style={styles.legenda1}>Endereço IP: <Text style={styles.legenda2}>{info.IP}</Text></Text>

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