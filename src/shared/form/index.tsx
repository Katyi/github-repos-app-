const Form = (props: FormProps) => {
  let {onSubmit, className, children} = props;
  return (
    <form 
      onSubmit={onSubmit} 
      className={className}
    >
      {children}
    </form>
  )
}

export default Form;