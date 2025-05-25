import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import StudyPartnerCard from '../components/StudyPartners/StudyPartnerCard';
import FilterBar from '../components/StudyPartners/FilterBar';
import Pagination from '../components/StudyPartners/Pagination';
import styles from '../styles/StudyPartners.module.css';

export default function StudyPartners() {
    const [currentPage, setCurrentPage] = useState(1);
    const [studyPartners, setStudyPartners] = useState([]);

    const [courseFilter, setCourseFilter] = useState('All');
    const [availabilityFilter, setAvailabilityFilter] = useState('Any');
    const [styleFilter, setStyleFilter] = useState('Any');

    useEffect(() => {
        async function fetchPartners() {
            try {
                const res = await fetch('/api/buddies');
                const data = await res.json();
                if (data.buddies) {
                    // Map users to partner card format
                    const formatted = data.buddies.map((user, index) => ({
                        id: user._id,
                        userId: user._id,
                        name: user.fullName || user.name || 'Unknown',
                        photo: user.photo || null,
                        courses: Array.isArray(user.courses) ? user.courses : (user.courses ? user.courses.split(',').map(c => c.trim()) : []),
                        availability: user.availability || '',
                        environment: user.environment || user.studyEnvironment || '',
                    }));
                    // Optionally filter out current user
                    let userId = null;
                    const token = localStorage.getItem('token');
                    if (token) {
                        try {
                            const payload = JSON.parse(atob(token.split('.')[1]));
                            userId = payload.userId;
                        } catch {}
                    }
                    const filtered = formatted.filter(p => p.userId !== userId);
                    setStudyPartners(filtered);
                }
            } catch (err) {
                setStudyPartners([]);
            }
        }
        fetchPartners();
    }, []);

    // Filtering logic
    const filteredPartners = studyPartners.filter(partner => {
        // Course filter
        const courseMatch = courseFilter === 'All' || partner.courses.includes(courseFilter);
        // Availability filter (case-insensitive substring match)
        const availMatch = availabilityFilter === 'Any' || (partner.availability && partner.availability.toLowerCase().includes(availabilityFilter.toLowerCase()));
        // Style filter (case-insensitive substring match, matches environment field)
        const styleMatch = styleFilter === 'Any' || (partner.environment && partner.environment.toLowerCase().includes(styleFilter.toLowerCase()));
        return courseMatch && availMatch && styleMatch;
    });

    const partnersPerPage = 8;
    const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);

    const displayedPartners = filteredPartners.slice(
        (currentPage - 1) * partnersPerPage,
        currentPage * partnersPerPage
    );

    return (
        <div className={styles.container}>
            <Head>
                <title>Study Partners | StudyBuddy</title>
                <meta name="description" content="Find study partners for your courses" />
            </Head>

            <NavBar activeLink="Study Partners" />

            <main className={styles.main}>
                <FilterBar
                    courseFilter={courseFilter}
                    setCourseFilter={setCourseFilter}
                    availabilityFilter={availabilityFilter}
                    setAvailabilityFilter={setAvailabilityFilter}
                    styleFilter={styleFilter}
                    setStyleFilter={setStyleFilter}
                />

                <div className={styles.partnersGrid}>
                    {displayedPartners.map(partner => (
                        <StudyPartnerCard key={partner.id} partner={partner} />
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </main>
        </div>
    );
}
