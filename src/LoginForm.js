import { useCookies} from 'react-cookie';


const LoginForm = () => {
    const [cookies, setCookies, removeCookies] = useCookies();
    const submit = async (event) => {
        event.preventDefault();
        const query = `query Query($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              id
              username
              firstName
              lastName
              token
              description
            }
          }`;
          const username = event.target.username.value;
          const password = event.target.password.value;
          const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            query,
            variables: { username: username, password: password },
            })
        });
        const user = await response.json();
        if(!user.errors) {
            console.log(`Welcome ${user.data.login.firstName}`);
            setCookies('token', user.data.login.token);
            setCookies('username', user.data.login.username);
            setCookies('firstName', user.data.login.firstName);
            setCookies('lastName', user.data.login.lastName);
            setCookies('description', user.data.login.description);
            setCookies('id', user.data.login.id);
        }
        console.log(user);
    }

    return(
        <div id="login-div">
            <h3>Login user :</h3>
            <form onSubmit={submit}>
                <input type="text" id="username" placeholder="username"></input>
                <input type="password" id="password" placeholder="password"></input>
                <input type="submit" value="connect"></input>
            </form>
        </div>
    )
}

export default LoginForm;