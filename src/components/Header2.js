import 'bootstrap/dist/css/bootstrap.min.css';

import lg from "../components/logo.ico"
function Header2(){
  const handle= (par) =>{
    window.location.href = par
  }

    return(<>
  <header>
        <div className='container-fluid bg-dark  fixed-top rounded'>
          <div className='row'>
            <div className='col'>
            <p className='h1 p-5 text-white'><img style={{maxWidth:"50px"}} src={lg}></img> SKYHOP</p>
            </div>
            <div className='col d-flex justify-content-end'>
              <ul className='list-inline p-4 text-white'>
                <li className='list-inline-item pl-2 pb-0' id="lnk"><a>Home</a></li>
                <li className='list-inline-item pl-2 pb-0' id="lnk"><a>Contact</a></li>
                <li className='list-inline-item p-2'><button onClick={() => handle("/login")} className='btn btn-light fw-light'>Login</button></li>
                <li className='list-inline-item p-2'><button onClick={() => handle("/register")} className='btn btn-warning fw-light'>Register</button></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>);
}


export default Header2;