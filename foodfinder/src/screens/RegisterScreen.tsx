import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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

    const { colors } = useTheme();
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
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={styles.container}>

                <Text style={[styles.title, { color: colors.primary }]}>
                    Crear cuenta
                </Text>

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

                <CustomButton
                    title="Registrarse"
                    onPress={handleRegister}
                />

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 24,
        marginTop: 20,
    },
    error: {
        fontSize: 12,
        marginBottom: 8,
        alignSelf: "flex-start",
    },
});