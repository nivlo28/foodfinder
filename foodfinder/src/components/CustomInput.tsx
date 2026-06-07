import { TextInput, View, Text, StyleSheet, KeyboardTypeOptions, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
}

export default function CustomInput({ placeholder, value, onChange, type = 'text' }: Props) {

  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const keyboardType: KeyboardTypeOptions =
    type === 'email' ? 'email-address' :
    type === 'number' ? 'phone-pad' :
    'default';

  const getError = () => {
    if (type === 'email' && value.length > 0 && !value.includes('@')) return 'Correo inválido';
    if (type === 'number' && value.length > 0 && value.length !== 8) return 'Teléfono inválido';
    return null;
  };

  const error = getError();
  const isPassword = type === 'password';

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputContainer, {
        backgroundColor: colors.inputBackground,
        borderColor: error ? colors.error : colors.border,
      }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChange}
          secureTextEntry={isPassword && !showPassword}  
          keyboardType={keyboardType}
        />
        
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <Ionicons 
              name={showPassword ? "eye" : "eye-off"} 
              size={22} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  eyeButton: {
    right: 40,
    padding: 5,
  },
});