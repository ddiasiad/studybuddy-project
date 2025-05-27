import React from 'react';
import styles from '../../styles/Profile.module.css';

export default function ProfileInfo({ user }) {
    const handleEdit = () => {
        alert('Edit profile info coming soon!');
    };
    return (
        <div className={styles.profileCard}>
            <div className={styles.profilePic}></div>
            <div className={styles.profileInfo}>
                <h2>{user.name}</h2>
                <p>{user.university}</p>
                <p>{user.year}</p>
                {user.field && <p>{user.field}</p>}
                {user.availability && <p>Availability: {user.availability}</p>}
                <button className={styles.editButton} onClick={handleEdit}>Edit</button>
            </div>
        </div>
    );
}