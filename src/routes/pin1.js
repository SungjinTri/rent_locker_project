import React, { useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config'; // Import firebaseConfig
import { useNavigate } from 'react-router-dom'; // For navigation
import './styles_pin.css'; // Optional: For styling

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function PinEntry() {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePinChange = (event) => {
        setPin(event.target.value);
        setError(''); // Reset error on input change
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (pin.length !== 4) {
            setError('กรุณากรอกรหัส PIN 4 หลัก');
            return;
        }

        try {
            const lockerDoc = await getDoc(doc(db, "locker", "locker 1"));
            if (lockerDoc.exists()) {
                const storedPin = lockerDoc.data().pin; // Assume the pin is stored here
                if (pin === storedPin) {
                    navigate('/control1'); // Redirect to home page if PIN is correct
                } else {
                    setError('รหัสผิดพลาด');
                }
            } else {
                setError('ไม่พบข้อมูลตู้');
            }
        } catch (error) {
            console.error("Error fetching PIN:", error);
            setError('เกิดข้อผิดพลาดในการตรวจสอบรหัส');
        }
    };

    return (
        <div className="container text-center">
            <h1>กรุณากรอกรหัส PIN</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={pin}
                    onChange={handlePinChange}
                    maxLength="4"
                    placeholder="PIN 4 หลัก"
                    className="pin-input"
                    required
                />
                <button type="submit" className="btn btn-primary">ยืนยัน</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default PinEntry;
