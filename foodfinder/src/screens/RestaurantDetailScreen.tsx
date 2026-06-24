import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import RatingStar from "../components/RatingStar";
import { useTheme } from "../contexts/ThemeContext";


export default function RestaurantDetailScreen() {
    const route = useRoute<any>();
    const {colors}=useTheme();

    const{
        name,
        category,
        location,
        price,
        rating,
        image,
        phone,
        schedule,
    } = route.params;
   return (
     <ScrollView
        style={{backgroundColor:colors.background}}
            contentContainerStyle={styles.container}
    >

        <Image
            source={image}
            style={styles.image}
        />

        <Text style={[styles.title,{color:colors.text}
        ]}
        >
            {name}
        </Text>

        <RatingStar
            rating={rating}
            readonly={true}
        />

        <Text style={[styles.info,{color:colors.textSecondary}]}>
            🍽️ {category}
        </Text>

        <Text style={[styles.info,{color:colors.textSecondary}]}>
            📍 {location}
        </Text>

        <Text style={[styles.price,{color:colors.primary}]}>
            💰 {price}
        </Text>

        <Text style={[styles.info,{color:colors.textSecondary}]}>
            🕒 {schedule}
        </Text>

        <Text style={[styles.info,{color:colors.textSecondary}]}>
            📞 {phone}
        </Text>

     
    </ScrollView>
);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    image:{
        width:"100%",
        height:220,
        borderRadius:12,
        marginBottom: 20,
    },

    info: {
    fontSize: 16,
    marginTop: 10,
    },

    price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    },

     infoCard: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 15,
        marginTop: 15,
    },
    
});