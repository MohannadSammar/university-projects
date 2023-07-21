import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Card, Form } from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth";
import { Loader } from "../Loader/Loader";
import { LoginCardContainer, HeaderContainer, CustomForm, SignUpLink, ButtonContainer } from "./styles";
import { FunctionButton } from '../FunctionButton/FunctionButton';

interface LoginCardProps {
    redirect?: string
}

export const LoginCard: React.FC<LoginCardProps> = ({
    redirect = '/'
}) => {
    const auth = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
        /*eslint-disable */
    const login = async (data: any) => {
        /*eslint-enable */
        await auth?.login(data);
    }

    useEffect(() => {
        if(!auth?.isLoginError && auth?.isLoggedIn) {
            router.push(redirect);
        }
    }, [auth])

    const Error = auth?.isLoginError 
        ?   <Alert variant="danger">
                Your credentials are not correct!
            </Alert>
        :   <></>;

    const LoginForm: React.ReactFragment = <>
        <CustomForm>
            <Form.Label>Email</Form.Label>
            <Form.Control 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email" 
                placeholder="Email"/>
        </CustomForm>
        <CustomForm>
            <Form.Label>Password</Form.Label>
            <Form.Control 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password" 
                placeholder="Password"/>
        </CustomForm>
        <ButtonContainer>
            <FunctionButton label="Login" action={() => login({email, password})}/>
            <SignUpLink onClick={() => router.push("/signup")}>
                Not a member yet? <span>Sign Up!</ span> 
            </SignUpLink>
        </ButtonContainer>
    </>

    const CardContent: React.ReactFragment = auth?.isLoading || auth?.isLoggedIn
        ? <Loader />
        : LoginForm

    return(
        <LoginCardContainer>
            <Card>
                <Card.Body>
                    <HeaderContainer>
                        <Card.Title>Login</Card.Title>
                        <hr/>
                    </HeaderContainer>
                    { Error }
                    <Card.Text>
                        { CardContent }
                    </Card.Text>
                </Card.Body>
            </Card>
        </LoginCardContainer>
        
    );
}