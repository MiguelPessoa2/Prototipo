import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Header = ({navigation, titulo}) => {
    return (
    <LinearGradient
    colors={['#424242', '#636060', '#424242']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}>
        <View
        style={styles.header}>

          <View style={styles.wrapper}>
            <TouchableOpacity style={{flexDirection:"row", gap: 5}} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={18} color="#F5F5F5" />
              <Text style={styles.titulo3}>VOLTAR</Text>
            </TouchableOpacity>

          </View>
          <View style={{flex: 1, alignItems: "center"}}>
            <Text style={styles.titulo2}>{titulo}</Text>
          </View>
          <View style={{flex: 1, alignItems: "flex-end"}}>
            <Text style={styles.titulo}>ESmartHome</Text>
          </View>


        </View>
    </LinearGradient>
    )
}

export default Header

const styles = StyleSheet.create({
    titulo: {
      color: "#FFB300",
      fontWeight: "bold",
      fontSize: 16,
      textShadowColor: '#000', 
      textShadowOffset: { width: -1, height: 1 }, 
      textShadowRadius: 10,
    },
    titulo2: {
      color: "#F5F5F5",
      fontWeight: "bold",
      fontSize: 20,
      textShadowColor: '#000', 
      textShadowOffset: { width: -1, height: 1 }, 
      textShadowRadius: 10,
    },
    titulo3: {
      color: "#F5F5F5",
      fontWeight: "bold",
      fontSize: 14,
      textShadowColor: '#000', 
      textShadowOffset: { width: -1, height: 1 }, 
      textShadowRadius: 10,
      paddingTop: 1
    },
    header: {
      width: "100%",
      alignItems: "center",
      flexDirection: "row",
      borderBottomColor: "black",
      borderBottomWidth: 5,
      padding: 20
    },

    btnLabel: {
      color: "#F5F5F5",
      fontSize: 16,
      fontWeight: "bold"
    },
    wrapper: {
      flex: 1,
        flexDirection: "row",
        gap: 10,
        marginVertical: 10,
        textShadowColor: '#000', 
        textShadowOffset: { width: -1, height: 1 }, 
        textShadowRadius: 10,
    },

  });
  