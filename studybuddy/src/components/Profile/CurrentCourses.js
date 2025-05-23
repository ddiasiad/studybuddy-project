import React from 'react';
import styles from '../../styles/Profile.module.css';

export default function CurrentCourses({ courses }) {
    return (
        <div className={styles.sectionCard}>
            <h3>Current Courses</h3>
            <div className={styles.coursesList}>
                {courses.map((course, index) => (
                    <div key={index} className={styles.courseTag}>
                        {course}
                    </div>
                ))}
            </div>
            <div className={styles.addMore}>
                <span>+</span> Add more courses
            </div>
        </div>
    );
}