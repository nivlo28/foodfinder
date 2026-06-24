import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import RatingStar from "../components/RatingStar";
import { useTheme } from "../contexts/ThemeContext";
import { supabase } from "../services/supabaseClient";


export default function RestaurantDetailScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const {colors}=useTheme();

    const{
        id,
        name,
        category,
        location,
        price,
        rating,
        image,
        phone,
        schedule,
    } = route.params;

    const [displayRating, setDisplayRating] = useState(rating);
    const [totalReviews, setTotalReviews] = useState(0);

    const loadReviewStats = useCallback(async () => {
        const { data, error } = await supabase
            .from("reviews")
            .select("rating")
            .eq("restaurant_id", id);

        if (error || !data) return;

        if (data.length > 0) {
            const sum = data.reduce((acc, r) => acc + r.rating, 0);
            setDisplayRating(Math.round(sum / data.length));
        } else {
            setDisplayRating(rating);
        }
        setTotalReviews(data.length);
    }, [id]);

    useFocusEffect(
        useCallback(() => {
            loadReviewStats();
        }, [loadReviewStats])
    );

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
            rating={displayRating}
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

        <TouchableOpacity
            style={[styles.reviewsButton, { backgroundColor: colors.buttonPrimaryBg }]}
            onPress={() => navigation.navigate("Reviews", { restaurantId: id, restaurantName: name })}
        >
            <Text style={{ color: colors.buttonPrimaryText, fontWeight: "bold", fontSize: 16 }}>
                ⭐ Ver reseñas ({totalReviews})
            </Text>
        </TouchableOpacity>

     
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

    reviewsButton: {
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
    },
    
});