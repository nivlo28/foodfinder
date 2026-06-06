import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import RestaurantCard from '../components/RestaurantCard';

export default function RestaurantsScreen() {
    const { colors } = useTheme();

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.primary }]}>
                    Restaurantes
                </Text>

                <RestaurantCard
                    id="1"
                    name="Cima Restaurant"
                    category="Comida Gourmet"
                    location="San Pedro Sula, Cortés"
                    price="L.400 promedio"
                    rating={5}
                    image={require('../../assets/Cima.jpg')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
});