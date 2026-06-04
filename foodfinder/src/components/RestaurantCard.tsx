import {Text,StyleSheet, View,Image} from "react-native";
import RatingStar from "./RatingStar";
import { useTheme } from "../contexts/ThemeContext";

type RestaurantCardProps = {
    name: string;
    category: string;
    location: string;
    price: string;
    rating: number;
    image:any;
};

export default function RestaurantCard({
    name,
    category,
    location,
    price,
    rating,
    image,
}:RestaurantCardProps){
    const{colors} = useTheme();
    
    return (
        <View style={[styles.card,
        {backgroundColor:colors.inputBackground, borderColor:colors.border}]}>

            <Image source={image} style={styles.image} />

            <Text style={[styles.name, {color:colors.text}]}>
                {name}
            </Text>

            <Text style={[styles.category, {color:colors.textSecondary}]}>
                {category}
            </Text>
            <Text style={[styles.location, {color:colors.textSecondary}]}>
                {location}
            </Text>
            <Text style={[styles.price, {color:colors.primary}]}>
                {price}
            </Text>

            <RatingStar
            rating={rating}
            readonly={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        padding: 15,    
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    category: {
        fontSize: 14,
        marginBottom: 3,
    },
    location: {
        fontSize: 14,
        marginBottom: 3,
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
});