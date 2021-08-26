import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import { auth, db } from '../firebase'
import * as EmailValidator from 'email-validator'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'
import {useState} from 'react'

function Sidebar() {
    const [user] = useAuthState(auth)
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatSnapshot] = useCollection(userChatRef)
    const [searchInput, setSearchInput] = useState('')

    const createChat = () => {
        const input = prompt("Please enter the user's email address.")

        if(!input) return null

        if(EmailValidator.validate(input) && (input !== user.email) && !chatAlreadyExist(input)){
            db.collection('chats').add({
                users: [user.email, input]
            })
        }

    }

    const chatAlreadyExist = (input) => !!chatSnapshot?.docs.find(chat => chat.data().users.find(user => user === input)?.length > 0)
    
    return (
        <Container>
            <Header>
                <UserIcon onClick={() => auth.signOut()} src={auth.currentUser.photoURL}/>
                <IconsContainer>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </IconsContainer>
            </Header>

            <SearchContainer>
                <SearchIcon/>
                <SearchInput placeholder="Search in chats" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            </SearchContainer>

            <AddChatButton onClick={() => createChat()}>
                Add A Chat
            </AddChatButton>
            {chatSnapshot?.docs.map(chat => (
                    <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
                ))}
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke solid;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none
    }

    -ms-overflow-style: none; //for IE and EDGE
    scrollbar-width: none; // for firefox
`
const Header = styled.div`
    display: flex;
    position: sticky;
    align-items: center;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    padding: 10px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserIcon = styled(Avatar)`
    cursor: pointer;s
    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
`;

const SearchInput = styled.input`
    flex: 1;
    outline: none;
    border: none;
`;

const AddChatButton = styled(Button)`
    width: 100%;

    &&& {
        border-bottom: 1px solid whitesmoke;
        border-top: 1px solid whitesmoke;
    }
`