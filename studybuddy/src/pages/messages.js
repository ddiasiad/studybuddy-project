import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MessageList from '@/components/Messages/MessageList';
import ChatWindow from '@/components/Messages/ChatWindows';
import styles from '@/styles/Messages.module.css';
import NavBar from '../components/NavBar';

export default function MessagesPage() {
    const router = useRouter();
    const { partnerId } = router.query;

    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (partnerId) {
            setSelectedChat({ id: partnerId });
        }
    }, [partnerId]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!partnerId || !token) return;

        async function fetchMessages() {
            try {
                const res = await fetch(`/api/messages?partnerId=${partnerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                setMessages(data.messages || []);
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        }

        fetchMessages();
    }, [partnerId]);

    return (
        <>
            <Head>
                <title>My Messages – Study Buddy</title>
            </Head>
            <div className={styles.messagesContainer}>
                <NavBar activeLink="My Messages" />
                <main className={styles.mainContent}>
                    <div className={styles.messagesWrapper}>
                        <MessageList
                            messages={messages}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                        />
                        <ChatWindow selectedChat={selectedChat} />
                    </div>
                </main>
            </div>
        </>
    );
}
