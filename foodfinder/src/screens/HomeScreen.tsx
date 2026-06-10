import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import CategoryCard from '../components/CategoryCard';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {

    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<any>();
    const { colors } = useTheme();

    return (

        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <Text style={[styles.title, { color: colors.primary }]}>
                FoodFinder
            </Text>

            <CustomInput
                placeholder="Buscar restaurantes..."
                value={searchText}
                onChange={setSearchText}
            />

            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Encuentra tus lugares favoritos para comer
            </Text>

           <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{flexGrow: 0}}
            contentContainerStyle={{ paddingHorizontal: 10, flexDirection: "row" }}
            >
                <CategoryCard title="Gourmet" icon="🍽️" />
                <CategoryCard title="Italiano" icon="🍝" />
                <CategoryCard title="Mexicano" icon="🌮" />
                <CategoryCard title="Postres" icon="🍰" />
            </ScrollView>

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
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 25,
        textAlign: "center",
    }
});