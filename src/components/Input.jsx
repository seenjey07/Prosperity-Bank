
const Input = (props) => {
    const { label, type, id, value, onChange } = props

    return (
      <>
        <label>{label}</label>
        
        <input 
				title={label} 
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				/>
      </>
    )
}
  
  export default Input