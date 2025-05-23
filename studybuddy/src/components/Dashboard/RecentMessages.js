import styles from '@/styles/Dashboard.module.css';

export default function RecentMessages() {
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
                        <span className={styles.messageSender}>Study Buddy</span>
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
