import styles from "./index.module.css";
import Form from '../../shared/form';
import Input from '../../shared/input';
import Button from '../../shared/button';
import { ChangeEvent, useState } from "react";

const SearchForm = (props: SearchFormProps) => {
  const [value, setValue] = useState<string | null>(null);
  let {setRepoName, setCurrentPage, setAfter, setPageLoading} = props;
  
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRepoName(value);
    localStorage.clear();
    localStorage.setItem('repo', value !== null ? JSON.stringify(value) : "");
    setCurrentPage(1);
    setAfter(null);
    setPageLoading(true);
    setValue(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.formWrapper}>
      <Input 
        type="text" 
        className={styles.repoInput}
        placeholder='Поиск репозитория' 
        value={value} 
        onChange={handleChange}
      />
      <Button 
        className={styles.formBtn} 
        type="submit"
        tittle="Искать"
      />
    </Form>
  )
}

export default SearchForm;