import styled from 'styled-components';
import {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import moment from 'moment'

function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth)

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever
    const Timestamp = user === userLoggedIn.email ? TimestampFromSender : TimestampFromReciever
    return (
        <Container>
            <TypeOfMessage>
                <Messages>{message.message}</Messages>
                <Timestamp>
                    {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
                </Timestamp>
            </TypeOfMessage>
        </Container>
    )
}

export default Message

const Container = styled.div`

`;
const Messages = styled.div`
    margin-bottom: 15px;
`;
const MessageElement = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 10px;
    border-radius: 5px;
    min-width: 60px;
    text-align: right;
    margin-bottom: 10px;
    position: relative;
`;

const Sender = styled(MessageElement)`
    background-color: #dcf8c6;
    margin-left: auto;
`;

const Reciever = styled(MessageElement)`
    background-color: whitesmoke;
    text-align: left;
`;

const Timestamps = styled.div`
    margin-top: 20px;
    color: gray;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: center;
`;

const TimestampFromSender = styled(Timestamps)`
    right: 0;
`;

const TimestampFromReciever = styled(Timestamps)`
    left: 0;
`;