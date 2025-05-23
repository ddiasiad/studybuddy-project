// src/components/Messages/MessageList.js
import styles from '@/styles/Messages.module.css';

export default function MessageList({ messages, selectedChat, setSelectedChat }) {
    return (
        <div className={styles.messageList}>
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`${styles.messagePreview} ${selectedChat === message.id ? styles.selected : ''} ${message.unread ? styles.unread : ''}`}
                    onClick={() => setSelectedChat(message.id)}
                >
                    <div className={styles.avatarContainer}>
                        <div className={styles.avatar}></div>
                    </div>
                    <div className={styles.previewContent}>
                        <div className={styles.previewHeader}>
                            <h3>{message.sender}</h3>
                            <span className={styles.timestamp}>{message.timestamp}</span>
                        </div>
                        <p className={styles.previewText}>{message.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}