import { gql } from "@apollo/client";

export const GET_REPOSITORY = gql`
  query getRepository($username: String!, $repository: String!) {
    repository (name: $repository, owner: $username) {
			name
    	description
    	stargazerCount
      url
    	pushedAt
    	updatedAt
    	owner {
        login
        avatarUrl
      }
      languages(first: 10) {
      	totalCount
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query getListRepos($queryString: String!, $after: String) {
    search(
      query: $queryString, 
      type: REPOSITORY, 
      first: 10,
      after: $after
    ) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            stargazerCount
            url
            owner {
              login
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first:1) {
                    totalCount
                    edges {
                      node {
                        ... on Commit {
                          committedDate
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;