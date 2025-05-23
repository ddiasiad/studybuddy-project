import React from 'react';
import styles from '../../styles/Profile.module.css';

export default function MyBuddies({ buddies = [] }) {
    return (
        <div className={styles.sectionCard}>
            <h2>My Buddies</h2>
            {buddies.length > 0 ? (
                <div className={styles.buddiesList}>
                    {/* Render buddies here when you have them */}
                </div>
            ) : (
                <div className={styles.noBuddies}>
                    No buddies yet.
                </div>
            )}
        </div>
    );
}