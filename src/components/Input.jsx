
const Input = (props) => {
    const { label, type, id, value, onChange, fullName, birthday, accountNumber } = props

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