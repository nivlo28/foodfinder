import { TextInput, StyleSheet } from 'react-native';

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  type?:string;
}

export default function CustomInput({ placeholder, value, onChange, type }: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      secureTextEntry={type === 'password'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
});