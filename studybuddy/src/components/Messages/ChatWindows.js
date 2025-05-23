import { useEffect, useState, useRef } from 'react';
import styles from '@/styles/Messages.module.css';

export default function ChatWindow({ selectedChat }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [sentRequest, setSentRequest] = useState(false);
  const [sessionRequest, setSessionRequest] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat?.id) return;
      const token = localStorage.getItem('token');

      try {
        const res = await fetch(`/api/messages?partnerId=${selectedChat.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
          console.log('✅ Loaded messages:', data.messages);
          setMessages(data.messages);
        } else {
          console.error('❌ Message fetch error:', data.message);
        }
      } catch (err) {
        console.error('❌ Network error:', err);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          recipientId: selectedChat.id,
          text: message
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: data.insertedId,
            fromSelf: true,
            text: message,
            timestamp: new Date().toISOString()
          }
        ]);
        setMessage('');
      } else {
        console.error('❌ Failed to send message:', data.message);
      }
    } catch (err) {
      console.error('❌ Send message network error:', err);
    }
  };

  const handleScheduleClick = () => {
    setShowScheduleForm(!showScheduleForm);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!scheduleDate || !scheduleTime || !selectedChat?.id) return;
  
    const token = localStorage.getItem('token');
  
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          recipientId: selectedChat.id,
          date: scheduleDate,
          time: scheduleTime
        })
      });
  
      const data = await res.json();
      console.log('📦 Full session creation response:', data); // ← ADD THIS
  
      setSessionRequest({
        _id: data.insertedId,
        date: scheduleDate,
        time: scheduleTime,
        status: 'pending',
      });
  
      if (!res.ok) {
        console.error('❌ Schedule failed:', data.message);
        return;
      }
  
      console.log('✅ Session saved to DB');
      setShowScheduleForm(false);
      setSentRequest(true);
  
    } catch (err) {
      console.error('❌ Network error:', err);
    }
  };
  
  

  const updateSessionStatus = async (sessionId, status) => {
    const token = localStorage.getItem('token');
  
    console.log('📤 Sending update request with:', { sessionId, status });
  
    try {
      const res = await fetch('/api/sessions/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionId,
          newStatus: status
        })
      });
  
      const text = await res.text(); // get raw response
      console.log('🔁 Raw response:', text);
  
      if (!res.ok) {
        console.error(`❌ Error ${res.status} updating session:`, text);
        return;
      }
  
      console.log(`✅ Session updated to ${status}`);
      setSentRequest(false);
  
    } catch (err) {
      console.error('❌ Network or parsing error:', err);
    }
  };
  

  const handleAcceptSession = () => {
    if (sessionRequest && sessionRequest._id) {
      console.log("✅ Accept button clicked");
      updateSessionStatus(sessionRequest._id.toString(), 'accepted');
    } else {
      console.log("⚠️ sessionRequest._id missing");
    }
  };
  
  const handleDeclineSession = () => {
    if (sessionRequest && sessionRequest._id) {
      console.log("❌ Decline button clicked");
      updateSessionStatus(sessionRequest._id.toString(), 'declined');
    } else {
      console.log("⚠️ sessionRequest._id missing");
    }
  };
  

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateString;
  };

  return (
    <div className={styles.chatWindow}>
      {selectedChat ? (
        <>
          <div className={styles.chatHeader}>
            <div className={styles.chatAvatar}></div>
            <h3>{selectedChat.name || 'Study Buddy'}</h3>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => {
              const isSent = msg.fromSelf;
              return (
                <div
                  key={idx}
                  className={`${isSent ? styles.messageSent : styles.messageReceived} ${styles.message}`}
                >
                  {!isSent && <div className={styles.messageAvatar}></div>}
                  <div className={styles.messageContent}>
                    <p>{msg.text}</p>
                    <span className={styles.timestamp}>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {isSent && <div className={styles.messageAvatar}></div>}
                </div>
              );
            })}

            <div ref={bottomRef} />

            {showScheduleForm && (
              <div className={`${styles.messageSent} ${styles.message}`}>
                <div className={styles.scheduleForm}>
                  <h4>Schedule a session</h4>
                  <div className={styles.formGroup}>
                    <label>
                      <span>Date:</span>
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className={styles.formGroup}>
                    <label>
                      <span>Time:</span>
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </label>
                  </div>
                  <button className={styles.sendButton} onClick={handleScheduleSubmit}>
                    SEND
                  </button>
                </div>
                <div className={styles.messageAvatar}></div>
              </div>
            )}

            {sentRequest && (
              <div className={`${styles.messageReceived} ${styles.message}`}>
                <div className={styles.messageAvatar}></div>
                <div className={styles.sessionRequest}>
                  <h4>Session Request</h4>
                  <div className={styles.sessionDetails}>
                    <div className={styles.detail}>
                      <span>Date:</span> {formatDate(scheduleDate)}
                    </div>
                    <div className={styles.detail}>
                      <span>Time:</span> {scheduleTime}
                    </div>
                  </div>
                  <div className={styles.sessionActions}>
                  <div className={styles.sessionRequest}>
    <button
      className={styles.acceptButton}
      onClick={() => {
        console.log('✅ Accept button clicked');
        handleAcceptSession();
      }}
    >
      Accept
    </button>
    <button
      className={styles.declineButton}
      onClick={() => {
        console.log('❌ Decline button clicked');
        handleDeclineSession();
      }}
    >
      Decline
    </button>
  </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className={styles.messageForm} onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
            />
            <button type="button" className={styles.sendIcon} onClick={handleScheduleClick}>
              +
            </button>
          </form>
        </>
      ) : (
        <div className={styles.emptyChatState}>
          <h2>Your messages</h2>
          <p>Click on a chat to start messaging.</p>
        </div>
      )}
    </div>
  );
}