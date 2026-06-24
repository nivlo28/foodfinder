import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';
import { useRestaurantRatings } from '../hooks/useRestaurantRatings';

export default function RestaurantsScreen() {
    const { colors } = useTheme();
    const { getDisplayRating } = useRestaurantRatings(
        (id) => restaurants.find((r) => r.id === id)?.rating ?? 0
    );

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.primary }]}>
                    Restaurantes
                </Text>

                {restaurants.map((restaurant) => (
                    <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    category={restaurant.category}
                    location={restaurant.location}
                    price={restaurant.price}
                    rating={getDisplayRating(restaurant.id)}
                    image={restaurant.image}
                    phone={restaurant.phone}
                    schedule={restaurant.schedule}
                />
                ))}
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