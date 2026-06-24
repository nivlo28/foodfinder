import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

export default function SettingsScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <Text style={[styles.sectionLabel, { color: colors.primary }]}>
        Apariencia
      </Text>

      <View style={[styles.section, { backgroundColor: colors.inputBackground }]}>
        <Text style={[styles.currentValue, { color: colors.textSecondary }]}>
          Tema actual: {isDark ? "Oscuro" : "Claro"}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={colors.onSecondary}
        />
      </View>
      
       <View style={{ height: 100 }} />

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.infoTitle,
            { color: colors.primary },
          ]}
        >
          🍔 FoodFinder
        </Text>

        <Text
          style={[
            styles.infoText,
            { color: colors.text },
          ]}
        >
          Aplicación diseñada para descubrir restaurantes,
          cafeterías y lugares gastronómicos en Honduras.
        </Text>
      </View>

      <View 
        style={[
          styles.infoCard,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.infoTitle,
            { color: colors.primary },
          ]}
        >
          ℹ️ Acerca de FoodFinder
        </Text>

        <Text
          style={[
            styles.infoText,
            { color: colors.text },
          ]}
        >
          FoodFinder permite explorar restaurantes,
          consultar información detallada y guardar
          lugares favoritos para futuras visitas.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.exitButton, { backgroundColor: colors.error }]}
        onPress={() => {
          logout();
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.exitText}>Salir</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
  },
  section: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 14,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  currentValue: {
    fontSize: 13,
    marginBottom: 10,
  },
  exitButton: {
    padding: 16,
    borderRadius: 9,
    alignItems: "center",
    marginBottom: 10,
    marginTop: "auto",
  },
  exitText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginBottom: 12,
    marginTop: 5,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});