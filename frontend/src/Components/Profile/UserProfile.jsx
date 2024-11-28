// UserProfile.js
import React, { useState } from 'react';
import './UserProfile.css';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
function UserProfile({ userProps }) {
    const [Name, setName] = useState(userProps?.name || '');
     const [email, setEmail] = useState(userProps.email || '');
    const [phonenumber, setphoneNumber] = useState(userProps.phonenumber || '');
     const [address, setAddress] = useState(userProps.address || '');
    const [password, setpassword] = useState(userProps.password || '');
    // const [zipCode, setZipCode] = useState(userProps.zipCode || '');
    const [isSaving, setIsSaving] = useState(false);
    let formattedDate = '';
    try {
        const date = new Date(userProps?.date_added || Date.now());
        formattedDate = format(date, "PPpp", { locale: vi });
    } catch (error) {
        console.error("Error formatting date:", error);
    }


    // console.log('â', userProps);
    const handleUpdateProfile = () => {
        setIsSaving(true);
        // Simulate an API call
        setTimeout(() => {
            setIsSaving(false);
            alert('Profile updated successfully!');
        }, 2000);
    };

    return (
        <div className="profile-container">
            <div className="sidebar">
                <h2>User profile management</h2>
                <ul>
                    <li className="active">Personal Info</li>
                    <li>Emails & Password</li>
                    <li>Notifications</li>
                    <li>Businesses</li>
                    <li>Integration</li>
                </ul>
            </div>
            <div className="main-content">
                <header>
                    <h2>Personal information</h2>
                    <div className="actions">
                        <button onClick={handleUpdateProfile}>Update Profile</button>
                        {isSaving && <span className="status">Saving changes...</span>}
                    </div>
                </header>

                <div className="profile-picture">
                    <img src="Assets/logo.png" alt="Profile" />
                </div>

                <form className="info-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text"
                            value={Name}
                            // onChange={
                            //     (e) => setFirstName(e.target.value)
                            // }

                            />

                    </div>
                    <div className="form-group">
                        <label>Account Date</label>
                        <input type="text" value={formattedDate} />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="text" value={email} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>


                        <input type="text" value={phonenumber} />

                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="Address" value={address} />
                    </div>
                    <div className="form-group">
                        <label>PassWord</label>
                        <input type="Password" value={password} />
                    </div>


                </form>

                <div className="delete-account">
                    <h3>Delete Account</h3>
                    <p>After making a deletion request, you will have <strong>6 months</strong> to maintain this account.</p>
                    <p>To permanently erase your whole ProAcc account, click the button below. This implies that you won't have access to your enterprises, accounting, and personal financial data.</p>
                    <button>Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;