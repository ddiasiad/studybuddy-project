import React, { useState, useEffect } from 'react';
import styles from '../../styles/Profile.module.css';
import { saveProfile } from '../../utils/api';

export default function ProfileInfo({ user }) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        name: user.fullName || user.name || '',
        university: user.university || '',
        year: user.year || '',
        field: user.field || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Sync form state with user prop when user changes (e.g. after editing study preferences)
    useEffect(() => {
        setForm({
            name: user.fullName || user.name || '',
            university: user.university || '',
            year: user.year || '',
            field: user.field || '',
        });
    }, [user.fullName, user.name, user.university, user.year, user.field]);

    const handleEdit = () => {
        setEditing(true);
    };
    const handleCancel = () => {
        setEditing(false);
        setError('');
        setForm({
            name: user.fullName || user.name || '',
            university: user.university || '',
            year: user.year || '',
            field: user.field || '',
        });
    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSave = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            await saveProfile({
                fullName: form.name,
                university: form.university,
                year: form.year,
                field: form.field,
            }, token);
            window.location.reload(); // reload to show updated info
        } catch (err) {
            setError('Failed to save.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.profileCard}>
            <div className={styles.profilePic}></div>
            <div className={styles.profileInfo}>
                {editing ? (
                    <>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={styles.input} />
                        <input name="university" value={form.university} onChange={handleChange} placeholder="University" className={styles.input} />
                        <input name="year" value={form.year} onChange={handleChange} placeholder="Year" className={styles.input} />
                        <input name="field" value={form.field} onChange={handleChange} placeholder="Field" className={styles.input} />
                        {error && <p style={{ color: 'crimson' }}>{error}</p>}
                        <div style={{ marginTop: 10 }}>
                            <button className={styles.editButton} onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                            <button className={styles.editButton} onClick={handleCancel} disabled={loading}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>{user.fullName || user.name || ''}</h2>
                        <p>{user.university}</p>
                        <p>{user.year}</p>
                        {user.field && <p>{user.field}</p>}
                        <button className={styles.editButton} onClick={handleEdit}>Edit</button>
                    </>
                )}
            </div>
        </div>
    );
}