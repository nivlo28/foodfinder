import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import RatingStar from '../components/RatingStar';
import RestaurantCard from '../components/RestaurantCard';
import { Image } from 'react-native';


export default function RestaurantsScreen() {
    const { colors } = useTheme();
    

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>
                Restaurantes
            </Text>
          <RestaurantCard
          name="Cima Restaurant"
          category="Comida Gourmet"
            location="San Pedro Sula, Cortés"
            price="L.400 promedio"
            rating={5}
            image={require('../../assets/Cima.jpg')}
            />

        </View>
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
    },
    image: {
        width: 250,
        height: 180,
        borderRadius: 12,
    },
});