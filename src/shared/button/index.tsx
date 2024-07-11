import styles from "./index.module.css";

const Button = (props: ButtonProps) => {
  let { className, type, tittle, onClickFn } = props;
  
  return (
    <button 
      className={`${className} ${styles.btn}`} 
      type={type}
      onClick={onClickFn}
    >
      {tittle}
    </button>
  )
}

export default Button;