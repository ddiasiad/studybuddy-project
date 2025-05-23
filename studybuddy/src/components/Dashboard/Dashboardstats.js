import styles from '@/styles/Dashboard.module.css';

export default function DashboardStats() {
    const stats = [
        { label: "Course Matches", count: 0 },
        { label: "Study Requests", count: 0 },
        { label: "Upcoming Sessions", count: 0 },
        { label: "Unread Messages", count: 0 },
    ];

    return (
        <div className={styles.statsContainer}>
            {stats.map((stat, i) => (
                <div key={i} className={styles.statBox}>
                    <p>{stat.label}</p>
                    <span>{stat.count}</span>
                </div>
            ))}
        </div>
    );
}