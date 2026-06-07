import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const { colors } = useTheme();

  const handleLogin = () => {
    if (email === '' || password === '') {
      console.log('Debe llenar todos los campos');
      return;
    }

    login(email);
    navigation.navigate('MainTabs');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <Text style={[styles.title, { color: colors.primary }]}>
        🍔 FoodFinder
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Iniciar Sesión
      </Text>

      <CustomInput
        placeholder="Ingresa tu correo"
        value={email}
        onChange={setEmail}
        type="email"
      />

      <CustomInput
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={setPassword}
      />
<View style={styles.buttonsContainer}>
      <CustomButton
        title="Iniciar Sesión"
        onPress={handleLogin}
      />

      <CustomButton
        title="Crear cuenta"
        onPress={() => navigation.navigate('Register')}
      />

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 32,
    marginTop: -10,
  },
  buttonsContainer: {
    width: '50%',
    gap: 12,
    marginTop: 10,
  },
});