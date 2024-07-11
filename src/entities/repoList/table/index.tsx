
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from "./index.module.css";

const ReposTable = (props: reposTableProps) => {
  let {reposLoading, reposEff, currentPage, pageSize} = props;
  return (
    <table className={styles.tableWrapper}>
      <thead>
        <tr>
          <th>№</th>
          <th>Репозиторий</th>
          <th>Кол-во звёзд</th>
          <th>Дата последнего коммита</th>
          <th>Ссылка на Github</th>
        </tr>
      </thead>
        {!reposLoading && <tbody>
        {reposEff?.edges?.map((repo: ReposEdgesType, index: number) => 
          <tr key={repo.node.id}>
          <td>{currentPage * pageSize - pageSize + index + 1}</td>
          <td>
            <Link className={styles.linkToCard} 
              to={`/repos/${repo.node.id}`} state={{name: `${repo.node.name}`, user: `${repo.node.owner.login}`}}>
              {repo.node.name}
            </Link>
            </td>
            <td>{repo.node.stargazerCount}</td>
            <td>{dayjs(repo.node?.defaultBranchRef?.target.history.edges[0].node.committedDate).format('DD.MM.YYYY')}</td>
            <td>{repo.node.url}</td>
          </tr>
        )}
      </tbody>}
    </table>
  )
}

export default ReposTable;