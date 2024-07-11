import { createStore, createEffect } from 'effector'
import { GET_REPOSITORY } from '../../../shared/api/GraphQL/Query';
import {client} from "../../../shared/api/client";
import { useUnit } from 'effector-react';
// import RepoEffType from "../index"

const fetchRepoFx = createEffect(async ({user, name}: fetchRepoFxProps) => {
  const response = await client.query({ 
    query: GET_REPOSITORY,
    variables: {
      username: `${user}`,
      repository: `${name}`
    }
  });
  const { data, loading, error } = response;
  return { data: data.repository, loading, error };
});

const $repo = createStore<RepoEffType | null >(null)
    .on(fetchRepoFx.doneData, (_, { data }) => data)
    .on(fetchRepoFx.fail, (_, { error }) => {
    console.error('Failed to fetch repository:', error);
});

export function RepoEff() {
  return useUnit($repo);
}

export { $repo };
export { fetchRepoFx };