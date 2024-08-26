import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, TouchableOpacity, Alert, ImageBackground, TouchableHighlight } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';

export default function TelaAparelhos({navigation}) {

    //tela principal do app, aqui é onde o usuário pode monitorar o estado dos aparelhos conectados ao app.

    const [dispositivos, setDispositivos] = useState([]);

    //função que resgata info dos dispositivos para renderização
    const getDispositivos = async () => {
        try {
            const JSONdispositivos = await AsyncStorage.getItem("user_dispositivos");
            let dispositivos = JSONdispositivos !== null? JSON.parse(JSONdispositivos) : [];

            console.log("dispositivos: ", dispositivos)

            //array de promises que contém nome, id e data dos dispositivos
            const promises = dispositivos.map( async (dispositivo) => {

                try {
                    const response = await axios.post(`http://${dispositivo.IP}:8081/zeroconf/info`, {
                        "deviceid": "", 
                        "data": {}
                    }, {
                        timeout: 5000,
                    })
                    return {
                        nome: dispositivo.nome,
                        desc: dispositivo.desc,
                        id: dispositivo.id,
                        data: response.data.data,
                        IP: dispositivo.IP
                    };
    
                } catch (apiError) {
                    console.error(`Erro ao buscar dados do dispositivo ${dispositivo.id}`, apiError);
                    return {
                        nome: dispositivo.nome,
                        desc: dispositivo.desc,
                        id: dispositivo.id,
                        data: null,
                        IP: dispositivo.IP
                    };
                }
            });
    
            //espera todos os dados serem resgatados
            const resultados = await Promise.all(promises);
    
            setDispositivos(resultados)
            console.log("resultados data: ", resultados)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLigar = async (ip, estadoSwitch, index) => {

        let setEstadoSwitch;

        if(estadoSwitch === "on"){
            setEstadoSwitch = "off"
        } else if(estadoSwitch === "off"){
            setEstadoSwitch = "on"
        } else {
            setEstadoSwitch = "desconhecido"
        }

        try {
            await axios.post(`http://${ip}:8081/zeroconf/switch`, {
             
                deviceid: "", 
                data: {
                    switch: setEstadoSwitch
                } 
        }, {
            timeout: 5000
        }) 

        const dispositivosAtt = [...dispositivos];
        dispositivosAtt[Number(index) - 1].data.switch = setEstadoSwitch;
        getDispositivos();
        
    } catch (error) {
            Alert.alert("erro", "nao foi possivel ligar o aparelho.")
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

    //chama a função getDispositivos
    useFocusEffect(
    useCallback(() => {
        getDispositivos();
        console.log("tela em foco, data resgatada")
        return() => {
            setDispositivos([])
            console.log("tela fora de foco, dispositivos limpos")
        }
    }, [])
    )

    return (
        <ImageBackground style={styles.background} source={require("../assets/prism.png")}>
        <View style={styles.container}>

        <TouchableOpacity style={styles.atualizar} onPress={() => navigation.navigate("Adicionar")}>
            <Text style={{color: "#F5F5F5", fontWeight: "600"}}>ADICIONAR APARELHO</Text>
        </TouchableOpacity>
        <FlatList
        data={dispositivos}
        renderItem={({item}) => {
            return (
                <View style={styles.containerAparelho}>
                    <View style={styles.wrapperEsquerdo}>
                        <Text style={styles.tituloAparelho}>{item.nome}</Text>
                        <View style={{flexDirection: "row", padding: 1, gap: 6}}>
                            <TouchableHighlight onPress={() => handleLigar(item.IP, item.data.switch, item.id)} style={styles.botaoLigar}>
                                <Icon name="power-off" size={18}/>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.botaoConfig} onPress={() => navigation.navigate("TelaConfig", {item})}>
                                <Icon name="gear" size={18}/>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={styles.wrapperDireito}>
                        <View style={{flexDirection: "column", padding: 6, justifyContent: "center", height: "100%", gap: 9}}>
                            <Text style={{color: "lightgray", fontWeight: "600", fontSize: 16}}>Estado: {item.data.switch}</Text>
                            <Text style={{color: "lightgray", fontWeight: "600", fontSize: 16}}>Potência:</Text>
                            <Text style={{color: "lightgray", fontWeight: "600", fontSize: 16}}>Tensão:</Text>
                            <Text style={{color: "lightgray", fontWeight: "600", fontSize: 16}}>Corrente:</Text>
                        </View>
                    </View>
                </View>
            )
        }}
        keyExtractor={item => item.id.toString()}>

        </FlatList>

        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
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
        backgroundColor: "rgba(169, 169, 169, 0.4)",
        height: 140,
        width: "95%",
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: "row",
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
        flex: 4,
        backgroundColor: "rgba(245, 245, 220, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        borderRightWidth: 1

    },
    wrapperDireito: {
        flex: 5,
        backgroundColor: "transparent",
    },
    tituloAparelho: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
        paddingBottom: 10
    },
    botaoLigar: {
        flex: 1,
        height: 40,
        backgroundColor: "#3CB371",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    atualizar: {
        width: "95%",
        height: 50,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green"
    },
    background: {
        flex: 1,
        resizeMode: "cover"
    },
    botaoConfig: {
        flex: 1,
        height: 40,
        backgroundColor: "#4F4F4F",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
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