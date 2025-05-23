import Head from 'next/head'
import Image from 'next/image'
import LoginForm from '@/components/LoginForm'
import styles from '@/styles/login.module.css'

export default function LoginPage() {
    return (
        <>
            <Head>
                <title>Login – Study Buddy</title>
            </Head>

            <main className={styles.loginLayout}>
                {/* Left side with logo */}
                <div className={styles.leftPanel}>
                    <Image
                        src="/Buddy-6.png"
                        alt="Study Buddy Logo"
                        width={300}
                        height={300}
                        className={styles.logoImage}
                    />
                </div>

                {/* Right side with floating login box */}
                <div className={styles.rightPanel}>
                    <div className={styles.floatingBox}>
                        <LoginForm />
                    </div>
                </div>
            </main>
        </>
    )
}

