import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
      <>
        <Head>
          <title>Study Buddy</title>
          <meta name="description" content="Welcome to Study Buddy" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <main
            className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
        >
          <div className={styles.main}>
            <h1>Welcome to Study Buddy </h1>
            <p>Find your perfect study match and collaborate better!</p>
            <div className={styles.ctas}>
              <Link href="/register" className={styles.primary}>
                Register
              </Link>
              <Link href="/login" className={styles.secondary}>
                Login
              </Link>
            </div>
          </div>
        </main>
      </>
  );
}
