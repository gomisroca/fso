import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../../theme';
import useSignIn from '../../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    padding: 20,
    gap: 10,
  },
  textInput: {
    padding: 15,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    padding: 20,
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Pressable onPress={onSubmit}>
        <View style={styles.submitButton}>
          <Text style={styles.submitButtonText} fontWeight="bold">
            Sign in
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({username, password});
      useNavigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;