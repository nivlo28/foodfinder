import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import RatingStar from "./RatingStar";
import { useTheme } from "../contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFavorite } from "../store/slices/favoritesSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type RestaurantCardProps = {
    id: string;
    name: string;
    category: string;
    location: string;
    price: string;
    rating: number;
    image: any;
};

export default function RestaurantCard({
    id,
    name,
    category,
    location,
    price,
    rating,
    image,
}: RestaurantCardProps) {
    const { colors } = useTheme();
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(state => state.favorites.items);

    // Verifica si ya está en favoritos
    const isFavorite = favorites.some(item => item.id === id);

    const handleToggle = () => {
        dispatch(toggleFavorite({ id, name, category, location, price, rating, image }));
    };


    return (
        <TouchableOpacity
        style={{width:"100%"}}
        onPress={()=> navigation.navigate("RestaurantDetail",{
            id,
            name,
            category,
            location,
            price,
            rating,
            image,
        })}
        >
        <View style={[styles.card, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>

            <Image source={image} style={styles.image} />

            {/* Fila de nombre y corazón */}
            <View style={styles.row}>
                <Text style={[styles.name, { color: colors.text }]}>
                    {name}
                </Text>
                <TouchableOpacity onPress={handleToggle}>
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={24}
                        color={isFavorite ? colors.error : colors.textSecondary}
                    />
                </TouchableOpacity>
            </View>

            <Text style={[styles.category, { color: colors.textSecondary }]}>
                {category}
            </Text>
            <Text style={[styles.location, { color: colors.textSecondary }]}>
                {location}
            </Text>
            <Text style={[styles.price, { color: colors.primary }]}>
                {price}
            </Text>

            <RatingStar rating={rating} readonly={true} />

        </View>
        </TouchableOpacity>

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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
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