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
    <>
        <div id="register-div">
            <h3>Register user :</h3>
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
      </>
    )
}

export default RegisterForm;