import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../services/supabaseClient";

export type RatingInfo = {
  averageRating: number;
  recommendedPercent: number;
  totalReviews: number;
};

export type RatingsMap = Record<string, RatingInfo>;

// Calcula, para cada restaurante, el promedio real de estrellas y el
// porcentaje de personas que lo recomiendan, a partir de la tabla
// "reviews" en Supabase. Si un restaurante no tiene reseñas todavía,
// no aparece en el mapa (el componente que lo use debe aplicar un valor
// de respaldo, como el rating base).
export function useRestaurantRatings(fallbackRating?: (id: string) => number) {
  const [ratings, setRatings] = useState<RatingsMap>({});
  const [loading, setLoading] = useState(true);

  const fetchRatings = useCallback(async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("restaurant_id, rating, is_recommended");

    if (error || !data) {
      setLoading(false);
      return;
    }

    const grouped: Record<string, { sum: number; count: number; recommended: number }> = {};

    for (const row of data as { restaurant_id: string; rating: number; is_recommended: boolean }[]) {
      if (!grouped[row.restaurant_id]) {
        grouped[row.restaurant_id] = { sum: 0, count: 0, recommended: 0 };
      }
      grouped[row.restaurant_id].sum += row.rating;
      grouped[row.restaurant_id].count += 1;
      if (row.is_recommended) {
        grouped[row.restaurant_id].recommended += 1;
      }
    }

    const result: RatingsMap = {};
    for (const restaurantId in grouped) {
      const { sum, count, recommended } = grouped[restaurantId];
      result[restaurantId] = {
        averageRating: sum / count,
        recommendedPercent: (recommended / count) * 100,
        totalReviews: count,
      };
    }

    setRatings(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  // Vuelve a calcular cada vez que la pantalla recibe foco, así si el
  // usuario deja una reseña nueva y regresa, los ratings se actualizan.
  useFocusEffect(
    useCallback(() => {
      fetchRatings();
    }, [fetchRatings])
  );

  // Devuelve el rating a mostrar para un restaurante, redondeado al entero
  // más cercano (para que se vea bien en RatingStar): el real si ya tiene
  // reseñas, o el de respaldo (rating base) si todavía no tiene ninguna.
  const getDisplayRating = useCallback(
    (id: string): number => {
      const value = ratings[id]
        ? ratings[id].averageRating
        : fallbackRating
        ? fallbackRating(id)
        : 0;
      return Math.round(value);
    },
    [ratings, fallbackRating]
  );

  // Devuelve el rating exacto (con decimales), útil para mostrar el número
  // junto a las estrellas, ej. "4.3".
  const getExactRating = useCallback(
    (id: string): number => {
      if (ratings[id]) return ratings[id].averageRating;
      return fallbackRating ? fallbackRating(id) : 0;
    },
    [ratings, fallbackRating]
  );

  const getRecommendedPercent = useCallback(
    (id: string): number => {
      return ratings[id]?.recommendedPercent ?? 0;
    },
    [ratings]
  );

  return { ratings, loading, getDisplayRating, getExactRating, getRecommendedPercent, refresh: fetchRatings };
}