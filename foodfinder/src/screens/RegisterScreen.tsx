import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }: any) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const { colors, isDark } = useTheme();
    const { register } = useAuth();

    const handleRegister = async () => {
        setNameError('');
        setEmailError('');
        setPhoneError('');
        setPasswordError('');
        setConfirmPasswordError('');

        let hasError = false;

        if (name.trim() === '') {
            setNameError('El nombre es obligatorio');
            hasError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            setEmailError('El correo es obligatorio');
            hasError = true;
        } else if (!emailRegex.test(email)) {
            setEmailError('Correo no válido');
            hasError = true;
        }

        if (phone.trim() === '') {
            setPhoneError('El teléfono es obligatorio');
            hasError = true;
        } else if (phone.length !== 8) {
            setPhoneError('El teléfono debe tener 8 dígitos');
            hasError = true;
        }

        if (password === '') {
            setPasswordError('La contraseña es obligatoria');
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres');
            hasError = true;
        }

        if (confirmPassword === '') {
            setConfirmPasswordError('Confirma tu contraseña');
            hasError = true;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            hasError = true;
        }

        if (hasError) return;

        const { success, hasSession } = await register(name.trim(), email.trim(), phone.trim(), password);
        if (!success) return;

        if (hasSession) {
            navigation.navigate('MainTabs');
        } else {
            navigation.navigate('Login');
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
                </View>

                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.inputBackground, borderColor: colors.border },
                    ]}
                >
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                        Crear cuenta
                    </Text>
                    <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                        Completa tus datos para empezar
                    </Text>

                    <View style={styles.form}>
                        <CustomInput
                            placeholder="Nombre completo"
                            value={name}
                            onChange={setName}
                            type="text"
                        />
                        {nameError ? <Text style={[styles.error, { color: colors.error }]}>{nameError}</Text> : null}

                        <CustomInput
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={setEmail}
                            type="email"
                        />
                        {emailError ? <Text style={[styles.error, { color: colors.error }]}>{emailError}</Text> : null}

                        <CustomInput
                            placeholder="Teléfono"
                            value={phone}
                            onChange={setPhone}
                            type="number"
                        />
                        {phoneError ? <Text style={[styles.error, { color: colors.error }]}>{phoneError}</Text> : null}

                        <CustomInput
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={setPassword}
                        />
                        {passwordError ? <Text style={[styles.error, { color: colors.error }]}>{passwordError}</Text> : null}

                        <CustomInput
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                        />
                        {confirmPasswordError ? <Text style={[styles.error, { color: colors.error }]}>{confirmPasswordError}</Text> : null}
                    </View>

                    <CustomButton
                        title="Registrarse"
                        onPress={handleRegister}
                    />

                    <View style={styles.loginRow}>
                        <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                            ¿Ya tienes cuenta?
                        </Text>
                        <Text
                            style={[styles.loginLink, { color: colors.primary }]}
                            onPress={() => navigation.navigate('Login')}
                        >
                            {" "}Inicia sesión
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
        marginBottom: 24,
    },
    logoCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    logoEmoji: {
        fontSize: 36,
    },
    brandTitle: {
        fontSize: 24,
        fontWeight: "800",
        letterSpacing: 0.3,
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
    error: {
        fontSize: 12,
        marginTop: -10,
        marginBottom: 12,
        alignSelf: "flex-start",
    },
    loginRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    loginLink: {
        fontSize: 14,
        fontWeight: "700",
    },
});