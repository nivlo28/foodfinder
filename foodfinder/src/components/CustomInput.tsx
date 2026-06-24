import { TextInput, View, Text, StyleSheet, KeyboardTypeOptions, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  label?: string;
  errorMessage?: string;
}

export default function CustomInput({ placeholder, value, onChange, type = 'text', label, errorMessage }: Props) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const keyboardType: KeyboardTypeOptions =
    type === 'email' ? 'email-address' : type === 'number' ? 'phone-pad' : 'default';

  const isPassword = type === 'password';
  const hasError = Boolean(errorMessage);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={[styles.label, { color: colors.text }]}>{label}</Text> : null}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.inputBackground,
            borderColor: hasError ? colors.error : focused ? colors.primary : colors.border,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChange}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={type === 'email' || type === 'password' ? 'none' : 'words'}
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={21} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {hasError ? <Text style={[styles.errorText, { color: colors.error }]}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
  },
  inputContainer: {
    width: '100%',
    minHeight: 52,
    borderWidth: 1.4,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
  },
  eyeButton: {
    paddingLeft: 10,
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
  },
});