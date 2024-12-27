import { Card, Row, Col, Navbar, Image } from 'react-bootstrap'; 
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config'; // Import firebaseConfig

import './styles_locker.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Service() {
    const [locker1Status, setLocker1Status] = useState('กำลังโหลด...');
    const [locker2Status, setLocker2Status] = useState('กำลังโหลด...');

    const signout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token')
        window.location = '/sign-in'
    }

    useEffect(() => {
        // Check if user is logged in
        const token = Cookies.get('token');
        if (!token) {
            window.location.href = '/sign-in';
        }

        // Fetch status of locker 1 and locker 2
        const fetchLockerStatus = async () => {
            const locker1Doc = await getDoc(doc(db, "locker", "locker 1"));
            const locker2Doc = await getDoc(doc(db, "locker", "locker 2"));

            if (locker1Doc.exists()) {
                setLocker1Status(locker1Doc.data().service);
            } else {
                setLocker1Status('ไม่พบข้อมูล');
            }

            if (locker2Doc.exists()) {
                setLocker2Status(locker2Doc.data().service);
            } else {
                setLocker2Status('ไม่พบข้อมูล');
            }
        }

        fetchLockerStatus();
    }, []);

    const getStatusStyle = (status) => {
        return status === 'available' ? { color: 'green' } : { color: 'red' };
    }

    return (
        <div className="container text-center">
            <Navbar className="navbar navbar-expand-lg bg-body-tertiary" id="nav">
                <Navbar.Brand href="/">
                    <Image 
                        src="https://as1.ftcdn.net/v2/jpg/02/37/58/88/1000_F_237588888_i8RxWIMnbJWhaAVAiTZDUW1Ou5UFZIq7.jpg" 
                        alt="Logo" 
                        width="40" 
                        height="34" 
                        className="d-inline-block align-text-top"
                    />
                    Locker Service
                </Navbar.Brand>
                <div className='collapse navbar-collapse'>
                    <div className="navbar-nav ms-auto">
                        <button className="btn btn-outline-success" onClick={signout}>Logout</button>
                    </div>
                </div>
            </Navbar>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">        
                        <h1 className="fw-light">ตู้สำหรับให้บริการ</h1>
                        <hr/>           
                    </div>
                </div>

                <div className="col-lg-6 col-md-8 mx-auto"> 
                    <div className="container text-center">
                        <div className="g-3"></div>

                        {/* ตู้บริการหมายเลข 1 */}
                        <Card style={{ width: '30rem' }}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card style={{ width: '15rem' }}>
                                            <Card.Img 
                                                variant="top" 
                                                src="https://media.istockphoto.com/id/1139272865/vector/gym-locker-icon.jpg?s=612x612&w=0&k=20&c=G_HHVhTU1c4oXKRXZnknfbhZW1yhzwk84_FTNL6eBuU=" 
                                            />
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card.Title>ตู้บริการหมายเลข 1</Card.Title>
                                        <Card.Text style={getStatusStyle(locker1Status)}>
                                            สถานะ: {locker1Status}
                                        </Card.Text>
                                        <hr/>
                                        {/* เช็คสถานะ service เพื่อซ่อนปุ่ม */}
                                        {locker1Status === 'available' && (
                                            <Card.Link>
                                                <a className="btn btn-primary" href="/payment1" role="button">ใช้บริการ</a>
                                            </Card.Link>
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        {/* ตู้บริการหมายเลข 2 */}
                        <Card style={{ width: '30rem' }}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card style={{ width: '15rem' }}>
                                            <Card.Img 
                                                variant="top" 
                                                src="https://media.istockphoto.com/id/1139272865/vector/gym-locker-icon.jpg?s=612x612&w=0&k=20&c=G_HHVhTU1c4oXKRXZnknfbhZW1yhzwk84_FTNL6eBuU=" 
                                            />
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card.Title>ตู้บริการหมายเลข 2</Card.Title>
                                        <Card.Text style={getStatusStyle(locker2Status)}>
                                            สถานะ: {locker2Status}
                                        </Card.Text>
                                        <hr/>
                                        {/* เช็คสถานะ service เพื่อซ่อนปุ่ม */}
                                        {locker2Status === 'available' && (
                                            <Card.Link>
                                                <a className="btn btn-primary" href="/payment2" role="button">ใช้บริการ</a>
                                            </Card.Link>
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Service;
