import {View, Text, StyleSheet} from 'react-native'

export default function TelaConfig() {
    return(
        <View style={styles.container}>
            <Text>Configurações</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C3E50",
        justifyContent: "center",
        alignItems: "center"
    }
})