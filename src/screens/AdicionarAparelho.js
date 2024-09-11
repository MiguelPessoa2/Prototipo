import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert, ImageBackground, ActivityIndicator, KeyboardAvoidingView, Platform} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';

export default function AdicionarAparelho({navigation}) {

    useEffect(() => {
        navigation.setParams({titulo: "ADICIONAR"})
    }, [navigation])

    const [nome, setNome] = useState("");
    const [desc, setDesc] = useState("");
    const [enderecoIP, setEnderecoIP] = useState("");
    const [modeloEscolhido, setModeloEscolhido] = useState("");
    const [firmwareEscolhido, setFirmwareEscolhido] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [firmwares, setFirmwares] = useState([]);

    const modelosDispositivos = [
        {label: "Sonoff Mini R2", value: "sonoff-mini-r2", firmware: [{label: "Original", value: "original"}, {label: "Tasmota", value: "tasmota"}]},
        {label: "Sonoff Mini R3", value: "sonoff-mini-r3", firmware: [{label: "Original", value: "original"}, {label: "Tasmota", value: "tasmota"}]},
        {label: "Sonoff Basic R2", value: "sonoff-basic-r2", firmware: [{label: "Tasmota", value: "tasmota"}]},
        {label: "Sonoff Basic R3", value: "sonoff-basic-r3", firmware: [{label: "Tasmota", value: "tasmota"}]},
        {label: "Sonoff Pow R2", value: "sonoff-pow-r2", firmware: [{label: "Tasmota", value: "tasmota"}]},
        {label: "Sonoff Pow R3 (Origin)", value: "sonoff-pow-r3", firmware: [{label: "Tasmota", value: "tasmota"}]},
        {label: "Sonoff D1 Dimmer", value: "sonoff-d1-dimmer", firmware: [{label: "Original", value: "original"}, {label: "Tasmota", value: "tasmota"}]}
    ]

    const handleAddDispositivo = async () => {
        
        if(!nome || !enderecoIP || !modeloEscolhido){
            Alert.alert("Erro", "Verifique se todos os campos foram preenchidos corretamente.");
            return;
        }

        setIsLoading(true);

        try {
        
        const resposta = await axios.post(`http://${enderecoIP}:8081/zeroconf/info`, {
            deviceid: "",
            data: {},    
        }, {
            timeout: 5000,
        })
        
        console.log("Resposta: ", resposta.data)

        const JSONdispositivos = await AsyncStorage.getItem("user_dispositivos");
        let listaDispositivos = JSONdispositivos !== null? JSON.parse(JSONdispositivos) : [];

        // Encontrar o maior ID na lista de dispositivos e incrementar
         const maxId = listaDispositivos.reduce((max, dispositivo) => Math.max(max, dispositivo.id), 0);
        const novoId = maxId + 1;
            

         const dispositivo = {

            nome: nome,
            desc: desc,
            modelo: modeloEscolhido,
            IP: enderecoIP,
            id: novoId,
            data: {}
        }

        listaDispositivos.push(dispositivo);
         await AsyncStorage.setItem("user_dispositivos", JSON.stringify(listaDispositivos));
            
        setNome("");
        setDesc("");
        setEnderecoIP("");
        setModeloEscolhido("");
        setFirmwareEscolhido("");
            
        Alert.alert("Sucesso!", "dispositivo cadastrado com sucesso!")
        navigation.navigate("Aparelhos", {titulo: "HOME"});

        } catch (error) {
            Alert.alert("Erro", "Não foi possivel salvar o aparelho. Verifique se o endereço IP está correto e tente novamente.");
            navigation.navigate("TelaConfig", {titulo: "DETALHES"})
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const dispEscolhido = modelosDispositivos.find(item => item.value === modeloEscolhido)

        if(dispEscolhido){
            const firmwaresDisponiveis = dispEscolhido.firmware;
            setFirmwares(firmwaresDisponiveis);
        }else{
            setFirmwares([])
        }

    }, [modeloEscolhido])

    return(
        <ImageBackground source={require('../assets/prism.png')} style={styles.background}>
            <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.select({ ios: 60, android: 80, web: null })}>
            
            <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Preencha os campos abaixo para adicionar um novo aparelho</Text>

                <View style={styles.wrapperItem}>
                    <Text style={styles.label}>Nome do Aparelho:</Text>
                    <TextInput 
                    style={{height: 50}} 
                    placeholder='ex: Lâmpada do quarto' 
                    placeholderTextColor="#2E2E2E"
                    value={nome}
                    onChangeText={setNome}/>
                </View>

                <View style={styles.wrapperItem}>
                    <Text style={styles.label}>Descrição  (opcional)</Text>
                    <TextInput 
                    style={{height: 50}} 
                    placeholder='ex: Desligar após 23:00' 
                    placeholderTextColor="#2E2E2E"
                    value={desc}
                    onChangeText={setDesc}/>
                </View>

                <View style={styles.wrapperItem}>
                    <Text style={styles.label}>Modelo do Dispositivo:</Text>

                    <RNPickerSelect
                    onValueChange={(val) => setModeloEscolhido(val)}
                    items={modelosDispositivos}
                    darkTheme={true}
                    placeholder={{
                        label: "Escolha um Dispositivo",
                        value: "",
                    }} />
                </View>
                
                <View style={styles.wrapperItem}>
                    <Text style={styles.label}>Endereço IP:</Text>
                    <TextInput 
                    style={{height: 50}} 
                    placeholder='Insira o IP do dispositivo' 
                    placeholderTextColor="#2E2E2E"
                    value={enderecoIP}
                    onChangeText={setEnderecoIP}
                    keyboardType='default'/>
                </View>


                <TouchableOpacity style={styles.botaoEstilo} onPress={handleAddDispositivo}>
                    <LinearGradient 
                    colors={['rgba(0, 100, 0, 0.85)', 'rgba(0, 150, 0, 0.85)', 'rgba(0, 200, 0, 0.85)']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{width: "100%", height: "100%", borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "black", fontWeight: "700"}}>SALVAR</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "rgba(105, 105, 105, 0.4)",
        margin: 20,
        borderRadius: 5,
        justifyContent: "center",
        paddingLeft: 20,
        paddingTop: 20,
        gap: 18
        },

    botaoEstilo: {
        backgroundColor: "rgba(255, 165, 0, 0.7)",
        width: "94%",
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "darkgreen",
        marginTop: 20
    },

    background: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    wrapperItem: {
        backgroundColor: "rgba(169, 169, 169, 0.4)",
        justifyContent: "space-evenly",
        width: "94%",
        height: 80,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "darkgray",
        paddingLeft: 8
    },
    label: {
        fontWeight: "bold",
        fontSize: 13,
        color: "#FF8C00",
        marginBottom: 6
    },
    titulo: {
        color: "#F5F5F5",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 25,
        marginRight: 30,
        textAlign: 'center'
    }
})

/*       
<View style={styles.wrapperItem}>
<Text style={styles.label}>Firmware:</Text>

<RNPickerSelect
onValueChange={(val) => setFirmwareEscolhido(val)}
items={firmwares}
darkTheme={true}
placeholder={{
    label: "Escolha um Firmware",
    value: null
}} />
</View>
*/