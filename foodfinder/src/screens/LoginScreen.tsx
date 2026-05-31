import { View, Text } from "react-native";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      console.log('Debe llenar todos los campos');
      return;
    }

    navigation.navigate('Home');
  };

  return (
    <View>
      <Text>FoodFinder</Text>
      <Text>Iniciar Sesión</Text>

      <CustomInput
        placeholder="Ingresa tu correo"
        value={email}
        onChange={setEmail}
      />

      <CustomInput
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={setPassword}
      />

      <CustomButton
        title="Iniciar Sesión"
        onPress={handleLogin}
      />

      <CustomButton
        title="Crear cuenta"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}