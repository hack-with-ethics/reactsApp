import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../ProjCss/home.css"
import { ReactTyped } from "react-typed";
import photo from "../assests/header.jpg"
import plane1 from "../assests/plan-1.jpg"
import plane2 from "../assests/plan-2.jpg"
import plane3 from "../assests/plan-3.jpg"
import Header2 from '../components/Header2';
import relax from "../assests/relax.jpeg"
import cal from "../assests/calender.jpeg"
import check from "../assests/check.jpeg"
import Footer from '../components/Footer';
import save from "../assests/save.jpeg"


function Home() {

  return (
      < >
      {/* <header>
        <div className='container-fluid bg-dark  fixed-top rounded'>
          <div className='row'>
            <div className='col'>
            <p className='h1 p-5 text-white'>SKYHOP</p>
            </div>
            <div className='col d-flex justify-content-end'>
              <ul className='list-inline p-4 text-white'>
                <li className='list-inline-item pl-2 pb-0' id="lnk"><a>Home</a></li>
                <li className='list-inline-item pl-2 pb-0' id="lnk"><a>Contact</a></li>
                <li className='list-inline-item p-2'><button className='btn btn-light fw-light'>Login</button></li>
                <li className='list-inline-item p-2'><button className='btn btn-warning fw-light'>Register</button></li>
              </ul>
            </div>
          </div>
        </div>
      </header> */}
      <Header2/>
      <div id="top">
      <div className='container' id="topsec">
            <div className='row'>
                  <div className='col-12'>
                    <p className='h1' id="topic">Find and Book <br/> <ReactTyped  className='typer'
                              strings={["A Great Experience...","Beyond expectations..","Simply amazing..","Truly unforgettable."]}
                              typeSpeed={120}
                              backSpeed={100}
                              loop
                             
                            /></p>
                  
                  </div>
            </div>
            <div className='row'>
              <div className='col-12 text-center'>
                <img src={photo} id="flg" alt=''>
                </img>
              </div>
        </div>
        <div className='container' id="part2">
            <div className='row'>
              <div className='col-12'>
              <p id="subtitle" className='p-2'>Travel Support</p>
              <p id="topic">Plan your travel with confidence</p>
              </div>
            </div>
            {/* <div className='col-12 m-0'>
              <p id="topic">Plan your travel with confidence</p>
            </div> */}
        </div>
        <div id="out">
        <div className='container'>
          <div id="cons">
          <div className='row'>
                <div className='col-6' style={{borderRadius:"40px",padding:"20px"}}>
                  <div className='row'>
                    <p id="nums">01</p>
                    <h4>Travel Requirements for Dubai</h4>
          <p>
            Stay informed and prepared for your trip to Dubai with essential
            travel requirements, ensuring a smooth and hassle-free experience in
            this vibrant and captivating city.
          </p>
                  </div>
                  <div className='row'>
                    <p id="nums2">02</p>
                    <h4>Multi-risk travel insurance</h4>
          <p>
            Comprehensive protection for your peace of mind, covering a range of
            potential travel risks and unexpected situations.
          </p>
                  </div>
                  <div className='row'>
                    <p id="nums3">03</p>
                    <h4>Travel Requirements by destinations</h4>
          <p>
            Stay informed and plan your trip with ease, as we provide up-to-date
            information on travel requirements specific to your desired
            destinations.
          </p>
                  </div>
                  
                </div>
                <div className='col-6 ' style={{height:"700px",borderRadius:"40px",padding:"20px",marginBottom:"0px"}}>
                  <div id="photosg">
                <img src={plane1} id="plane1" className='PL' alt="plan" />
          <img src={plane2} id="plane2" className='PL' alt="plan2" />
          <img src={plane3} id="plane3" className='PL' alt="plan3" />
          </div>
                </div>
                </div>
          </div>
          </div>
        </div>
        
          
      </div>
      <div className='sep_sect'>
          <div className='container'>
          <div className='row'>
            <div className='col'>
            <p id="topic">Travel to make memories all<br/>around the world</p>
            </div>
          </div>
          <div className='row'>
              <div className='col'>
                <div className='card'>
                <img src={cal} id="crd-img1" class="img-fluid rounded w-2" alt="Sample Image"/>
  <div class="card-body"/>
    <h5 class="card-title text-center">Book & relax</h5>
    <p class="card-text">With "Book and Relax," you can sit back, unwind, and enjoy the journey while we take care of everything else.</p>
                </div>
              </div>
              <div className='col'>
              <div className='card'>
                <img src={check} id="crd-img2" class="img-fluid rounded" alt="Sample Image"/>
  <div class="card-body"/>
    <h5 class="card-title text-center">smart checklist</h5>
    <p class="card-text">Introducing Smart Checklist with us, the innovative solution revolutionizing the way you travel with our airline.</p>
                </div>
              
              </div>
              <div className='col'>
              <div className='card'>
                <img src={save} class="img-fluid rounded" id="crd-img3" alt="Sample Image"/>
  <div class="card-body"/>
    <h5 class="card-title text-center">Save More</h5>
    <p class="card-text">From discounted ticket prices to exclusive promotions and deals, we prioritize affordability</p>
                </div>
             

              </div>
          </div>
          </div>
        </div>
        <div id="subs">
            <div className='container'>
               <div className='row'>
                <div className='col'>
                   <p id="topic">Subscribe newsletter & <br/>get latest news</p>
                </div>
                <div className='col-12 text-center'>
                  <input className='inpbox' type='text' placeholder='Enter the email'></input> <button id="bts">Subscribe</button>
                </div>
               </div>
            </div>
            </div>
            </div>
            <Footer/>
      </>
  );
}

export default Home;