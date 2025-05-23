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
        async function fetchMatches() {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('/api/matches', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const text = await response.text();
                    console.error('Non-JSON response:', text);
                    throw new Error('Expected JSON, got HTML');
                }

                const data = await response.json();
                console.log('✅ Matched partners:', data.matches);

                if (data.matches) {
                    const formatted = data.matches.map((match, index) => ({
                        id: index + 1,
                        userId: match.userId, // ✅ for routing
                        name: match.fullName,
                        photo: match.photo,
                        courses: match.sharedCourses,
                        availability: match.sharedAvailability.join(', ')
                      }));
                      

                    // Apply filters
                    let filtered = formatted;

                    if (courseFilter !== 'All') {
                        filtered = filtered.filter(p => p.courses.includes(courseFilter));
                    }

                    if (availabilityFilter !== 'Any') {
                        filtered = filtered.filter(p => p.availability.includes(availabilityFilter));
                    }

                    if (styleFilter !== 'Any') {
                        filtered = filtered.filter(p => p.style === styleFilter);
                    }

                    setStudyPartners(filtered);
                }

            } catch (error) {
                console.error('❌ Fetch error:', error);
            }
        }

        fetchMatches();
    }, [courseFilter, availabilityFilter, styleFilter]);

    const partnersPerPage = 8;
    const totalPages = Math.ceil(studyPartners.length / partnersPerPage);

    const displayedPartners = studyPartners.slice(
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
