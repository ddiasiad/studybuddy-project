import React from 'react';
import styles from '../../styles/StudyPartners.module.css';

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
    return (
        <div className={styles.pagination}>
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={styles.paginationButton}
            >
                &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${styles.paginationButton} ${currentPage === page ? styles.activePage : ''}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
            >
                &gt;
            </button>
        </div>
    );
}