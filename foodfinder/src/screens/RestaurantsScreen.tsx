import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import RestaurantCard from '../components/RestaurantCard';

export default function RestaurantsScreen() {
    const { colors } = useTheme();

    const restaurants = [
      {
                    id:"1",
                    name:"Cima Restaurant",
                    category:"Comida Gourmet",
                    location:"San Pedro Sula, Cortés",
                    price:"L.400 promedio",
                    rating:5,
                    image:require('../../assets/restaurantes/Cima.jpg'),
    },
          {
                    id:"2",
                    name:"Brasa Viva",
                    category:"Comida Mexicana",
                    location:"Tegucigalpa, Francisco Morazán",
                    price:"L.300 promedio",
                    rating:4,
                    image:require('../../assets/restaurantes/brasa viva.jpg'),
          },
{
                    id:"3",
                    name:"Restaurante Tony's",
                    category:"Mariscos",
                    location:"Colonia Trejo, 24 Avenida entre 10 y 11 Calle SO",
                    price:"L.350 promedio",
                    rating:5,
                    image:require('../../assets/restaurantes/TONY.jpg'),
},

{
                    id:"4",
                    name:"Atelier Caramella",
                    category:"Postres",
                    location:"2da Calle, 21 Avenida",
                    price:"L.250 promedio",
                    rating:4,
                    image:require('../../assets/restaurantes/atelier.png'),
},

    {
                    id:"5",
                    name:"Osteria Pastai",
                    category:"Comida Italiana",
                    location:"Plaza Rancho Coco, detrás de Café Costello.",
                    price:"L.400 promedio",
                    rating:5,
                    image:require('../../assets/restaurantes/osteria.png'),
    },
    ];

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
                    rating={restaurant.rating}
                    image={restaurant.image}
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