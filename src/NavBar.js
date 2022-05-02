import {useCookies} from 'react-cookie';
import ReactTooltip from 'react-tooltip';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';

const NavBar = (props) => {
    const [cookies, setCookie, removeCookies] = useCookies();

    const signOut = () => {
        removeCookies('username'); 
        removeCookies('token'); 
        removeCookies('description');
        removeCookies('lastName'); 
        removeCookies('firstName');
        props.changeState("HP");
    }
    if(cookies.token){
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light z-devant">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#" onClick={() => {props.changeState("HPLogged")}}>Online News</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">News</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Economy</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Politic</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link">Environment</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link">Sport</a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="position-relativ">
                        <div class="position-absolute top-50 end-0 translate-middle-y d-flex align-items-center">
                        <button class="btn btn-warning" onClick={()=> {props.changeState("newArticle")}}>New Article</button>
                            <div class="px-5 dropdown z-drop">
                                <button class="mx-3 btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{cookies.username}</button>
                                    <div class="dropdown-menu z-drop" aria-labelledby="user">
                                        <div class="d-flex p-2 bd-highlight w-100 px-0">
                                            <button class="w-100 btn btn-link">Your profile</button>
                                        </div>
                                        <div class="d-flex p-2 bd-highlight w-100 px-0">
                                            <button class="w-100 btn btn-link">Your articles</button>
                                        </div>
                                        <div class="d-flex p-2 bd-highlight w-100 px-0">
                                            <button class="w-100 btn btn-link">Your subscriptions</button>
                                        </div>
                                        <div class="d-flex p-2 bd-highlight w-100 px-0">
                                            <button onClick={signOut} class="w-100 btn btn-light">Sign-out</button>
                                        </div>
                                    </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
    else{
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Online News</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">News</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Economy</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Politic</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link">Environment</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link">Sport</a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="position-relativ">
                        <div class="position-absolute top-50 end-0 translate-middle-y">
                            <div class="px-5">
                                <button  data-tip data-for="login" data-event="click" class="mx-3 btn btn-light">Login</button>
                                <ReactTooltip id='login' place='bottom' type="light" effect='solid' border={true} clickable={true} >
                                    <LoginForm onConnect={props.changeState}></LoginForm>
                                </ReactTooltip>
                                <button  data-tip data-for="register" data-event="click" class="btn btn-warning">Sign-Up</button>
                                <ReactTooltip id='register' place='bottom' type="light" effect='solid' border={true} clickable={true} >
                                    <RegisterForm></RegisterForm>
                                </ReactTooltip>
                            </div> 
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;