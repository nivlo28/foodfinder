import { View, Text, StyleSheet, ScrollView, UIManager, Platform, LayoutAnimation } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useEffect, useMemo, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import CategoryCard from '../components/CategoryCard';
import FeaturedRestaurantCard from '../components/FeaturedRestaurantCard';
import { restaurants } from '../data/restaurants';
import { useRestaurantRatings } from '../hooks/useRestaurantRatings';

// Habilita las animaciones de layout en Android (en iOS ya vienen activas)
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {

    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<any>();
    const { colors } = useTheme();

    const { getDisplayRating, getRecommendedPercent, ratings } = useRestaurantRatings(
        (id) => restaurants.find((r) => r.id === id)?.rating ?? 0
    );

    // Cada vez que cambian los ratings (nuevas reseñas), anima el
    // reordenamiento de las tarjetas en vez de saltar de golpe.
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [ratings]);

    // Destacados: los primeros 3 de la lista, siempre en el mismo orden.
    const featured = restaurants.slice(0, 3);

    // Mejor calificados: se reordenan según el % de personas que
    // recomiendan el restaurante (de mayor a menor). Si dos restaurantes
    // tienen el mismo % de recomendados, se desempata con el rating real.
    const topRated = useMemo(() => {
        return [...restaurants]
            .sort((a, b) => {
                const recA = getRecommendedPercent(a.id);
                const recB = getRecommendedPercent(b.id);
                if (recB !== recA) return recB - recA;
                return getDisplayRating(b.id) - getDisplayRating(a.id);
            })
            .slice(0, 5);
    }, [ratings]);

    return (
      <ScrollView
        style={{backgroundColor: colors.background}}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        > 
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
                <CategoryCard title="Gourmet" icon="🍽️"  />
                <CategoryCard title="Italiano" icon="🍝" />
                <CategoryCard title="Mexicano" icon="🌮" />
                <CategoryCard title="Postres" icon="🍰" />
                <CategoryCard title="Cafés" icon="☕" />
            </ScrollView>

            <Text
            style={[
                styles.sectionTitle,{color:colors.text}
            ]}
            >
                Restaurantes Destacados
            </Text>

            <ScrollView
             horizontal
             showsHorizontalScrollIndicator={false}
>
            {featured.map((restaurant) => (
                <FeaturedRestaurantCard
                    key={restaurant.id}
                    name={restaurant.name}
                    rating={getDisplayRating(restaurant.id)}
                    image={restaurant.image}
                    onPress={() => navigation.navigate("RestaurantDetail", restaurant)}
                />
            ))}
            </ScrollView>

            <Text
               style={[
               styles.sectionTitle,
               { color: colors.text }
    ]}
        >
              Mejor Calificados 
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal:5}}
        >
            {topRated.map((restaurant) => (
                <FeaturedRestaurantCard
                    key={restaurant.id}
                    name={restaurant.name}
                    rating={getDisplayRating(restaurant.id)}
                    image={restaurant.image}
                    onPress={() => navigation.navigate("RestaurantDetail", restaurant)}
                />
            ))}
         </ScrollView>
 
        <View style={{marginTop:20}}>
            <CustomButton
                title="Ver Restaurantes"
                onPress={() => navigation.navigate("Restaurants")}
            />
        </View>
        </ScrollView>

    );

}

const styles = StyleSheet.create({
    container: {
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
    },
    sectionTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginTop: 20,
        marginBottom:15,
    },
});