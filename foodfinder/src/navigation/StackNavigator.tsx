import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantsScreen from '../screens/RestaurantsScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
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