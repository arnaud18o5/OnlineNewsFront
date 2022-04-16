import { useCookies} from 'react-cookie';

const RegisterForm = () => {
    const [cookies, setCookies, removeCookies] = useCookies();

    const submit = async (event) => {
        event.preventDefault();
        const query = `mutation RegisterUser($username: String!, $password: String!) {
            registerUser(username: $username, password: $password) {
              firstName
              lastName
              description
              username
              id
            }
          }`;
          const username = event.target.usernameregister.value;
          const password = event.target.passwordregister.value;
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
            console.log(`user registered`);
        }
        console.log(user);
    }

    return (
        <div id="register-div">
            <h3>Register user :</h3>
            <form onSubmit={submit}>
                <input type="text" id="usernameregister" placeholder="username"></input>
                <input type="password" id="passwordregister" placeholder="password"></input>
                <input type="submit" value="register"></input>
            </form>
        </div>
    )
}

export default RegisterForm;