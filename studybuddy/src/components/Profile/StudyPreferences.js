import React, { useState } from 'react';
import styles from '../../styles/Profile.module.css';

export default function StudyPreferences({ preferences }) {
    const [showInterestInput, setShowInterestInput] = useState(false);
    const [newInterest, setNewInterest] = useState('');
    const [interests, setInterests] = useState(Array.isArray(preferences?.interests) ? preferences.interests : []);
    const [environment, setEnvironment] = useState({
        onCampus: preferences.environment.onCampus,
        online: preferences.environment.online,
        groupSetting: preferences.environment.groupSetting,
        oneOnOne: preferences.environment.oneOnOne,
    });

    const handleEdit = () => {
        alert('Edit study preferences coming soon!');
    };

    const handleAddInterestClick = () => {
        setShowInterestInput(true);
    };

    const handleAddInterest = () => {
        const trimmed = newInterest.trim();
        if (trimmed && !interests.includes(trimmed)) {
            setInterests([...interests, trimmed]);
            setNewInterest('');
            setShowInterestInput(false);
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddInterest();
        }
    };

    const handleEnvChange = (key) => {
        setEnvironment((prev) => ({ ...prev, [key]: !prev[key] }));
    };

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
                            checked={environment.onCampus}
                            onChange={() => handleEnvChange('onCampus')}
                        />
                        <label htmlFor="campus">On Campus</label>
                    </div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="online"
                            checked={environment.online}
                            onChange={() => handleEnvChange('online')}
                        />
                        <label htmlFor="online">Online</label>
                    </div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="group"
                            checked={environment.groupSetting}
                            onChange={() => handleEnvChange('groupSetting')}
                        />
                        <label htmlFor="group">Group Setting</label>
                    </div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            id="one-on-one"
                            checked={environment.oneOnOne}
                            onChange={() => handleEnvChange('oneOnOne')}
                        />
                        <label htmlFor="one-on-one">One-on-One</label>
                    </div>
                    <button className={styles.editButton} onClick={handleEdit}>Edit</button>
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
                        {showInterestInput ? (
                            <>
                                <input
                                    type="text"
                                    value={newInterest}
                                    onChange={e => setNewInterest(e.target.value)}
                                    onKeyDown={handleInputKeyDown}
                                    placeholder="Add interest"
                                    autoFocus
                                    style={{ marginRight: 8, borderRadius: 8, padding: '4px 10px', border: '1px solid #ccc' }}
                                />
                                <button onClick={handleAddInterest} style={{ borderRadius: 8, padding: '4px 12px', background: '#5c6bc0', color: 'white', border: 'none', fontWeight: 500 }}>
                                    Add
                                </button>
                            </>
                        ) : (
                            <span style={{ cursor: 'pointer' }} onClick={handleAddInterestClick}>+ Add more interests</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}