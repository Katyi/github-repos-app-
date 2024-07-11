import { createStore, createEffect } from 'effector'
import { GET_REPOSITORIES } from '../../../shared/api/GraphQL/Query';
import {client} from "../../../shared/api/client";
import { useUnit } from 'effector-react';

const fetchReposFx = createEffect(async ({repoName, after}: fetchReposFxProps) => {
  const response = await client.query({ 
    query: GET_REPOSITORIES,
    variables: {
      queryString: repoName ? `${repoName} in:name` : `user:"Katyi"`,
      after: after
    }
  });
  const { data, loading, error } = response;
  return { data: data.search, loading, error };
});

const $repos = createStore<reposEffType | null>(null)
    .on(fetchReposFx.doneData, (_, { data }) => data)
    .on(fetchReposFx.fail, (_, { error }) => {
    console.error('Failed to fetch repositories:', error);
});

export function ReposEff() {
  return useUnit($repos);
}

export { $repos };
export { fetchReposFx };