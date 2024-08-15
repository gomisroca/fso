import { gql } from '@apollo/client';
import { BASIC_REPOSITORY_INFO, BASIC_USER_INFO, REVIEW_DATA } from './fragments';

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection, 
      searchKeyword: $searchKeyword, 
      first: $first, 
      after: $after
    ) {
      edges {
        node {
          ...BasicRepositoryInfo
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  },
  ${BASIC_REPOSITORY_INFO}
`;

export const GET_REPOSITORY = gql`
  query($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...BasicRepositoryInfo,
      url,
      reviews(first: $first, after: $after) {
        edges {
          node {
           ...ReviewData
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  },
  ${BASIC_REPOSITORY_INFO}, ${REVIEW_DATA}
`;

export const GET_USER_INFO = gql`
  query getUserInfo($includeReviews: Boolean = false) {
    me {
      ...BasicUserInfo,
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewData,
            repositoryId,
            repository {
              fullName
            }
          }
        }
      }
    }
  },
  ${BASIC_USER_INFO}, ${REVIEW_DATA}
`