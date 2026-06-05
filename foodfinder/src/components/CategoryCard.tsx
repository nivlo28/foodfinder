import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type CategoryCardProps = {
  title: string;
  icon: string;
};

export default function CategoryCard({
  title,
  icon,
}: CategoryCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.inputBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>

      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
    width: 120,
  },

  icon: {
    fontSize: 30,
    marginRight: 6,
  },

  title: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: 'center',
  },
});