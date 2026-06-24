import { useCallback, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RatingStar from "../components/RatingStar";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../services/supabaseClient";

type Review = {
  id: string;
  restaurant_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  is_recommended: boolean;
  comment: string;
  created_at: string;
};

export default function ReviewsScreen() {
  const route = useRoute<any>();
  const { restaurantId, restaurantName } = route.params;
  const { colors } = useTheme();
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [isRecommended, setIsRecommended] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (error) {
      Alert.alert("Error", "No se pudieron cargar las reseñas.");
    } else {
      setReviews(data as Review[]);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchReviews();
    }, [restaurantId])
  );

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Falta calificación", "Selecciona cuántas estrellas le das.");
      return;
    }
    if (isRecommended === null) {
      Alert.alert("Falta recomendación", "Indica si recomiendas o no este restaurante.");
      return;
    }
    if (comment.trim().length === 0) {
      Alert.alert("Falta comentario", "Escribe un breve comentario.");
      return;
    }
    if (!user) {
      Alert.alert("Inicia sesión", "Debes iniciar sesión para dejar una reseña.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      restaurant_id: restaurantId,
      user_id: user.id,
      user_name: user.name || user.email,
      rating,
      is_recommended: isRecommended,
      comment: comment.trim(),
    });
    setSubmitting(false);

    if (error) {
      Alert.alert("Error", "No se pudo publicar la reseña.");
      return;
    }

    setRating(0);
    setIsRecommended(null);
    setComment("");
    fetchReviews();
  };

  const handleDelete = (reviewId: string) => {
    Alert.alert(
      "Eliminar reseña",
      "¿Seguro que quieres eliminar esta reseña? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setDeletingId(reviewId);
            const { error } = await supabase
              .from("reviews")
              .delete()
              .eq("id", reviewId);
            setDeletingId(null);

            if (error) {
              Alert.alert("Error", "No se pudo eliminar la reseña.");
              return;
            }
            fetchReviews();
          },
        },
      ]
    );
  };

  const renderReview = ({ item }: { item: Review }) => (
    <View
      style={[
        styles.reviewCard,
        { backgroundColor: colors.inputBackground, borderColor: colors.border },
      ]}
    >
      <View style={styles.reviewHeader}>
        <Text style={[styles.reviewUser, { color: colors.text }]}>
          {item.user_name}
        </Text>
        <View style={styles.headerRight}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: item.is_recommended ? "#2e7d32" : colors.error,
              },
            ]}
          >
            <Text style={styles.badgeText}>
              {item.is_recommended ? "👍 Recomendado" : "👎 No recomendado"}
            </Text>
          </View>

          {user?.id === item.user_id && (
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              disabled={deletingId === item.id}
              style={styles.deleteButton}
            >
              {deletingId === item.id ? (
                <ActivityIndicator size="small" color={colors.error} />
              ) : (
                <Ionicons name="trash-outline" size={20} color={colors.error} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      <RatingStar rating={item.rating} readonly size={18} />

      <Text style={[styles.reviewComment, { color: colors.textSecondary }]}>
        {item.comment}
      </Text>

      <Text style={[styles.reviewDate, { color: colors.textSecondary }]}>
        {new Date(item.created_at).toLocaleDateString("es-HN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </Text>
    </View>
  );

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={renderReview}
      ListHeaderComponent={
        <>
          <Text style={[styles.title, { color: colors.primary }]}>
            Reseñas de {restaurantName}
          </Text>

          <View
            style={[
              styles.formCard,
              { backgroundColor: colors.inputBackground, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.formLabel, { color: colors.text }]}>
              Deja tu reseña
            </Text>

            <Text style={[styles.formSubLabel, { color: colors.textSecondary }]}>
              ¿Cuántas estrellas le das?
            </Text>
            <RatingStar rating={rating} onRate={setRating} size={30} />

            <Text style={[styles.formSubLabel, { color: colors.textSecondary }]}>
              ¿Recomiendas este restaurante?
            </Text>
            <View style={styles.recommendRow}>
              <TouchableOpacity
                style={[
                  styles.recommendButton,
                  {
                    backgroundColor:
                      isRecommended === true ? "#2e7d32" : colors.background,
                    borderColor: "#2e7d32",
                  },
                ]}
                onPress={() => setIsRecommended(true)}
              >
                <Text
                  style={{
                    color: isRecommended === true ? "#ffffff" : "#2e7d32",
                    fontWeight: "bold",
                  }}
                >
                  👍 Recomendado
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.recommendButton,
                  {
                    backgroundColor:
                      isRecommended === false ? colors.error : colors.background,
                    borderColor: colors.error,
                  },
                ]}
                onPress={() => setIsRecommended(false)}
              >
                <Text
                  style={{
                    color: isRecommended === false ? "#ffffff" : colors.error,
                    fontWeight: "bold",
                  }}
                >
                  👎 No recomendado
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.formSubLabel, { color: colors.textSecondary }]}>
              Comentario
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Cuéntanos tu experiencia..."
              placeholderTextColor={colors.textSecondary}
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: colors.buttonPrimaryBg, opacity: submitting ? 0.6 : 1 },
              ]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color={colors.buttonPrimaryText} />
              ) : (
                <Text style={{ color: colors.buttonPrimaryText, fontWeight: "bold" }}>
                  Publicar reseña
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={[styles.listTitle, { color: colors.text }]}>
            {loading
              ? "Cargando reseñas..."
              : reviews.length === 0
              ? "Aún no hay reseñas. ¡Sé el primero!"
              : `${reviews.length} reseña(s)`}
          </Text>
        </>
      }
      ListFooterComponent={loading ? <ActivityIndicator color={colors.primary} /> : null}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  formCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formSubLabel: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 8,
  },
  recommendRow: {
    flexDirection: "row",
    gap: 10,
  },
  recommendButton: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    textAlignVertical: "top",
    minHeight: 70,
  },
  submitButton: {
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  reviewCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 4,
  },
  reviewComment: {
    fontSize: 14,
    marginTop: 8,
  },
  reviewDate: {
    fontSize: 11,
    marginTop: 8,
    textAlign: "right",
  },
});