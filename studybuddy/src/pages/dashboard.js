
import DashboardStats from "@/components/Dashboard/DashboardStats";
import StudyBuddySuggestions from "@/components/Dashboard/StudyBuddySuggestions";
import CurrentCourses from "@/components/Dashboard/CurrentCourses";
import UpcomingSessions from "@/components/Dashboard/UpcomingSessions";
import RecentMessages from "@/components/Dashboard/RecentMessages";
import styles from '@/styles/Dashboard.module.css';
import NavBar from '../components/NavBar';



export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>

            <NavBar activeLink="Home" /> {/* Use the new shared NavBar */}

            <main className={styles.mainContent}>
                <DashboardStats />
                <div className={styles.studySection}>
                    <StudyBuddySuggestions />
                    <RecentMessages />
                </div>
                <div className={styles.bottomSection}>
                    <CurrentCourses />
                    <UpcomingSessions />
                </div>
            </main>
        </div>
    );
}
