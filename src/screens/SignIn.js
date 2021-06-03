import React ,{useState, useContext} from 'react'
import styled from 'styled-components';
import Text from '../components/Text.js';

import {FirebaseContext} from '../config/FirebaseContext.js';
import {UserContext} from '../context/UserContext.js';

export default function SignIn({navigation}) {
    const[email, setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const signIn = async () =>{
        setLoading(true)
        try{
            await firebase.signIn(email,password)

            const uid = firebase.getCurrentUser().uid;

            const userInfo = await firebase.getUserInfo(uid);

            setUser({
                ownerName: userInfo.ownerName,
                email: userInfo.email,
                petname: userInfo.petname,
                uid,
                profilePhotoUrl: userInfo.profilePhotoUrl,
                bio: userInfo.bio,
                treat: userInfo.treat,
                activity: userInfo.activity,
                isLoggedIn: true
            })

        }catch(error){
            alert(error.message)
        } finally{
            setLoading(false)
        }
    };

    return (
        <Container>
            <Main>
                <Text title semi center>Welcome back</Text>
            </Main>
            <Auth>
                <AuthContainer>
                <AuthTitle> Email Address</AuthTitle>
                <AuthField 
                   autoCapitalize="none" 
                    autoCompleteType="email" 
                    autoCorrect={false} 
                    autoFocus={true}
                    keyboardType ="email-address"
                    onChangeText = {email => setEmail(email)}
                    value={email}
                    />
                </AuthContainer>

                <AuthContainer>
                <AuthTitle> Password</AuthTitle>
                <AuthField 
                   autoCapitalize="none" 
                    autoCompleteType="password" 
                    autoCorrect={false} 
                    autoFocus={true}
                    secureTextEntry={true}
                    onChangeText= { password => setPassword(password)}
                    value ={password}
                    />
                </AuthContainer>
            </Auth>

            <SignInContainer onPress={signIn} disabled={loading}>
                {loading? (
                        <Loading/>
                ):(
                    <Text bold ceneter color="#ffffff">
                        Sign In</Text>
                )}     
            </SignInContainer>

            <SignUp onPress={()=> navigation.navigate("SignUp")}>
                <Text small center>New to PawMeetUp? {" "}
                    <Text bold color="#b7e0d1" >
                        Sign Up</Text></Text>
            </SignUp>
            <HeaderGraphic>

            </HeaderGraphic>

        </Container>
    )
}
const Container = styled.View`
    flex:1;
`;
const Main = styled.View`
    margin-top: 192px;
`;

const Auth= styled.View`
    margin: 64px 32px 32px;
`;

const AuthContainer =styled.View`
    margin-bottom: 32px;
`;
const SignInContainer= styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #b7e0d1;
    border-radius: 6px;
`;
 const Loading = styled.ActivityIndicator.attrs(props => ({
     color:"#ffffff",
     size:"small"

 }))``;

const SignUp = styled.TouchableOpacity`
    margin-top: 16px;
`;
const AuthTitle= styled(Text)`
    color: #8e93a1;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 300;
`;

const AuthField = styled.TextInput`
    border-bottom-color: #8e93a1;
    border-bottom-width: 0.5px;
    height: 48px;
`;

const HeaderGraphic = styled.View`
    position: absolute;
    wigth 100%;
`;
const StatusBar = styled.StatusBar``;