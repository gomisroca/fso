import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../../theme';
import FormikTextInput from '../SignIn/FormikTextInput';
import useCreateReview from '../../hooks/useCreateReview';
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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name='owner' placeholder='Repository Owner Name' />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name='name' placeholder='Repository Name'/>
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name='text' placeholder='Your Review'/>
      </View>
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </Pressable>
    </View>
  )
}

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Repository Owner is required'),
  name: yup
    .string()
    .required('Repository Name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be greater than or equal to 0')
    .max(100, 'Rating must be less than or equal to 100'),
  text: yup
    .string()
})

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit}/>}
      </Formik>
    </View>
  )
}

const Review = () => {
  const [review] = useCreateReview();
  const navigate = useNavigate()

  const onSubmit = async(values) => {
    const { owner, name, rating, text } = values;
    try {
      const data = await review({ owner, name, rating, text })
      if(data){
        navigate(`/repository/${data.repositoryId}`)
      }
    }catch (e){
      console.log( e)
    }
  }

  return <ReviewContainer onSubmit={onSubmit}/>
};

export default Review;