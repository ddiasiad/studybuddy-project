import styles from '@/styles/Dashboard.module.css';
import Link from 'next/link';

export default function CurrentCourses() {
    const courses = [
        { name: "CS101 - Intro to Programming", buddies: 8 },
        { name: "MATH204 - Calculus II", buddies: 6 },
        { name: "HIST101 - World History", buddies: 4 },
    ];

    return (
        <div className={styles.courses}>
            <h3>Your Current Courses</h3>
            <ul className={styles.courseList}>
                {courses.map((course, i) => (
                    <li key={i} className={styles.courseItem}>
                        <span className={styles.courseTitle}>{course.name}</span>
                        <span className={styles.buddyCount}>{course.buddies} potential buddies</span>
                    </li>
                ))}
            </ul>
            <button className={styles.viewAllBtn}>
                <Link href="/profile" className={styles.linkInsideButton}>View All</Link>
            </button>
        </div>
    );
}