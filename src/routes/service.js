import { Card, Row, Col,  Navbar, Image} from 'react-bootstrap';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import './styles.css';

function Service() {
  const signout = (event) => {
      event.preventDefault();
      localStorage.removeItem('token');
      Cookies.remove('token'); // ลบคุกกี้เมื่อออกจากระบบ
      window.location.replace('/sign-in'); // ใช้ replace เพื่อไม่ให้สามารถย้อนกลับได้
  }

  useEffect(() => {
      // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
      const token = Cookies.get('token'); // สมมติว่าคุณเก็บ token ในคุกกี้
      if (!token) {
          window.location.replace('/sign-in'); // เปลี่ยนหน้าไปที่หน้า sign-in ถ้าไม่มี token
      }
  }, []);
    

    return(
        <div class="container text-center">
        <Navbar class="navbar navbar-expand-lg bg-body-tertiary" id="nav">
          <Navbar.Brand href="/">
            <Image src="https://as1.ftcdn.net/v2/jpg/02/37/58/88/1000_F_237588888_i8RxWIMnbJWhaAVAiTZDUW1Ou5UFZIq7.jpg" alt="Logo" width="40" height="34" class="d-inline-block align-text-top"></Image>
            Locker Service
          </Navbar.Brand>
          <div className='collapse navbar-collapse'>
            <div class="navbar-nav ms-auto">
              
              <button class="btn btn-outline-success" variant="contained" onClick={signout}>Logout</button>
            </div>
          </div>
        </Navbar>
        <div class = "service-bg">
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 mx-auto">        
                  <h1 class="fw-light">ตัวเลือกการใช้บริการ</h1>
                  <hr/>           
              </div>
            </div>
        
            <div class="col-lg-6 col-md-8 mx-auto"> 
              <div class="container text-center">
                <div class ="g-3"></div>
                    
                <Card style={{width: '60rm'}}>
                      <Card.Body>
                      <Row>
                        <Col>
                          <Card style={{width: '60rm'}}>
                             <Card.Img variant="top" src= 'https://cdn.pixabay.com/photo/2013/07/12/14/43/hotel-148657_1280.png' />
                          </Card>
                        </Col>
                        <Col>
                            <Card.Title> จองตู้เก็บของ </Card.Title>
                            <Card.Text> บริการเช่า locker สำหรับฝากของ สามารถเลือกขนาดและเวลา </Card.Text>
                            <hr/>
                            <Card.Link>
                            <a class="btn btn-primary" href="/locker" role="button">ใช้บริการ</a>
                            </Card.Link>
                        </Col>
                        
                      </Row>
                      </Card.Body>
                    </Card>
                    
                    <Card style={{width: '60rm'}}>
                      <Card.Body>
                      <Row>
                        <Col>
                          <Card style={{width: '60rm'}}>
                             <Card.Img variant="top" src= 'https://www.freeiconspng.com/thumbs/lock-icon/lock-icon-11.png' />
                          </Card>
                        </Col>
                        <Col>
                            <Card.Title> ปลดล็อคตู้ </Card.Title>
                            <Card.Text> บริการปลดล็อคตู้ โดย key ที่ได้หลังจากการจอง </Card.Text>
                            <hr/>
                            <Card.Link>
                            <a class="btn btn-primary" href="/unlock" role="button">ใช้บริการ</a>
                            </Card.Link>
                        </Col>
                        
                      </Row>
                      </Card.Body>
                      
                    </Card>
  
                    
  
  
      
              </div>
            </div>
        </section>
        </div>
        </div>
        
    );
}
export default Service;