import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function ConfigAparelho({ route }) {

    //tela de detalhes dos aparelhos conectados, aqui é possível ligar e desligar aparelhos,
    //além de poder alterar informações customizáveis e deletar o dispositivo.

    //dados passados da flatlist na tela anterior
    let { item } = route.params;

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
    }
})