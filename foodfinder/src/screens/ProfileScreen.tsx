import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function ProfileScreen() {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>
                Usuario
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
},
    title: {
        fontSize: 20,
        fontWeight: "bold",
    }
});