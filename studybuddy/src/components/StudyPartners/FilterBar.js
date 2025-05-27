import React from 'react';
import styles from '../../styles/StudyPartners.module.css';

export default function FilterBar({ courseFilter, setCourseFilter, availabilityFilter, setAvailabilityFilter, styleFilter, setStyleFilter }) {
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filterItem}>
                <label>Course:</label>
                <select className={styles.filterSelect} value={courseFilter} onChange={e => setCourseFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Math">Math</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Algebra">Algebra</option>
                    <option value="Statistics">Statistics</option>
                    <option value="Programming">Programming</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Physics">Physics</option>
                </select>
            </div>

            <div className={styles.filterItem}>
                <label>Availability:</label>
                <select className={styles.filterSelect} value={availabilityFilter} onChange={e => setAvailabilityFilter(e.target.value)}>
                    <option value="Any">Any</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                </select>
            </div>

            <div className={styles.filterItem}>
                <label>Study Style:</label>
                <select className={styles.filterSelect} value={styleFilter} onChange={e => setStyleFilter(e.target.value)}>
                    <option value="Any">Any</option>
                    <option value="Group-Setting">Group-Setting</option>
                    <option value="One-to-One">One-to-One</option>
                    <option value="Online">Online</option>
                    <option value="On-Campus">On-Campus</option>
                </select>
            </div>
        </div>
    );
}