import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: ''
    });

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        setProfile(result.user);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await fetch('http://localhost:3000/api/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profile)
        });

        console.log('Profile updated successfully');
    };

    return (
        <form onSubmit={handleUpdateProfile}>
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={profile.name} 
                onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
                required 
            />
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={profile.email} 
                onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
                required 
            />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default Profile;
