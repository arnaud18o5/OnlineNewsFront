import { useCookies} from 'react-cookie';
import Button from 'react-bootstrap/Button';


const LoginForm = (props) => {
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
              avatar
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
            setCookies('avatar', user.data.login.avatar);
            props.onConnect("HPLogged");
        }
        console.log(user);
    }

    return(
        <div id="login-div">
            <h3>Login user :</h3>
            <form onSubmit={submit}>
                <div class="flex-column">
                    <div class="form-floating d-flex justify-content-center input-group mb-3">
                        <input type="text" id="username" placeholder="username"></input>
                    </div>
                    <div class="form-floating d-flex justify-content-center input-group mb-3">
                        <input type="password" id="password" placeholder="password"></input>
                    </div>
                    <div class="form-floating d-flex justify-content-center input-group mb-3">
                        <button type="submit" class="btn btn-primary">Connect</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;