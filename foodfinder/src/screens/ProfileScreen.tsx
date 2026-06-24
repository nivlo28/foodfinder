import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useAppSelector } from "../store/hooks";
import { supabase } from "../services/supabaseClient";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Buffer } from "buffer";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user, refreshUser } = useAuth();
  const favorites = useAppSelector(state => state.favorites.items);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [uploading, setUploading] = useState(false);
  const [myReviewsCount, setMyReviewsCount] = useState(0);

  const loadMyReviewsCount = useCallback(async () => {
    if (!user) return;

    const { count, error } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (!error && count !== null) {
      setMyReviewsCount(count);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadMyReviewsCount();
    }, [loadMyReviewsCount])
  );

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Necesitas dar permiso para acceder a tus fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
      base64: true,
    });

    if (result.canceled || !result.assets[0]) return;

    const asset = result.assets[0];
    if (!asset.base64 || !user) return;

    setUploading(true);

    try {
      const fileExt = asset.uri.split(".").pop() || "jpg";
      const filePath = `${user.id}/profile.${fileExt}`;
      const fileBytes = Buffer.from(asset.base64, "base64");

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, fileBytes, {
          contentType: asset.mimeType || "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        Alert.alert("Error al subir la imagen", uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const freshUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: freshUrl },
      });

      if (updateError) {
        Alert.alert("Error al guardar la foto en tu perfil", updateError.message);
        return;
      }

      await refreshUser();
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name, phone: phone },
    });

    if (error) {
      Alert.alert("Error al guardar", error.message);
      return;
    }

    await refreshUser();
    Alert.alert("Listo", "Perfil actualizado");
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>

      <View style={[styles.avatarSection, { backgroundColor: colors.inputBackground }]}>
        <TouchableOpacity onPress={handlePickImage} disabled={uploading}>
          <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
            {uploading ? (
              <ActivityIndicator color="#ffffff" />
            ) : user?.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>
                {(user?.name || "?").charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <Text style={[styles.changePhotoText, { color: colors.primary }]}>
            Cambiar foto
          </Text>
        </TouchableOpacity>

        <Text style={[styles.userName, { color: colors.text }]}>
          {user?.name || "Sin nombre"}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {user?.email || "Sin correo"}
        </Text>
      </View>

      <View style={[styles.statsRow, { backgroundColor: colors.inputBackground }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{favorites.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favoritos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{myReviewsCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Reseñas</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: colors.primary }]}>
          Información básica
        </Text>
        <CustomInput
          placeholder="Nombre completo"
          value={name}
          onChange={setName}
          type="text"
        />
        <CustomInput
          placeholder="Teléfono"
          value={phone}
          onChange={setPhone}
          type="number"
        />
        <CustomButton title="Guardar" onPress={handleSaveProfile} />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: "center",
    padding: 24,
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  avatarImage: {
    width: 80,
    height: 80,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "700",
  },
  changePhotoText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    marginBottom: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});