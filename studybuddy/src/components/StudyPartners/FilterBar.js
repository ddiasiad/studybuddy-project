import React from 'react';
import styles from '../../styles/StudyPartners.module.css';

export default function FilterBar({ filters, setFilters }) {
    // If you don't need state, you can remove the props
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filterItem}>
                <label>Course:</label>
                <select className={styles.filterSelect}>
                    <option>All</option>
                    <option>CS101</option>
                    <option>MATH204</option>
                    <option>HIST101</option>
                </select>
            </div>

            <div className={styles.filterItem}>
                <label>Availability:</label>
                <select className={styles.filterSelect}>
                    <option>Any</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                </select>
            </div>

            <div className={styles.filterItem}>
                <label>Study Style:</label>
                <select className={styles.filterSelect}>
                    <option>Any</option>
                    <option>Group</option>
                    <option>One-on-One</option>
                    <option>Online</option>
                    <option>On Campus</option>
                </select>
            </div>
        </div>
    );
}