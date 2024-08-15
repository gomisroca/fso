import { gql } from '@apollo/client';
import { BASIC_USER_INFO, REVIEW_DATA } from './fragments';

export const AUTHENTICATE = gql`
  mutation authenticate($username: String!, $password: String!) {
   authenticate(credentials: { username: $username, password: $password }) {
      accessToken
      user {
        ...BasicUserInfo
      }
    }
  },
  ${BASIC_USER_INFO}
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      ...BasicUserInfo
    }
  },
  ${BASIC_USER_INFO}
`;

export const CREATE_REVIEW = gql`
  mutation createReview($owner: String!, $name: String!, $rating: Int!, $text: String) {
    createReview(review: { ownerName: $owner, rating: $rating, repositoryName: $name, text: $text}) {
      ...ReviewData,
      repositoryId
    }
  },
  ${REVIEW_DATA}
`

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`