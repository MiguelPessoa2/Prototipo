import {View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, TextInput, Alert} from 'react-native';
import React, {useEffect, useState, useContext, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome6";
import { ConsumoContext } from '../context/contextConsumo';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function ConfigAparelho({ navigation, route }) {

    const { contextDispositivos, setContextDispositivos, getContextDispositivos} = useContext(ConsumoContext);
    const [dispositivoSelecionado, setDispositivoSelecionado] = useState();
    const [editOptionsVisible, setEditOptionsVisible] = useState(false);

    const [editNome, setEditNome] = useState("");
    const [editDesc, setEditDesc] = useState("");

    //mudar para route.params depois
    const { id } = route.params

    //função que retorna o objeto do dispositivo selecionado
    const encontrarDispositivo = (array, id) => {
        return array.find((item) => item.id == id);
    };

    //função para ligar e desligar o dispositivo
    const handleSwitch = async() => {

        const resposta = await axios.post(`http://${dispositivoSelecionado.IP}:8081/zeroconf/info`, {
            deviceid: "",
            data: {},    
        }, {
            timeout: 5000,
        });

        let estadoSwitch = resposta.data.data?.switch;

        if (estadoSwitch === "on") {
            await axios.post(`http://${dispositivoSelecionado.IP}:8081/zeroconf/switch`, {
                deviceid: "",
                data: {
                    switch: "off",
                },
            });
        } else {
            await axios.post(`http://${dispositivoSelecionado.IP}:8081/zeroconf/switch`, {
                deviceid: "",
                data: {
                    switch: "on",
                },
            });
        }

        // Atualiza o estado local após a mudança
        setDispositivoSelecionado((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                switch: estadoSwitch
            },
        }));
    };

    //função para deletar o dispositivo
    const handleDelete = async() => {
        try {
            const dispositivosAtualizados = contextDispositivos.filter(d => d.id !== id);
            await AsyncStorage.setItem("user_dispositivos", JSON.stringify(dispositivosAtualizados));
            console.log("dispositivos atualizados: ", JSON.stringify(dispositivosAtualizados))
        } catch (error){
            console.log(error)
        }

    };

    //função para editar os dados do dispositivo
    const handleEdit = async() => {
        try {
            const JSONdispArmazenados = await AsyncStorage.getItem("user_dispositivos");
            const dispArmazenados = JSON.parse(JSONdispArmazenados);

            const dispositivosAtt = dispArmazenados.map(obj => 
                obj.id == id ? {...obj, nome: editNome, desc: editDesc} : obj
            )

            await AsyncStorage.setItem("user_dispositivos", JSON.stringify(dispositivosAtt));
            Alert.alert("Sucesso!", `Nome alterado para ${editNome}, descrição alterada para ${editDesc}.`)
            setEditOptionsVisible(false);
        } catch (error) {
            console.error("erro ao editar dispositivo.");

        } finally {
            setEditNome("");
            setEditDesc("");
        }
    }

    //carregar dispositivo selecionado ao entrar em foco, chama a função encotrarDispositivo
    useFocusEffect(
        useCallback(() => {
            setDispositivoSelecionado(encontrarDispositivo(contextDispositivos, id));
            console.log("aaa", dispositivoSelecionado)
        }, [])
        );

    return(
        <ImageBackground source={require("../assets/prism.png")} style={styles.container}>
            <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            style={styles.scrollView}>

            <View style={{ flexDirection: "row", gap: 20, width: "100%", height: 280, padding: 20}}>
                <View style={styles.infoPanel}>
                {!editOptionsVisible ? (
                    <LinearGradient 
                    colors={['#E0E0E0', '#B3B3B3', '#A0A0A0']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{flex: 1, padding: 12, justifyContent: "space-between"}} >

                        <Text style={styles.title}>{dispositivoSelecionado?.nome}</Text>
                        <Text style={styles.desc}>{dispositivoSelecionado?.desc}</Text>
                        <Text style={styles.desc}>{dispositivoSelecionado?.modelo}</Text>
                        <Text style={styles.desc}>ID: #{dispositivoSelecionado?.id}</Text>
                        
                        <TouchableOpacity style={styles.edit} onPress={() => setEditOptionsVisible(true)}>
                            <Text style={{fontWeight: "600"}}>EDITAR</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                        ) : (
                            <LinearGradient 
                            colors={['#E0E0E0', '#B3B3B3', '#A0A0A0']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            style={{flex: 1, padding: 12}} >
                                <TextInput 
                                style={styles.inputEdit}
                                placeholder="Nome: "
                                placeholderTextColor="black"
                                value={editNome}
                                onChangeText={setEditNome} />

                                <TextInput 
                                style={styles.inputEdit}
                                placeholder='Descrição'
                                placeholderTextColor="black"
                                value={editDesc}
                                onChangeText={setEditDesc} />

                                <View style={{flexDirection: "row", flex: 1, gap: 8}}>
                                    <TouchableOpacity style={styles.btnCancelar} onPress={() => setEditOptionsVisible(false)}>
                                    <Text style={{fontWeight: "bold", fontSize: 10}}>CANCELAR</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnSalvar} onPress={handleEdit}>
                                    <Text style={{fontWeight: "bold", fontSize: 10}}>SALVAR</Text>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>

                            
                        )}

                </View>

                <View style={styles.panelSwitch}>
                    <LinearGradient 
                    colors={['#E0E0E0', '#B3B3B3', '#A0A0A0']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{flex: 1, alignItems: "center", justifyContent: "space-between", padding: 16}} >
                        <Text style={{fontWeight: "bold", fontSize: 18}}>SWITCH</Text>
                        <View style={{alignItems: "center"}}>
                            <Text>ESTADO</Text>
                            <Text>{dispositivoSelecionado?.data?.switch}</Text>
                        </View>
                        <TouchableOpacity style={styles.switch} onPress={handleSwitch}>
                            <Icon name="power-off" size={24} color="#000" />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>

            <View style={{ flexDirection: "row", width: "100%", height: 220, padding: 20, gap: 20 }}>
                
                <View style={[styles.dataContainer, {borderColor: "yellow"}]}>
                <LinearGradient 
                colors={['#F2F2F2', '#E0E0E0', '#CCCCCC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{flex: 1, alignItems: "center", padding: 10, gap: 10}} >
                    <Icon name="bolt" size={40} color="#FFD700"/>
                    <Text style={{fontSize: 12, fontWeight: "bold"}}>CONSUMO</Text>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>0 W</Text>
                </LinearGradient>
                </View>

                <View style={[styles.dataContainer, {borderColor: "#32CD32"}]}>
                <LinearGradient 
                colors={['#F2F2F2', '#E0E0E0', '#CCCCCC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{flex: 1, alignItems: "center", padding: 10, gap: 10}} >
                    <Icon name="plug" size={40} color="green"/>
                    <Text style={{fontSize: 12, fontWeight: "bold"}}>TENSÃO</Text>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>0 V</Text>                
                    </LinearGradient>
                </View>

                <View style={[styles.dataContainer, {borderColor: "red"}]}>
                <LinearGradient 
                colors={['#F2F2F2', '#E0E0E0', '#CCCCCC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{flex: 1, alignItems: "center", padding: 10, gap: 10}} >
                    <Icon name="lightbulb" size={40} color="red"/>
                    <Text style={{fontSize: 12, fontWeight: "bold"}}>CORRENTE</Text>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>0 A</Text>
                </LinearGradient>
                </View>
            </View>
            <View style={{padding: 20, width: "100%", height: 250, justifyContent: "center", alignItems: "center"}}>
                <View style={styles.panelConfig}>
                    <LinearGradient 
                    colors={['#E0E0E0', '#B3B3B3', '#A0A0A0']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
                    </LinearGradient>
                </View>
            </View>

            <TouchableOpacity style={styles.deletar} onPress={handleDelete}>
                <LinearGradient 
                colors={['rgba(150, 0, 0, 0.85)', 'rgba(200, 0, 0, 0.85)', 'rgba(255, 0, 0, 0.85)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{width: "100%", height: "100%", borderRadius: 50, justifyContent: "center", alignItems: "center"}}
                >
                <Text style={{color: "white", fontWeight: "700"}}>DELETAR DISPOSITIVO</Text>
                </LinearGradient>
            </TouchableOpacity>

            </ScrollView>
        </ImageBackground>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        alignItems: "center",
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
        backgroundColor: "transparent",
        borderRadius: 5,
        borderColor: "darkgray",
        borderWidth: 3,
        padding: 3
    },
    panelSwitch: {
        flex: 2,
        backgroundColor: "transparent",
        borderRadius: 5,
        borderColor: "darkgray",
        borderWidth: 3,
        padding: 3
    },
    dataContainer: {
        backgroundColor: "transparent",
        flex: 1,
        borderRadius: 5,
        borderWidth: 3,
        padding: 3,
    },
    panelConfig: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        borderRadius: 5,
        padding: 3,
        borderWidth: 3,
        borderColor: "darkgray"
    },
    scrollView: {
        flexGrow: 1,
        width: '100%',
      },
      scrollViewContent: {
        flexGrow: 1,
      },
      title: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold"
      },
      desc: {
        color: "#000",
        fontSize: 16,

      },
      edit: {
        width: "100%",
        height: 50,
        backgroundColor: "orange",
        borderRadius: 8,
        borderColor: "lightgray",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",

      },
      switch: {
        width: "100%",
        height: 80,
        backgroundColor: "#FF4C4C",
        borderRadius: 8,
        borderColor: "lightgray",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
      },
      inputEdit: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 4,
        borderColor: "gray",
        marginBottom: 6,
        paddingLeft: 10
      },
      deletar: {
        height: 60,
        width: "90%",
        padding: 1,
        borderWidth: 4,
        borderColor: "rgba(120, 0, 0, 0.9)",
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: "5%"
      },
      btnCancelar: {
        flex: 1,
        backgroundColor: "#4CFF4C",
        borderWidth: 4,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center"
      },
      btnSalvar: {
        flex: 1,
        backgroundColor: "#FF8C4C",
        borderWidth: 4,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center"
      }
})
