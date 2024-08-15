import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import FormikTextInput from '../SignIn/FormikTextInput';
import useSignUp from '../../hooks/useSignUp';
import theme from '../../theme';

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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name='username' placeholder='Username' />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name='confirmationPassword' placeholder='Confirm Password' secureTextEntry={true} />
      </View>
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const initialValues = {
  username: '',
  password: '',
  confirmationPassword: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be less than 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(30, 'Password must be less than 30 characters'),
  confirmationPassword: yup
  .string()
  .required('Confirmation is required')
  .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
      </Formik>
    </View>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async(values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });  
      navigate('/')
    }catch (e){
      console.log(e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit}/>
};

export default SignUp;