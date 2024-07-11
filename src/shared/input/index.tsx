const Input = (props: InputProps) => {
  let {type, className, placeholder, value, onChange} = props;
  return (
    <input 
      type={type} 
      className={className}
      placeholder={placeholder}
      value={value || ""} 
      onChange={onChange}
    />
  )
}

export default Input;