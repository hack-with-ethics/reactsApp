import 'bootstrap/dist/css/bootstrap.min.css';
import '../ProjCss/footer.css'

import lg from "../components/logo.ico"
function Footer(){

    return(<>
    <div id="btom" className='bg-dark'>
        <div className="container">
            <div className='row'>
                <div className='col'>
                        <h2 className='text-white'><img style={{maxWidth:"50px"}} src={lg}/>SKYHOP</h2>
                </div>
                <div className='col'>
                    <h2 className='text-white'>Links</h2>
                    <ul>
                        <li>Home</li>
                        <li>Contact</li>
                        <li>Login</li>
                        <li>Register</li>
                    </ul>
                </div>
                <div className='col'>
                    <h2 className='text-white'>Contact</h2>
                    <ul>
                        <li>Phone : +91 944339256</li>
                        <li>Email : sanjai@gmail.com</li>
                    </ul>
                </div>

            </div>
            <div className='row'>
            <div className='col'>
            <p style={{ color: "whitesmoke" }}> ©{new Date().getFullYear()} reversed rights</p>

                </div>
            </div>
        
        </div>
    </div>
    </>);
}

export default Footer;