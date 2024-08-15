import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../../theme';
import useSignIn from '../../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
    gap: 10,
  },
  textInput: {
    padding: 15,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: theme.borderRadius,
  },
  submitButton: {
    padding: 20,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
  },
  submitButtonText: {
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name='username' placeholder='Username' />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
      </View>
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
})

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
      </Formik>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async(values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });  
      navigate('/')
    }catch (e){
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit}/>
};

export default SignIn;