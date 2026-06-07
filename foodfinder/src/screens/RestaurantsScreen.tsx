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
                    image={require('../../assets/restaurantes/Cima.jpg')}
                />
          
                <RestaurantCard
                    id="2"
                    name="Brasa Viva"
                    category="Comida Mexicana"
                    location="Tegucigalpa, Francisco Morazán"
                    price="L.300 promedio"
                    rating={4}
                    image={require('../../assets/restaurantes/brasa viva.jpg')}
                />

                <RestaurantCard
                    id="3"
                    name="Restaurante Tony's"
                    category="Mariscos"
                    location="Colonia Trejo, 24 Avenida entre 10 y 11 Calle SO"
                    price="L.350 promedio"
                    rating={5}
                    image={require('../../assets/restaurantes/TONY.jpg')}
                />

                    <RestaurantCard
                    id="4"
                    name="Atelier Caramella"
                    category="Postres"
                    location="2da Calle, 21 Avenida"
                    price="L.250 promedio"
                    rating={4}
                    image={require('../../assets/restaurantes/atelier.png')}
                />

                <RestaurantCard
                    id="5"
                    name="Osteria Pastai"
                    category="Comida Italiana"
                    location="Plaza Rancho Coco, detrás de Café Costello."
                    price="L.400 promedio"
                    rating={5}
                    image={require('../../assets/restaurantes/osteria.png')}
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