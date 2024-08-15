import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    color: theme.colors.textPrimary,
    borderRadius: theme.borderRadius,
    borderColor: theme.colors.muted,
  },
  error: {
    borderColor: theme.colors.error,
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.textInput,
    error && styles.error,
    style,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;