import { Avatar } from '@material-ui/core'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function Chat({id, users}) {
    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(users, user)
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)))
    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const router = useRouter()
    
    const goToChat = () => {
        router.push(`/chat/${id}`)
    }

    return (
        <Container onClick={goToChat}>
            {recipient ? (<UserAvatar src={recipient.photoURL}/>)
            : (<UserAvatar/>)
            }
            <p style={{color: 'black'}}>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
    display: flex;
    align-items: center;
    word-break: break-word;
    cursor: pointer;

    :hover {
        background-color: whitesmoke;
    }
`;
const UserAvatar = styled(Avatar)`
    margin: 10px;
`;
