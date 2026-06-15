import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import CategoryCard from '../components/CategoryCard';
import { ScrollView } from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import FeaturedRestaurantCard from '../components/FeaturedRestaurantCard';

export default function HomeScreen() {

    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<any>();
    const { colors } = useTheme();

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
            <FeaturedRestaurantCard
              name="Cima Restaurant"
              rating={5}
              image={require('../../assets/restaurantes/Cima.jpg')}
             />

             <FeaturedRestaurantCard
               name="Brasa Viva"
               rating={4}
               image={require('../../assets/restaurantes/brasa viva.jpg')}
             />

            <FeaturedRestaurantCard
                name="Osteria Pastai"
               rating={5}
               image={require('../../assets/restaurantes/osteria.png')}
             />
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
            <FeaturedRestaurantCard
             name="Osteria Pastai"
             rating={5}
             image={require('../../assets/restaurantes/osteria.png')}
        />

           <FeaturedRestaurantCard
             name="Restaurante Tony's"
             rating={5}
             image={require('../../assets/restaurantes/TONY.jpg')}
          />

          <FeaturedRestaurantCard
              name="Cima Restaurant"
              rating={5}
              image={require('../../assets/restaurantes/Cima.jpg')}
          />
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