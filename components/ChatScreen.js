import styled from 'styled-components'
import getRecipientEmail from './../utils/getRecipientEmail';
import { Avatar, IconButton } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase'
import { useRouter } from 'next/router';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from 'react-firebase-hooks/firestore';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import firebase from 'firebase'
import {useState, useRef} from 'react'
import Message from './Message';
import TimeAgo from 'timeago-react'

function ChatScreen({messages, chat}) {
    const endOfMessageRef = useRef(null)
    const [user] = useAuthState(auth)
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(chat.users, user)))
    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const [messageSnapshot] = useCollection(
        db.collection('chats')
        .doc(router.query.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        )
    const showMessages = () => {
        if(messageSnapshot){
            return messageSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } else {
            return JSON.parse(messages).map(message => (
                <Message 
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    }

    const scrollToBottomMessage = () => {
         endOfMessageRef.current.scrollIntoView({
             behavior: 'smooth',
             block: 'start',
         })
    }

    const sendMessage = (e) => {
        e.preventDefault();

        //UPDATE USER'S LAST SEEN STATUS
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },{merge: true});

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: message,
            user: user.email,
            photoURL: user.photoURL,
        })

        setMessage('')
        scrollToBottomMessage()
    }
    
    return (
        <Container>
            <Header>
                <RecipientsAvatar src={recipient?.photoURL}/>
                <RecipientInfo>
                    <h4>{getRecipientEmail(chat.users, user)}</h4>
                    {recipientSnapshot ? (
                        <p> Last Seen: {' '}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                            ):(
                                'Unavailable'
                            )}
                        </p>
                    ):(
                        <p>
                            Loading...
                        </p>
                    )}
                    
                </RecipientInfo>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcons>
            </Header>   
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef}/>
            </MessageContainer>
            <InputContainer >
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <Input placeholder="Send a message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
                <IconButton>
                    <SendIcon hidden disabled={!message} type="submit" onClick={(e) => sendMessage(e)}/>
                </IconButton> 
                <IconButton>
                    <MicIcon/>
                </IconButton>   
                    
            </InputContainer>
        </Container>
    )
}

export default ChatScreen
const InputContainer = styled.form`
    display: flex;
    align-items: center;
    position: sticky;
    bottom: 0;
    padding: 10px;
    background-color: white;
    z-index:100;
`;
const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`;
const Container = styled.div`
`;
const RecipientsAvatar = styled(Avatar)``;
const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;
const RecipientInfo = styled.div`
    flex: 1;
    > h4, p {
        margin: 0 10px;
        font-size: 15px;
    }

    > p {
        color: gray;
    }
`;
const MessageContainer = styled.div`
    padding: 30px;
    min-height: 78vh;
    background-color: #e5ded8;
    
`;
const HeaderIcons = styled.div`
`;
const EndOfMessage= styled.div`
    margin-bottom:50px;
`;