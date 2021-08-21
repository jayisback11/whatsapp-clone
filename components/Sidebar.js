import styled from 'styled-components'
import {Avatar, IconButton, Button} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import {auth} from '../firebase'

function Sidebar() {
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
                <SearchInput placeholder="Search in chats"/>
            </SearchContainer>

            <AddChatButton>
                Add A Chat
            </AddChatButton>
        </Container>
    )
}

export default Sidebar

const Container = styled.div``
const Header = styled.div`
    display: flex;
    position: sticky;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
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