import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import TabsNavigator from './TabsNavigator';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen'
import ReviewsScreen from '../screens/ReviewsScreen'

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
   <Stack.Navigator>
   <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen
    name="MainTabs"
    component={TabsNavigator}
    options={{ headerShown: false }}
   />
   <Stack.Screen
   name="RestaurantDetail"
   component={RestaurantDetailScreen}
   
   />
   <Stack.Screen
   name="Reviews"
   component={ReviewsScreen}
   options={{ title: "Reseñas" }}
   />
  </Stack.Navigator>
  );
}