import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Card, Form } from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth";
import { FunctionButton } from "../FunctionButton/FunctionButton";
import { Loader } from "../Loader/Loader";
import { SignUpCardContainer, HeaderContainer, CustomForm, ButtonContainer, LoginLink } from "./styles";

interface SignUpCardProps {
    redirect?: string
}

export const SignUpCard: React.FC<SignUpCardProps> = ({
    redirect = '/'
}) => {
    const auth = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [name, setName] = useState("")
    const router = useRouter();

    const signup = async () => {
        await auth?.signup({
            email,
            name,
            password,
            passwordConfirm
        });
    }

    useEffect(() => {
        if(!auth?.isSignUpError && auth?.isLoggedIn) {
            router.push(redirect);
        }
    }, [auth])

    const Error = auth?.isSignUpError 
        ?   <Alert variant="danger">
                Please Check your data, they are not correct!
            </Alert>
        :   <></>;

    const SignUpForm: React.ReactFragment = <>
        <CustomForm>
            <Form.Label>Email</Form.Label>
            <Form.Control 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text" 
                placeholder="Email"/>
        </CustomForm>
        <CustomForm>
            <Form.Label>Name</Form.Label>
            <Form.Control 
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text" 
                placeholder="Name"/>
        </CustomForm>
        <CustomForm>
            <Form.Label>Password</Form.Label>
            <Form.Control 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password" 
                placeholder="Password"/>
        </CustomForm>
        <CustomForm>
            <Form.Label>Password Confirm</Form.Label>
            <Form.Control 
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
                type="password" 
                placeholder="Password Confirm"/>
        </CustomForm>
        <ButtonContainer>
            <FunctionButton label="Sign Up" action={signup}/>
            <LoginLink onClick={() => router.push("/login")}>
                Do you already have an account? <span>Sing In!</span>
            </LoginLink>
        </ButtonContainer>
    </>;

    const CardContent: React.ReactFragment = auth?.isLoading
        ? <Loader />
        : SignUpForm
        

    return(
        <SignUpCardContainer>
            <Card>
                <Card.Body>
                    <HeaderContainer>
                        <Card.Title>Sign Up</Card.Title>
                        <hr/>
                    </HeaderContainer>
                    { Error }
                    <Card.Text>
                        { CardContent }
                    </Card.Text>
                </Card.Body>
            </Card>
        </SignUpCardContainer>
        
    );
}