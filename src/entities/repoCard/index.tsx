import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.css';
import dayjs from 'dayjs';
import arrowBack from '../../shared/assets/arrowBack.svg';
import { useUnit } from 'effector-react';
import { $repo, fetchRepoFx } from './model';
import { createEvent } from 'effector';
import { useCallback, useEffect, useState } from 'react';

const RepoCard = () => {
  const location = useLocation();
  const name  = location.state?.name;
  const user  = location.state?.user;
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  
  let repoEff: RepoEffType | null = useUnit($repo);

  const setRepoEff = createEvent();
  $repo.on(setRepoEff, (_, repo) => repo);

  const fetchAndSetRepos = useCallback(async () => {
    try {
      const { data, loading, error } = await fetchRepoFx({user: user, name: name});
      if (!loading) {
        setRepoEff(data);
        setPageLoading(false);
      }
      if (error) {
        setPageLoading(false);
        setError(error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }, [setRepoEff]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAndSetRepos();
    };
    fetchData();
  }, [fetchAndSetRepos]);

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
  // if (!error && !pageLoading && typeof repoEff === "RepoEffType")
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.upPart}>
        <Link to="/">
          <img src={arrowBack} alt="arrowBack"  width={30} height={30}/>
        </Link>
        <h2>Карточка репозитория</h2> 
      </div>
      <div className={styles.bottomPart}>
        <div className={styles.imagePart}>
          
          <Link to={`${repoEff?.url}`} target="_blank" tabIndex={-1} className={styles.linkToGithub}>
            <h2>{user}</h2>
          </Link>
          <img src={repoEff?.owner?.avatarUrl} alt="user image" height={100} width={100}/>
        </div>
        
        <div className={styles.bottomPartRow}>
          <h4>Название репозитория:</h4>
          <span className={styles.bottomPartCell}>{name}</span>
        </div>
        <div className={styles.bottomPartRow}>
          <h4>Краткое описание:</h4>
          <span className={styles.bottomPartCell}>{repoEff?.description}</span>
        </div>
        <div className={styles.bottomPartRow}>
          <h4>дата последнего коммита:</h4>
          <span className={styles.bottomPartCell}>{dayjs(repoEff?.pushedAt).format('DD.MM.YYYY')}</span>
        </div>
        <div className={styles.bottomPartRow}>
          <h4>кол-во звёзд:</h4>
          <span className={styles.bottomPartCell}>{repoEff?.stargazerCount}</span>
        </div>
        
        <h4>Список используемых языков:</h4>
        <ul className={styles.cardLangRow}>
          {repoEff?.languages?.edges.map((lang:LangEdgesType) => 
            <li key={lang.node.name} className={styles.cardLangCell}>{lang.node.name}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default RepoCard;