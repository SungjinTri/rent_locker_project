import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // นำเข้าไฟล์ CSS

const RentLockerService = () => {
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

  const handleRentClick = () => {
    navigate('/service'); // นำทางไปยังหน้า /home
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      
      <main>
        <section class = "headpic" id="home">
        <div class=" text">
          <h1><strong> Locker Service</strong></h1>
          <p><br></br>Welcome to our rent locker service website!</p>
          <button  onClick={handleRentClick}>Rent</button>
          </div>
        </section>
        
        <section class="page-section" id="services">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">SERVICES</h2>
                    <h3 class="section-subheading text-muted">บริการต่างๆ</h3>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto " src="https://cdn.pixabay.com/photo/2013/07/12/18/03/lock-152879_1280.png" alt="..." />
                            <h4>Secure Lockers</h4>
                            <p class="text-muted">ระบบล็อคเพื่อรักษาความปลอดถัย</p>
                            
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto " src="https://cdn.pixabay.com/photo/2016/03/31/14/48/clock-1292829_960_720.png" alt="..." />
                            <h4>24/7 Access</h4>
                            <p class="text-muted">เข้าถึงบริการได้ 24 ชั่วโมง</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto " src="https://cdn.pixabay.com/photo/2016/10/03/02/30/wallet-1710848_1280.png" alt="..." />
                            <h4>easy to use</h4>
                            <p class="text-muted">ใช้งานได้ง่าย ราคาถูก</p>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
       
        <section id="about" className="right-section">
          <h2>About Us</h2>
          <p>We provide secure and convenient locker rental services.</p>
          <img src="/img/img1.jpg" alt="About Us Image" />
        </section>
       
        <section id="contact" className="right-section">
          <h2>contact</h2>
          <p>6210110712@psu.ac.th</p>
          <p>6210110050@psu.ac.th</p>
        </section>
      </main>
    </div>
  );
};

export default RentLockerService;
