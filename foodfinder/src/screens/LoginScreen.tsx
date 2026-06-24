import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const { colors, isDark } = useTheme();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      console.log('Debe llenar todos los campos');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigation.navigate('MainTabs');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brandSection}>
          <View
            style={[
              styles.logoCircle,
              { backgroundColor: isDark ? colors.inputBackground : "#FFF1E0" },
            ]}
          >
            <Text style={styles.logoEmoji}>🍔</Text>
          </View>

          <Text style={[styles.brandTitle, { color: colors.primary }]}>
            FoodFinder
          </Text>
          <Text style={[styles.brandTagline, { color: colors.textSecondary }]}>
            Descubre los mejores restaurantes
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Bienvenido de nuevo
          </Text>
          <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
            Inicia sesión para continuar
          </Text>

          <View style={styles.form}>
            <CustomInput
              placeholder="Correo electrónico"
              value={email}
              onChange={setEmail}
              type="email"
            />

            <CustomInput
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={setPassword}
            />
          </View>

          <CustomButton
            title="Iniciar Sesión"
            onPress={handleLogin}
          />

          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>o</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.registerRow}>
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
              ¿No tienes cuenta?
            </Text>
            <Text
              style={[styles.registerLink, { color: colors.primary }]}
              onPress={() => navigation.navigate('Register')}
            >
              {" "}Regístrate
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  brandSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 44,
  },
  brandTitle: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  brandTagline: {
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  form: {
    marginBottom: 4,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "700",
  },
});