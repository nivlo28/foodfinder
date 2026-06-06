import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState } from "react";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const [name, setName] = useState("Christopher Diaz");
  const [phone, setPhone] = useState("");

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>

      {/* Avatar section — igual que la inge */}
      <View style={[styles.avatarSection, { backgroundColor: colors.inputBackground }]}>
        <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
          <Text style={styles.avatarText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.userName, { color: colors.text }]}>
          {name}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {user}
        </Text>
      </View>

      {/* Stats — igual al diseño que mandaste */}
      <View style={[styles.statsRow, { backgroundColor: colors.inputBackground }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>4</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Reservas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>0</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Reseñas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>0</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Fotos</Text>
        </View>
      </View>

      {/* Información básica */}
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
        <CustomButton title="Guardar" onPress={() => {}} />
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
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "700",
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
    marginBottom: 12,
  },
});