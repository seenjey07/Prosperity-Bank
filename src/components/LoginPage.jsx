import Input from "./Input"


const LoginPage = () => {

    return (
			<div>
				<form style={{
					display: 'block',
					padding: '10px',
					textAlign: 'center',
				}}>
					<Input
						label="Username"
						type="text"
					/><br></br><br></br>

					<Input
						label="Password"
						type="password"
					/><br></br><br></br>

					<button type="submit">Login</button>
				</form>
			</div>
    )
}
  
  export default LoginPage