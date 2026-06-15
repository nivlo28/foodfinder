import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import RatingStar from "./RatingStar";

type FeaturedRestaurantCardProps = {
    name:string;
    image:any;
    rating:number;
    onPress?:()=>void;
};

export default function FeaturedRestaurantCard({
    name,
    image,
    rating,
    onPress,
}:FeaturedRestaurantCardProps){
    const {colors}=useTheme();

    return(
        <TouchableOpacity
        style={[
            styles.card,
            {backgroundColor:colors.inputBackground,borderColor:colors.border,
            },
        ]}
        onPress={onPress}
        >
            <Image
            source={image}style={styles.image}
            />
            <Text
            style={[
                    styles.name,
                    { color: colors.text },
                ]}
                numberOfLines={1}
            >
                {name}
            </Text>

            <RatingStar
                rating={rating}
                readonly={true}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 180,
        height:220,
        borderRadius: 12,
        borderWidth: 1,
        padding: 10,
        marginRight: 12,
    },

    image: {
        width: "100%",
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },

    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        marginTop:10,
    },
});