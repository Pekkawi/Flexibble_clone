export const getUserQuery = `
  query GetUser($email: String!) {
    user(by:{email: $email}) {
      id
      name
      email
      avatarUrl
      description
      githubUrl
      linkedinUrl
    }
  }
`; //we want to get a user and query them by email
//we are returning an id , name ,email etc.

export const createUserMutation = `
  mutation CreateUser($input: UserCreateInput!) {
    userCreate(input: $input) {
      user {
        name
        email 
        avatarUrl
        githubUrl
        linkedinUrl
        id
      }
    }
  }
`;
