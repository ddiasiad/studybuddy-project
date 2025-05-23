import styles from '@/styles/Dashboard.module.css';

export default function StudyBuddySuggestions() {
    const buddies = [
        { name: "Jane W.", courses: "CS101, MATH204", availability: "Mon, Wed PM" },
        { name: "Arya S.", courses: "CS101, PHYS203", availability: "Tue, Thu AM" },
        { name: "Lisa G.", courses: "MATH204, HIST101", availability: "Weekends" },
    ];

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
                            <div className={styles.avatar}>
                                {/* User silhouette placeholder */}
                            </div>
                            <h3>{buddy.name}</h3>
                            <p className={styles.buddyCourses}>{buddy.courses}</p>
                            <p className={styles.buddyAvailability}>Available: {buddy.availability}</p>
                            <button className={styles.connectBtn}>Connect</button>
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