import styles from '@/styles/Dashboard.module.css';
import Link from "next/link";

export default function UpcomingSessions() {
    return (
        <div className={styles.sessions}>
            <h3>Upcoming Study Sessions</h3>
            <div className={styles.noSessions}>No upcoming sessions.</div>
            <button className={styles.scheduleBtn}><Link href="/messages" className={styles.linkInsideButton}>Schedule a session</Link></button>
        </div>
    );
}

