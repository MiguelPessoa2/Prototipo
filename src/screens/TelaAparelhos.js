import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function TelaAparelhos({navigation}) {

    //tela principal do app, aqui é onde o usuário pode monitorar o estado dos aparelhos conectados ao app.
    const [dispositivos, setDispositivos] = useState([]);
    const getDispositivos = async () => {
        try {
            const JSONdispositivos = await AsyncStorage.getItem("user_dispositivos");
            let dispositivos = JSONdispositivos !== null? JSON.parse(JSONdispositivos) : null;

            setDispositivos(dispositivos);

        } catch (error) {
            Alert.alert("erro", "erro ao resgatar dispositivos");
        }
    }

    const getColorPorEstado = estado => {
        if(estado == "ON"){
            return "#2ecc71"
        }

        if(estado == "OFF"){
            return "#e74c3c"
        }
    }

useFocusEffect(
    useCallback(() => {
        getDispositivos();
        console.log("tela em foco")

        return() => {
            setDispositivos([])
            console.log("tela fora de foco")
        }
    }, [])
)

    return (
        <View style={styles.container}>

        <TouchableOpacity style={styles.atualizar} onPress={() => navigation.navigate("Adicionar")}>
            <Text>ADICIONAR APARELHO</Text>
        </TouchableOpacity>
        <FlatList
        data={dispositivos}
        renderItem={({item}) => {
            return (
                <TouchableOpacity style={styles.containerAparelho} onPress={() => navigation.navigate("TelaConfig", { item})}>
                    <View style={styles.wrapperEsquerdo}>
                        <Text style={styles.containerTitulo}>{item.nome}</Text>
                        <Text style={styles.containerLegendas}>{item.desc}
                            <Text style={styles.containerLegendas}></Text>
                            </Text>
                        <Text style={styles.containerLegendas}> ID: {item.id}</Text>
                    </View>

                    <View style={styles.wrapperDireito}>
                        <Text style={styles.containerLegendas}>CONSUMO: </Text>
                        <Text style={styles.containerLegendas}>CORRENTE: </Text>
                        <Text style={styles.containerLegendas}>TENSÃO: </Text>
                    </View>
                </TouchableOpacity>
            )
        }}
        keyExtractor={item => item.id.toString()}>

        </FlatList>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C3E50",
        paddingLeft: "5%",
        paddingTop: 5
    },
    estilolista: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red"
    },
    containerAparelho: {
        backgroundColor: "#4A6572",
        height: 140,
        width: "95%",
        padding: 6,
        marginVertical: 5,
        borderRadius: 10,
        gap: 8,
        flexDirection: "row",
        shadowColor: "gray", // Cor da sombra
        shadowOffset: { width: 5, height: 5 }, // Offset da sombra
        shadowOpacity: 0.7, // Opacidade da sombra
        shadowRadius: 3, // Radius da sombra

    },

    containerTitulo: {
        width: "100%",
        color: "#FF6F61",
        fontWeight: "bold",
        fontSize: 24,
        textDecorationLine: "underline",
    },
    containerLegendas: {
        fontSize: 16,
        color: "#BDC3C7",
        fontWeight: "600"
    },
    wrapperEsquerdo: {
        flex: 3,
        padding: 8,
        paddingLeft: 12,
        justifyContent: "space-evenly",
        backgroundColor: "rgba(189, 195, 199, 0)",
        borderRightWidth: 1.2,
        borderRightColor: "black"
    },
    wrapperDireito: {
        flex: 5,
        padding: 8,
        paddingLeft: 14,
        justifyContent: "space-evenly",
        backgroundColor: "rgba(189, 195, 199, 0.2)",
        borderRadius: 16
    },
    atualizar: {
        width: "50%",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green"
    }
})

    //exemplo de dados do dispositivo:

    /*const DISPOSITIVOS = [
        {
            id: '1',
            details: {
                nome: "Sonoff 1",
                desc: "desc 1",
                IP: "192.168.0.1",
                estado: "ON",
                consumoEnergia: "150W",
                corrente: "0.12A",
                tensao: "110V",
            }
        },
        {
            id: '2',
            details: {
                nome: "Sonoff 2",
                desc: "desc 2",
                IP: "192.168.0.2",
                estado: "OFF",
                consumoEnergia: "30W",
                corrente: "1.4A",
                tensao: "110V",
            }
        },
        {
            id: '3',
            details: {
                nome: "Sonoff 3",
                desc: "desc 3",
                IP: "192.168.0.3",
                estado: "ON",
                consumoEnergia: "85W",
                corrente: "0.68A",
                tensao: "220V",

            }
        },
    ]
        */