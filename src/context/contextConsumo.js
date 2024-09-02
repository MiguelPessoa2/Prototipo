import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const ConsumoContext = createContext();

export const ProviderConsumo = ({children}) => {

    const [dispositivos, setDispositivos] = useState([])

    const getDispositivos = async () => {
        try {
            const JSONdispositivos = await AsyncStorage.getItem("user_dispositivos");
            let dispositivosArmazenados = JSONdispositivos !== null? JSON.parse(JSONdispositivos) : [];

            console.log("dispositivos: ", dispositivosArmazenados)

            //array de promises que contém nome, id e data dos dispositivos
            const promises = dispositivosArmazenados.map( async (dispositivo) => {

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
    };
    /*
    useEffect(() => {

        getDispositivos();

        const intervalId = setInterval(getDispositivos, 5000);

        return () => clearInterval(intervalId);

    }, [])
    */

    return(
        <ConsumoContext.Provider value={{ dispositivos, getDispositivos }}>
            {children}
        </ConsumoContext.Provider>
    )
}