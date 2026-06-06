import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <ThemeProvider>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </ThemeProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}