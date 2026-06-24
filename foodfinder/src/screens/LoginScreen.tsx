import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Complete todos los campos');
      return;
    }

    setLoading(true);

    try {
      const success = await login(
        email.trim(),
        password
      );

      if (!success) {
        setError('Correo o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🍔</Text>

          <Text style={[styles.title, { color: colors.text }]}>
            FoodFinder
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary },
            ]}
          >
            Encuentra los restaurantes favoritos de SPS
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.headerBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Iniciar Sesión
          </Text>

          <CustomInput
            label="Correo electrónico"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChange={setEmail}
            type="email"
          />

          <CustomInput
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={setPassword}
            type="password"
          />

          {error ? (
            <Text style={[styles.error, { color: colors.error }]}>
              {error}
            </Text>
          ) : null}

          <CustomButton
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={loading}
          />

          <View style={styles.footer}>
            <Text
              style={[
                styles.footerText,
                { color: colors.textSecondary },
              ]}
            >
              ¿No tienes cuenta?
            </Text>

            <Text
              style={[
                styles.linkText,
                { color: colors.primary },
              ]}
              onPress={() => navigation.navigate('Register')}
            >
              Crear una cuenta
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    fontSize: 60,
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
  },

  card: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 22,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },

  error: {
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  footerText: {
    fontSize: 14,
  },

  linkText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
  },
});