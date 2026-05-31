import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function RegisterScreen(){ 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {

    if(
        name === '' ||
        email === '' ||
        phone === '' ||
        password === '' ||
        confirmPassword === ''
    ){
        console.log('Todos los campos son obligatorios');
        return;
    }

    if(password !== confirmPassword){
        console.log('Las contraseñas no coinciden');
        return;
    }

    console.log('Usuario registrado');

}

    return (
        <View>
            <Text>Crear cuenta</Text>
            <CustomInput
                placeholder="Nombre completo"
                value={name}
                onChange={setName}
            />

            <CustomInput
                placeholder="Correo electrónico"
                value={email}
                onChange={setEmail}
            />

            <CustomInput
                placeholder="Teléfono"
                value={phone}
                onChange={setPhone}
            />

            <CustomInput
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={setPassword}
            />

            <CustomInput
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={setConfirmPassword}
            />

            <CustomButton
              title="Registrarse"
              onPress={handleRegister}
            />
        </View>
    );
}
