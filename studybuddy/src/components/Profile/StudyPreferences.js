import React, { useState } from 'react';
import styles from '../../styles/Profile.module.css';
import { saveProfile } from '../../utils/api';

export default function StudyPreferences({ preferences }) {
    const [editingEnv, setEditingEnv] = useState(false);
    const [editingAvail, setEditingAvail] = useState(false);
    const [availability, setAvailability] = useState(preferences.availability || '');
    const [environment, setEnvironment] = useState({
        onCampus: preferences.environment.onCampus,
        online: preferences.environment.online,
        groupSetting: preferences.environment.groupSetting,
        oneOnOne: preferences.environment.oneOnOne,
    });
    const [interests, setInterests] = useState(Array.isArray(preferences?.interests) ? preferences.interests : []);
    const [showInterestInput, setShowInterestInput] = useState(false);
    const [newInterest, setNewInterest] = useState('');
    const [loadingEnv, setLoadingEnv] = useState(false);
    const [loadingAvail, setLoadingAvail] = useState(false);
    const [errorEnv, setErrorEnv] = useState('');
    const [errorAvail, setErrorAvail] = useState('');

    // --- Availability ---
    const handleEditAvail = () => {
        alert('Editing availability will be introduced in a future update.');
    };
    // --- Environment ---
    const handleEditEnv = () => {
        alert('Editing study environment will be introduced in a future update.');
    };
    // --- Interests (UI only) ---
    const handleAddInterestClick = () => setShowInterestInput(true);
    const handleAddInterest = () => {
        alert('Editing interests will be introduced in a future update.');
        setShowInterestInput(false);
        setNewInterest('');
    };
    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddInterest();
        }
    };

    return (
        <div className={styles.sectionCard}>
            <h2>Study Preferences</h2>
            <div className={styles.preferencesGrid}>
                <div className={styles.preferenceSection}>
                    <h3>Study Availability</h3>
                    <>
                        <p>{availability}</p>
                        <button className={styles.editButton} onClick={handleEditAvail}>Edit</button>
                    </>
                </div>
                <div className={styles.preferenceSection}>
                    <h3>Study Environment</h3>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="campus"
                            checked={environment.onCampus}
                            disabled={true}
                        />
                        <label htmlFor="campus">On Campus</label>
                    </div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="online"
                            checked={environment.online}
                            disabled={true}
                        />
                        <label htmlFor="online">Online</label>
                    </div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="group"
                            checked={environment.groupSetting}
                            disabled={true}
                        />
                        <label htmlFor="group">Group Setting</label>
                    </div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="one-on-one"
                            checked={environment.oneOnOne}
                            disabled={true}
                        />
                        <label htmlFor="one-on-one">One-on-One</label>
                    </div>
                    <button className={styles.editButton} onClick={handleEditEnv}>Edit</button>
                </div>
                <div className={styles.preferenceSection}>
                    <h3>Study Interests</h3>
                    {Array.isArray(interests) &&
                        interests.map((interest, index) => (
                            <div key={index} className={styles.interestTag}>
                                {interest}
                            </div>
                        ))}
                    <div className={styles.addMore}>
                        <span style={{ cursor: 'pointer' }} onClick={() => alert('Adding more interests will be introduced in a future update.')}>+ Add more interests</span>
                    </div>
                </div>
            </div>
        </div>
    );
}