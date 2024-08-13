import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

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
  },
  error: {
    color: 'red',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  }
});

const initialValues = {
  name: '',
  password: '',
};

const validationSchema = yup.object().shape({  
  name: yup    
    .string()    
    .min(2, 'Username must have a length of 2 or greater.') 
    .required('Username is required'),  
    password: yup    
    .string()    
    .min(8, 'Password must have a length of 8 or greater.')    
    .required('Password is required'),
  });

const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      />
      {formik.touched.name && formik.errors.name && (
        <Text style={styles.error}>{formik.errors.name}</Text>
      )}
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable 
        style={styles.submitButton}
        onPress={formik.handleSubmit}>
        <Text style={styles.submitButtonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;