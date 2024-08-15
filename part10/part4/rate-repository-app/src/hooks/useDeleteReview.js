import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const useDeleteReview = () => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  const removeReview = async ({ id }) => {
    const { data } = await deleteReview({ variables: { id }, })
    return data;
  };

  return [removeReview, result];
};

export default useDeleteReview;