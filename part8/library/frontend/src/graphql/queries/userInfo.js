import { gql} from '@apollo/client'

export const USER_INFO = gql`
  query findUser {
    me {
      username
      favoriteGenre
    }
  }
`