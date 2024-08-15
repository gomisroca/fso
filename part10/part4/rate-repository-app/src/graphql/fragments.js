import { gql } from "@apollo/client"

export const BASIC_USER_INFO = gql`
  fragment BasicUserInfo on User {
    id,
    username,
  }
`

export const BASIC_REPOSITORY_INFO = gql`
  fragment BasicRepositoryInfo on Repository {
    id,
    fullName,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl
  }
`

export const REVIEW_DATA = gql`
  fragment ReviewData on Review {
    id,
    text,
    rating,
    createdAt,
    user {
      id,
      username
    }
  }
`