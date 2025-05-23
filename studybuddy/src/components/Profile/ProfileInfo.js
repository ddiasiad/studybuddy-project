import React from 'react';
import styles from '../../styles/Profile.module.css';

export default function ProfileInfo({ user }) {
    return (
        <div className={styles.profileCard}>
            <div className={styles.profilePic}></div>
            <div className={styles.profileInfo}>
                <h2>{user.name}</h2>
                <p>{user.university}</p>
                <p>{user.year}</p>
                <button className={styles.editButton}>Edit</button>
            </div>
        </div>
    );
}