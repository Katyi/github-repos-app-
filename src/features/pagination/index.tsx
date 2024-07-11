import Button from "../../shared/button";
import styles from "./index.module.css";

const Pagination = (props: PaginationProps) => {
  let {currentPage, onPageChange, pagesCount} = props;
  if (pagesCount > 10) pagesCount = 10;
  
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  
  return (
    <div className="">
      <div className={styles.pageRow}>
        {pages.map((page: number) => (
          <Button 
            type="button"
            key={page} 
            className={page === currentPage ? `${styles.buttonCurrentPage}` : ""} 
            onClickFn={() => onPageChange(page)}
            tittle={page}
          />
        ))}
      </div>
    </div>
  )
}

export default Pagination;