import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { DANGER, GRAY, PRIMARY, WHITE, DGRAY } from "../color";

export const ButtonTypes2 = {
  PRIMARY: "PRIMARY",
  DANGER: "DANGER",
  DGRAY: "DGRAY",
};

const Button2 = ({
  title,
  onPress,
  disabled,
  isLoading,
  buttonType,
  buttonStyle,
}) => {
  const colors = { PRIMARY, DANGER, DGRAY };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        buttonStyle,
        { backgroundColor: colors[buttonType].DEFAULT },
        pressed && { backgroundColor: colors[buttonType].DARK },
        disabled && {
          backgroundColor: colors[buttonType].LIGHT,
          opacity: 0.6,
        },
      ]}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={GRAY.DEFAULT} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
};

Button2.defaultProps = {
  buttonType: ButtonTypes2.PRIMARY,
};

Button2.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes2)),
  buttonStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY.DEFAULT,
  },
  title: {
    color: WHITE,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 30,
  },
});

export default Button2;
