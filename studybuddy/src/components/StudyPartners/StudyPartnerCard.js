import React from 'react';
import { useRouter } from 'next/router'; // ✅ Step 1: import router
import styles from '../../styles/StudyPartners.module.css';

export default function StudyPartnerCard({ partner }) {
    const router = useRouter(); // ✅ Step 2: init router

    // ✅ Step 3: handle connect click
    const handleConnect = () => {
        router.push(`/messages?partnerId=${partner.userId}`);
    };

    return (
        <div className={styles.partnerCard}>
            <div className={styles.profilePicWrapper}>
                {partner.photo ? (
                    <img
                        src={partner.photo}
                        alt={`${partner.name}'s profile`}
                        className={styles.profilePic}
                    />
                ) : (
                    <div className={styles.defaultPic} />
                )}
            </div>

            <h3 className={styles.partnerName}>{partner.name}</h3>
            <p className={styles.partnerCourses}>{partner.courses.join(', ')}</p>
            <p className={styles.partnerAvailability}>Available: {partner.availability}</p>

            <button className={styles.connectButton} onClick={handleConnect}>
                Connect
            </button>
        </div>
    );
}
