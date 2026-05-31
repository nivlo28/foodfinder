import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
     <Stack.Screen
      name="Login"
     component={LoginScreen}
      />

      <Stack.Screen
       name="Register"
      component={RegisterScreen}
      />

      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: "Inicio" }}
      />
      <Stack.Screen 
        name="Restaurants" 
        component={RestaurantsScreen} 
        options={{ title: "Restaurantes" }}
      />
    </Stack.Navigator>
  );
}