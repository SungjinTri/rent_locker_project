import { Card, Row, Col, Navbar, Image } from 'react-bootstrap';   
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config'; // Import firebaseConfig
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { useNavigate } from 'react-router-dom';

import './styles_locker.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth

function Service() {
    const navigate = useNavigate();
    const [locker1Status, setLocker1Status] = useState('กำลังโหลด...');
    const [locker2Status, setLocker2Status] = useState('กำลังโหลด...');
    const [locker1Customer, setLocker1Customer] = useState(null); // Customer field for locker 1
    const [locker2Customer, setLocker2Customer] = useState(null); // Customer field for locker 2

    const signout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location = '/sign-in';
    };

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
                setLocker1Customer(locker1Doc.data().customer);
            } else {
                setLocker1Status('ไม่พบข้อมูล');
            }

            if (locker2Doc.exists()) {
                setLocker2Status(locker2Doc.data().service);
                setLocker2Customer(locker2Doc.data().customer);
            } else {
                setLocker2Status('ไม่พบข้อมูล');
            }
        };

        fetchLockerStatus();
    }, []);

    const getStatusStyle = (status) => {
        return status === 'available' ? { color: 'green' } : { color: 'red' };
    };

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
                        {locker1Status !== 'available' && (
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
                                            <Card.Text style={{ color: locker1Status === 'unavailable' ? 'green' : 'red' }}>
                                                {locker1Status === 'unavailable' ? (
                                                    <span>ตู้บริการมีการจองไว้</span>
                                                ) : (
                                                    `สถานะ: ${locker1Status}`
                                                )}
                                            </Card.Text>
                                            <hr/>
                                            {locker1Status === 'unavailable' && (
                                                <button className="btn btn-primary" onClick={() => navigate('/pin1')}>
                                                    ตกลง
                                                </button>
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )}
                        {/* ตู้บริการหมายเลข 2 */}
                        {locker2Status !== 'available' && (
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
                                            <Card.Text style={{ color: locker2Status === 'unavailable' ? 'green' : 'red' }}>
                                                {locker2Status === 'unavailable' ? (
                                                    <span>ตู้บริการมีการจองไว้</span>
                                                ) : (
                                                    `สถานะ: ${locker2Status}`
                                                )}
                                            </Card.Text>
                                            <hr/>
                                            {locker1Status === 'unavailable' && (
                                                <button className="btn btn-primary" onClick={() => navigate('/pin2')}>
                                                    ตกลง
                                                </button>
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Service;
