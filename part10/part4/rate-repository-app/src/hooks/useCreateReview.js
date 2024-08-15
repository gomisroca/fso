import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const useCreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const review = async ({ owner, name, rating, text }) => {
    const { data } = await createReview({ variables: { owner, name, rating: parseInt(rating), text } })
    return data.createReview;
  };

  return [review, result];
};

export default useCreateReview;