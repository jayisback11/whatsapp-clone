import styled from 'styled-components'
import Head from 'next/head'
import {Button} from '@material-ui/core'

function login() {
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <LoginLogo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"/>
                <LoginButton>Sign In with google</LoginButton>
            </LoginContainer>
        </Container>
    )
}

export default login

const Container = styled.div`

`;

const LoginContainer = styled.div``;

const LoginLogo = styled.img`
    right: 0;
`;
const LoginButton = styled(Button)``;