import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAppSelector } from '../store/hooks';
import RestaurantCard from '../components/RestaurantCard';

export default function FavoritesScreen() {
    const { colors } = useTheme();
    const favorites = useAppSelector(state => state.favorites.items);

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.primary }]}>
                    Restaurantes Favoritos
                </Text>

                {favorites.length === 0 ? (
                    <Text style={[styles.empty, { color: colors.textSecondary }]}>
                        No tienes restaurantes favoritos aún
                    </Text>
                ) : (
                    favorites.map(item => (
                        <RestaurantCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            category={item.category}
                            location={item.location}
                            price={item.price}
                            rating={item.rating}
                            image={item.image}
                        />
                    ))
                )}
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
    empty: {
        fontSize: 14,
        marginTop: 30,
        textAlign: "center",
    },
});