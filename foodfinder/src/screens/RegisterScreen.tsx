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

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError('Complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const success = await register(
        name,
        email.trim(),
        phone,
        password
      );

      if (success) {
        navigation.navigate('Login');
      } else {
        setError('No se pudo crear la cuenta');
      }
    } catch (err) {
      setError('Ocurrió un error al registrarse');
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
            Crear Cuenta
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary },
            ]}
          >
            Únete a FoodFinder
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
            Registro
          </Text>

          <CustomInput
            label="Nombre completo"
            placeholder="Pedro Diaz"
            value={name}
            onChange={setName}
          />

          <CustomInput
            label="Correo electrónico"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChange={setEmail}
            type="email"
          />

          <CustomInput
            label="Teléfono"
            placeholder="9999-9999"
            value={phone}
            onChange={setPhone}
            type="number"
          />

          <CustomInput
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={setPassword}
            type="password"
          />

          <CustomInput
            label="Confirmar contraseña"
            placeholder="Repita su contraseña"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type="password"
          />

          {error ? (
            <Text style={[styles.error, { color: colors.error }]}>
              {error}
            </Text>
          ) : null}

          <CustomButton
            title="Crear Cuenta"
            onPress={handleRegister}
            loading={loading}
          />

          <View style={styles.footer}>
            <Text
              style={[
                styles.footerText,
                { color: colors.textSecondary },
              ]}
            >
              ¿Ya tienes cuenta?
            </Text>

            <Text
              style={[
                styles.linkText,
                { color: colors.primary },
              ]}
              onPress={() => navigation.goBack()}
            >
              Iniciar sesión
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