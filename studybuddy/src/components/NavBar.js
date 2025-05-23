// components/NavBar.js
import Link from 'next/link';
import styles from '@/styles/NavBar.module.css';

export default function NavBar({ activeLink }) {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul>
                    <li className={activeLink === 'Home' ? styles.active : ''}>
                        <Link href="/dashboard">Home</Link>
                    </li>
                    <li className={activeLink === 'Study Partners' ? styles.active : ''}>
                        <Link href="/study-partners">Study Partners</Link>
                    </li>
                    <li className={activeLink === 'My Messages' ? styles.active : ''}>
                        <Link href="/messages">My Messages</Link>
                    </li>
                    <li className={activeLink === 'My Profile' ? styles.active : ''}>
                        <Link href="/profile">My Profile</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
