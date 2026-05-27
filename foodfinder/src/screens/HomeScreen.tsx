import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import {useState} from 'react';
import CustomInput from '../components/CustomInput';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<any>();

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                FoodFinder
            </Text>

            <CustomInput
                placeholder="Buscar restaurantes..."
                value={searchText}
                onChange={setSearchText}
            />

            <Text style={styles.subtitle}>
                Encuentra tus lugares favoritos para comer
            </Text>

            <CustomButton
                title="Ver Restaurantes"
                onPress={() => navigation.navigate("Restaurants")}
            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20

    },

    title: {

        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10

    },

    subtitle: {

        fontSize: 16,
        marginBottom: 25,
        textAlign: "center"

    }

});