import React, { useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config'; // Import firebaseConfig

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function LockerManagement() {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [lockerStatus, setLockerStatus] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        const fetchLockerData = async () => {
            const lockerDoc = await getDoc(doc(db, "locker", "locker 1"));
            if (lockerDoc.exists()) {
                setLockerStatus(lockerDoc.data().service);
                setPaymentStatus(lockerDoc.data().payment);
                setTimeLeft(lockerDoc.data().countdown || 600);
            }
        };

        fetchLockerData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            } else {
                resetLocker();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const resetLocker = async () => {
        await updateDoc(doc(db, "locker", "locker 1"), {
            service: 'available',
            payment: 'no',
            countdown: 600 // Reset the countdown
        });
        setLockerStatus('available');
        setPaymentStatus('no');
        setTimeLeft(600); // Reset the timer
    };

    const isLockerInUse = lockerStatus === 'unavailable' && paymentStatus === 'paid';

    return (
        <div>
            <h1>Locker Management</h1>
            {isLockerInUse ? (
                <div>
                    <p>Locker is currently in use.</p>
                    <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</p>
                </div>
            ) : (
                <div>
                    <p>Current Status: {lockerStatus}</p>
                    <p>Payment Status: {paymentStatus}</p>
                </div>
            )}
        </div>
    );
}

export default LockerManagement;
