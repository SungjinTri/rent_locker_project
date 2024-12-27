import React, { useState, useEffect } from 'react'; 
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config'; // นำเข้า firebaseConfig
import './css_pay.css'; // ใส่สไตล์ที่คุณต้องการ
import { getAuth } from "firebase/auth"; // นำเข้า Firebase Authentication

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth

function QRCodePayment() {
    const [timeLeft, setTimeLeft] = useState(600); // 10 นาที (600 วินาที)
    const [payment, setPayment] = useState('กำลังตรวจสอบ...');
    const [pin, setPin] = useState(null); // สำหรับเก็บ PIN ที่สร้างขึ้น
    const [showPin, setShowPin] = useState(false); // สำหรับควบคุมการแสดง PIN

    // ฟังก์ชันเพื่อสร้าง PIN 4 หลัก
    const generatePin = () => {
        return (Math.floor(1000 + Math.random() * 9000)).toString(); // สุ่ม PIN 4 หลักและแปลงเป็น string
    };

    // ฟังก์ชันเช็คสถานะการจ่ายเงินใน Firestore
    useEffect(() => {
        const fetchPaymentStatus = async () => {
            try {
                const paymentDoc = await getDoc(doc(db, "locker", "locker 2"));

                if (paymentDoc.exists()) {
                    const paymentStatus = paymentDoc.data().payment;
                    setPayment(paymentStatus);

                    // เช็คสถานะการจ่ายเงิน
                    if (paymentStatus === 'paid') {
                        const user = auth.currentUser; 
                        if (user) {
                            const uid = user.uid;
                            const generatedPin = generatePin();
                            setPin(generatedPin); // ตั้งค่า PIN ที่สร้างขึ้น
                            setShowPin(true); // แสดงปุ่มตกลง

                            // Store the UID and PIN in Firestore
                            await setDoc(doc(db, "locker", "locker 2"), { 
                                service: 'unavailable', 
                                customer: uid, 
                                pin: generatedPin 
                            }, { merge: true });
                        }
                    } else if (paymentStatus === 'no') {
                        // เช็คเวลาถอยหลัง
                        if (timeLeft <= 0) {
                            alert('การจ่ายเงินล้มเหลว');
                            window.location.href = '/'; // กลับไปหน้า main
                        }
                    }
                } else {
                    setPayment('ไม่พบข้อมูลการชำระเงิน');
                }
            } catch (error) {
                console.error('Error fetching payment status:', error);
                setPayment('เกิดข้อผิดพลาดในการดึงข้อมูล');
            }
        };

        fetchPaymentStatus();
    }, [timeLeft]); // ขึ้นอยู่กับ timeLeft

    // ฟังก์ชันนับเวลาถอยหลัง
    useEffect(() => {
        let intervalId;

        if (payment !== 'paid' && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId); // เคลียร์การนับเวลาเมื่อ unmount หรือสถานะเปลี่ยน
    }, [timeLeft, payment]);

    // ฟังก์ชันแปลงเวลาถอยหลังเป็นรูปแบบนาทีและวินาที
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // ฟังก์ชันจัดการการกดปุ่มตกลง
    const handleConfirm = () => {
        window.location.href = '/control2'; // ไปที่หน้า home
    };

    return (
        <div className="qr-container">
            <h1>QR Code สำหรับการชำระเงิน</h1>
            <img src="/QR/qr2.jpg" alt="QR Code" className="qr-image" />
            <div className="countdown">
                <h2>เวลาที่เหลือ: {formatTime(timeLeft)}</h2>
            </div>
            <p>สถานะการชำระเงิน: {payment}</p>
            {showPin && (
                <div>
                    <p>PIN ของคุณ: {pin}</p>
                    <button onClick={handleConfirm}>ตกลง</button> {/* ปุ่มตกลง */}
                </div>
            )}
        </div>
    );
}

export default QRCodePayment;
