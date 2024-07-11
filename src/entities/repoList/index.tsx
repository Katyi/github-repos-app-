import { useState, useCallback, useEffect } from 'react';
import styles from "./index.module.css";
import { fetchReposFx, $repos } from './model';
import { Buffer } from "buffer";
import { useUnit } from "effector-react";
import { createEvent } from 'effector';
import SearchForm from '../../features/searchForm';
import Pagination from '../../features/pagination';
import ReposTable from './table';

const RepoList = () => {
  const [currentPage, setCurrentPage] = useState<number>(Number(localStorage.getItem('page')) || 1);
  const [after, setAfter] = useState<string | null>(localStorage.getItem('after') !== 'undefined' ? localStorage.getItem('after') : null || null);
  const [repoName, setRepoName] = useState<string | null>(localStorage.getItem('repo') || null);
  // const [user, setUser] = useState("Katyi");
  const pageSize = 10;
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [reposLoading, setReposLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  let reposEff: reposEffType | null = useUnit($repos);
  
  const setReposEff = createEvent();
  $repos.on(setReposEff, (_, repos) => repos);

  const fetchAndSetRepos = useCallback(async () => {
    try {
      const { data, loading, error } = await fetchReposFx({repoName: repoName, after: after});
      if (!loading) {
        setReposEff(data);
        setPageLoading(false);
        setReposLoading(false);
        // setError(error)
      }
      if (error) {
        console.log(error);
      }
    } 
      catch (error) {
      setPageLoading(false);
      setError(error);
    }
  }, [setReposEff]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAndSetRepos();
    };
    if (!error) {
      fetchData();
    }
    
  }, [fetchAndSetRepos]);

  
  const onPageChange = (page: number) => {
    let s: string = "";
    if (page > 1) {
      let b = Buffer.from(`cursor:${page * 10 - 10}`);
      s = b.toString('base64');
    }
    setReposLoading(true);
    setCurrentPage(page);
    setAfter(s);
    localStorage.setItem('page', page.toString());
    localStorage.setItem('after', s);
  };
  
  if (pageLoading) return (
    <div className={styles.loadingErrorWrapper}>
      <span className={styles.loadingErrorText}>Loading...</span>
    </div>
  )
  if (error) return (
    <div className={styles.loadingErrorWrapper}>
      <span className={styles.loadingErrorText}>Error : {error.message}</span>
    </div>
  )
  
  return (
    <div className={styles.repoListWrapper}>
      <h2>Поиск репозиториев в Github</h2>
      <SearchForm
        setRepoName={setRepoName} 
        setCurrentPage={setCurrentPage} 
        setAfter={setAfter}
        setPageLoading={setPageLoading}
      />
      
      <ReposTable
        reposLoading={reposLoading}
        reposEff={reposEff}
        currentPage={currentPage}
        pageSize={pageSize}
      />

      {reposLoading && <div className={styles.tableBodyLoading}>loading...</div>}

      {reposEff?.edges.length === 0 &&
        <div className={styles.noRepoMessage}>
          Нет данных
        </div>
      }
      
      {!reposLoading && 
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        pagesCount={reposEff ? Math.ceil(reposEff.repositoryCount / pageSize): 0}
      />}
    </div>
  )
}

export default RepoList;