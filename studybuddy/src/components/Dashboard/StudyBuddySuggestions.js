import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Dashboard.module.css';

export default function StudyBuddySuggestions() {
    const [buddies, setBuddies] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchBuddies() {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/buddies');
                const data = await res.json();
                let userId = null;
                if (token) {
                    // Decode JWT to get userId (works for unsigned JWTs, for signed use a library)
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        userId = payload.userId;
                    } catch {}
                }
                // Exclude current user from suggestions
                const filtered = (data.buddies || []).filter(buddy => buddy._id !== userId);
                setBuddies(filtered);
            } catch (err) {
                setBuddies([]);
            }
        }
        fetchBuddies();
    }, []);

    const handleConnect = (buddy) => {
        // Use _id for navigation if available, fallback to email
        const id = buddy._id || buddy.email;
        router.push(`/messages?partnerId=${id}`);
    };

    return (
        <div className={styles.studyTogether}>
            <h2>Study Together</h2>
            <p>Add the suggested study buddies that best match your profile.</p>
            <div className={styles.buddyCardsContainer}>
                <div className={styles.carouselNavigation}>
                    <button className={styles.navButton}>
                        <span>‹</span>
                    </button>
                </div>
                <div className={styles.buddyCards}>
                    {buddies.map((buddy, i) => (
                        <div key={i} className={styles.buddyCard}>
                            <div className={styles.avatar}></div>
                            <h3>{buddy.fullName || buddy.name}</h3>
                            <p className={styles.buddyCourses}>{buddy.courses}</p>
                            <p className={styles.buddyAvailability}>Available: {buddy.environment}</p>
                            <button className={styles.connectBtn} onClick={() => handleConnect(buddy)}>
                                Connect
                            </button>
                        </div>
                    ))}
                </div>
                <div className={`${styles.carouselNavigation} ${styles.rightNav}`}>
                    <button className={styles.navButton}>
                        <span>›</span>
                    </button>
                </div>
            </div>
        </div>
    );
}