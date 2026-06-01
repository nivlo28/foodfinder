import { TextInput, View, Text, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
}

export default function CustomInput({ placeholder, value, onChange, type = 'text' }: Props) {

  const { colors } = useTheme();

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

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, {
          backgroundColor: colors.inputBackground,
          borderColor: error ? colors.error : colors.border,
          color: colors.text,
        }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChange}
        secureTextEntry={type === 'password'}
        keyboardType={keyboardType}
      />
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
});