
const Input = (props) => {
    const { label, type } = props

    return (
      <>
        <label>{label}</label><br></br>
        <input title={label} type={type}/>
      </>
    )
}
  
  export default Input