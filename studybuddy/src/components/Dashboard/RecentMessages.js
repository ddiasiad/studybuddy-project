import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RecentMessages() {
    const router = useRouter();
    const { partnerId } = router.query;
    const [partnerName, setPartnerName] = useState('You');

    useEffect(() => {
        async function fetchPartnerName() {
            if (!partnerId) {
                setPartnerName('Study Buddy');
                return;
            }
            try {
                const res = await fetch(`/api/buddies?id=${partnerId}`);
                const data = await res.json();
                if (data.buddy && (data.buddy.fullName || data.buddy.name)) {
                    setPartnerName(data.buddy.fullName || data.buddy.name);
                } else {
                    setPartnerName('Study Buddy');
                }
            } catch {
                setPartnerName('Study Buddy');
            }
        }
        fetchPartnerName();
    }, [partnerId]);

    return (
        <div className={styles.messages}>
            <h3>Recent Messages</h3>
            <div className={styles.messageItem}>
                <div className={styles.messageIcon}>
                    {/* User icon */}
                    <span>👤</span>
                </div>
                <div className={styles.messageContent}>
                    <div className={styles.messageHeader}>
                        <span className={styles.messageSender}>{partnerName}</span>
                        <span className={styles.timestamp}>10:34</span>
                    </div>
                    <p className={styles.messageText}>
                        Welcome to Study Buddy! Enjoy being part of the community.
                    </p>
                </div>
            </div>
        </div>
    );
}
