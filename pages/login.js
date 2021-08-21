import styled from 'styled-components'
import Head from 'next/head'
import {Button} from '@material-ui/core'
import {auth, provider} from '../firebase'

function login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <LoginLogo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"/>
                <LoginButton onClick={signIn}>Sign In with google</LoginButton>
            </LoginContainer>
        </Container>
    )
}

export default login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid whitesmoke;
    background-color: white;
    padding: 30px;
    box-shadow: 2px 2px 2px 2px gray;

`;

const LoginLogo = styled.img`
    width: 300px;
`;

const LoginButton = styled(Button)`
    &&& {
        margin-top: 30px;
        font-size: 16px;

        :hover {
            background-color: green;
            color: white;
        }
    }
`;