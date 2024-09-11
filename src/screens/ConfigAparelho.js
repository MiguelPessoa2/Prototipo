import {View, Text, StyleSheet, TouchableOpacity, Alert, Modal, ScrollView, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

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

    const handleEdit = () => {
        console.log("teste")
    }

    return(
        <ImageBackground source={require("../assets/prism.png")} style={styles.container}>
            {!info ? (
            <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            style={styles.scrollView}>
            <View style={{ flexDirection: "row", gap: 10, width: "100%", height: "40%", padding: 10, backgroundColor: "green", marginBottom: 10 }}>
                <View style={styles.infoPanel}>

                </View>
                <View style={styles.panelSwitch}>

                </View>
            </View>

            <View style={{ flexDirection: "row", width: "100%", height: "30%", justifyContent: "space-around", alignItems: "center", backgroundColor: "orange", marginBottom: 10 }}>
                <View style={styles.dataContainer}>

                </View>
                <View style={styles.dataContainer}>

                </View>
                <View style={styles.dataContainer}>

                </View>
            </View>
            <View style={{padding: 10, width: "100%", height: "40%", backgroundColor: "red", justifyContent: "center", alignItems: "center"}}>
                <View style={styles.panelConfig}>

                </View>
            </View>

            </ScrollView>
            ) : (
                <>
                <Text style={styles.text}>Parece que você chegou aqui por acidente!</Text>
                <Text style={styles.text}>Pressione o botão abaixo para voltar.</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Aparelhos", {titulo: "HOME"})} style={styles.btnVoltar}>
                <LinearGradient 
                    colors={['rgba(0, 100, 0, 0.85)', 'rgba(0, 150, 0, 0.85)', 'rgba(0, 200, 0, 0.85)']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{width: "100%", height: "100%", borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "black", fontWeight: "700"}}>VOLTAR</Text>
                    </LinearGradient>
                </TouchableOpacity>
                </>
            )}


        </ImageBackground>


    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
   },
    panel1: {
        width: "95%",
        height: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 15,
        bordercolor: "black",
        borderWidth: 1.5,
        gap: 20,
        marginTop: 10
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
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#fff",
        fontWeight: "semibold",
        fontSize: 20
    },
    btnVoltar: {
        width: "20%",
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "darkgreen",
        marginTop: 20
    },
    editar: {
        width: "95%",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    infoPanel: {
        flex: 3,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    panelSwitch: {
        flex: 2,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    dataContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        width: 200,
        height: 200,
        borderRadius: 100
    },
    panelConfig: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",

    },
    scrollView: {
        flex: 1,
        width: '100%',
      },
      scrollViewContent: {
        height: "100%",
        paddingVertical: 10, // Add padding if needed
      },
})

/*
            <TouchableOpacity style={styles.deletar} onPress={handleDelete}>
                <LinearGradient 
                colors={['rgba(255, 165, 0, 0.85)', 'rgba(255, 140, 0, 0.85)', 'rgba(255, 69, 0, 0.85)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{width: "100%", height: "100%", borderRadius: 50, justifyContent: "center", alignItems: "center"}}
                >
                <Text style={{color: "black", fontWeight: "700"}}>DELETAR DISPOSITIVO</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editar} onPress={handleEdit}>
                <LinearGradient 
                    colors={['rgba(0, 100, 0, 0.85)', 'rgba(0, 150, 0, 0.85)', 'rgba(0, 200, 0, 0.85)']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{width: "100%", height: "100%", borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "black", fontWeight: "700"}}>EDITAR INFORMAÇÕES</Text>
                </LinearGradient>
            </TouchableOpacity>
        
*/