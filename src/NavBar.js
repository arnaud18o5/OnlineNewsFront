import {useCookies} from 'react-cookie';

const NavBar = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    if(cookies.token){
        return(
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
                                <button class="mx-3 btn btn-light">{cookies.username}</button>
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
                                <button class="mx-3 btn btn-light">Login</button>
                                <button class="btn btn-warning">Sign-Up</button>
                            </div> 
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;