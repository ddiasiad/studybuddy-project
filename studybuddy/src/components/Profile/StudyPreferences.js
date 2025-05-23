import React from 'react';
import styles from '../../styles/Profile.module.css';

export default function StudyPreferences({ preferences }) {
    return (
        <div className={styles.sectionCard}>
            <h2>Study Preferences</h2>
            <div className={styles.preferencesGrid}>
                <div className={styles.preferenceSection}>
                    <h3>Study Availability</h3>
                    {/* This would contain a time selector component */}
                </div>

                <div className={styles.preferenceSection}>
                    <h3>Study Environment</h3>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="campus"
                            checked={preferences.environment.onCampus}
                            readOnly
                        />
                        <label htmlFor="campus">On Campus</label>
                    </div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="online"
                            checked={preferences.environment.online}
                            readOnly
                        />
                        <label htmlFor="online">Online</label>
                    </div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="group"
                            checked={preferences.environment.groupSetting}
                            readOnly
                        />
                        <label htmlFor="group">Group Setting</label>
                    </div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="one-on-one"
                            checked={preferences.environment.oneOnOne}
                            readOnly
                        />
                        <label htmlFor="one-on-one">One-on-One</label>
                    </div>
                    <button className={styles.editButton}>Edit</button>
                </div>

                <div className={styles.preferenceSection}>
                    <h3>Study Interests</h3>
                    {Array.isArray(preferences?.interests) &&
                    preferences.interests.map((interest, index) => (
                        <div key={index} className={styles.interestTag}>
                        {interest}
                        </div>
                    ))}

                    <div className={styles.addMore}>
                        <span>+</span> Add more interests
                    </div>
                </div>
            </div>
        </div>
    );
}