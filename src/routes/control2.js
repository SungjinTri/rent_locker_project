import React, { useEffect } from 'react'; 
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { firebaseConfig } from './config'; // Import firebaseConfig
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

  useEffect(() => {
    // Check if user is logged in
    const token = Cookies.get('token'); // Assuming you store the token in cookies
    if (!token) {
      window.location.href = '/sign-in'; // Redirect to sign-in page if not logged in
    }
  }, []); 

  // Function to update locker status
  const updateLockerStatus = async (statusValue) => {
    try {
      const lockerRef = doc(db, "locker", "locker 2");
      await updateDoc(lockerRef, { status: statusValue });
      alert(`Locker status updated to: ${statusValue}`);
    } catch (error) {
      console.error("Error updating status: ", error);
      alert("Failed to update status.");
    }
  };

  // Logout function
  const handleLogout = () => {
    // Clear the token from localStorage and cookies
    localStorage.removeItem('token');
    Cookies.remove('token');
    navigate('/'); // Navigate to Home after logout
  };

  return (
    <div>
      <h1>Locker Control</h1>
      <button onClick={() => updateLockerStatus('on')}>ON</button>
      <button onClick={() => updateLockerStatus('off')}>OFF</button>
      <br />
      <button onClick={() => navigate('/')} style={{ marginTop: '20px', marginRight: '10px' }}>
        กลับไปหน้า Home
      </button>
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
}

export default App;
