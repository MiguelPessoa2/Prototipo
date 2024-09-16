import { Text, View, StyleSheet, TouchableOpacity, Alert, ImageBackground, TouchableHighlight, StatusBar, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { ConsumoContext } from '../context/contextConsumo';

export default function TelaAparelhos({navigation}) {
    const { contextDispositivos, setContextDispositivos, getContextDispositivos} = useContext(ConsumoContext);

    useEffect(() => {
        navigation.setParams({titulo: "HOME"})
    }, [navigation])

    const handleLigar = async (ip, estadoSwitch, index) => {
        console.log(ip, estadoSwitch, index)
        let setEstadoSwitch;

        if(estadoSwitch === "on"){
            setEstadoSwitch = "off"
        } else if(estadoSwitch === "off"){
            setEstadoSwitch = "on"
        } else {
            setEstadoSwitch = "desconhecido"
        }

        if(setEstadoSwitch != "desconhecido"){
            try {
                await axios.post(`http://${ip}:8081/zeroconf/switch`, {
                 
                    deviceid: "", 
                    data: {
                        switch: setEstadoSwitch
                    } 
                }, {
                    timeout: 5000
                }) 
    
            const dispositivosAtt = [...contextDispositivos];
            dispositivosAtt[Number(index) - 1].data.switch = setEstadoSwitch;
            getContextDispositivos();
            
            } catch (error) {
                Alert.alert("erro", "nao foi possivel ligar o aparelho.")
            }
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
        getContextDispositivos();
        console.log("tela em foco, data resgatada")

    }, [])
    );

    return (
        <ImageBackground style={styles.background} source={require("../assets/prism.png")}>
        <StatusBar hidden={true} />
        <View style={styles.container}>

        <TouchableOpacity style={styles.botaoEstilo} onPress={() => navigation.navigate("Adicionar")}>
                    <LinearGradient 
                    colors={['rgba(0, 100, 0, 0.85)', 'rgba(0, 150, 0, 0.85)', 'rgba(0, 200, 0, 0.85)']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "black", fontWeight: "700"}}>ADICIONAR APARELHO</Text>
                    </LinearGradient>
                </TouchableOpacity>
        {!contextDispositivos ? (
            <View style={{justifyContent: "center", alignItems: "center", flex: 1, marginBottom: "80%"}}> 
            
            <Text style={styles.loadingText}>Conectando dispositivos...</Text>
            <ActivityIndicator  style={{marginTop: 10}}/>
            </View>
        ) : (
            <FlatList
            data={contextDispositivos}
            renderItem={({item}) => {
                return (
                    <View style={styles.containerAparelho}>
                        <View style={styles.wrapperEsquerdo}>
                            <Text style={styles.tituloAparelho}>{item.nome}</Text>
                            <View style={{flexDirection: "row", padding: 1, gap: 6}}>
                                <TouchableHighlight onPress={() => handleLigar(item.IP, item.data?.switch, item.id)} style={styles.botaoLigar}>
                                    <Icon name="power-off" size={18}/>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.botaoConfig} onPress={() => navigation.navigate("TelaConfig", {
                                    id: item.id
                                })}>
                                    <Icon name="gear" size={18}/>
                                </TouchableHighlight>
                            </View>
                        </View>
    
                        <View style={styles.wrapperDireito}>
                            {item.data? (
                            <View style={{flexDirection: "column", padding: 6, justifyContent: "center", height: "100%", gap: 9}}>
                            <Text style={{color: "lightgray", fontWeight: "600", fontSize: 16}}>Estado: {item.data.switch}</Text>
                            <Text style={{color: "lightgray", fontWeight: "600", fontSize: 16}}>Potência:</Text>
                            <Text style={{color: "lightgray", fontWeight: "600", fontSize: 16}}>Tensão:</Text>
                            <Text style={{color: "lightgray", fontWeight: "600", fontSize: 16}}>Corrente:</Text>
                        </View>
                            ) : (
                                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={styles.noResponse}>SEM RESPOSTA</Text>
                                </View>
                            )}

                        </View>
                    </View>
                )
            }}
            keyExtractor={item => item.id.toString()}>
    
            </FlatList>
        )}


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
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    botaoConfig: {
        flex: 1,
        height: 40,
        backgroundColor: "#4F4F4F",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        marginHorizontal: 20,
    },
    botaoEstilo: {
        backgroundColor: "rgba(255, 165, 0, 0.7)",
        width: "94%",
        height: 60,
        borderWidth: 2,
        borderColor: "darkgreen",
        marginVertical: 10
    },
    noResponse: {
        color: "black",
        fontSize: 26,
        textAlign: "center",
        fontWeight: "bold"
    }
})