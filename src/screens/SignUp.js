import React ,{useState, useEffect, useContext} from 'react'
import styled from 'styled-components';
import {Platform} from 'react-native';
import Text from '../components/Text.js';
import {AntDesign} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import {FirebaseContext} from '../config/FirebaseContext.js';
import {UserContext} from "../context/UserContext.js";

export default function SignUp({navigation}) {
    const[email, setEmail] = useState();
    const [ownerName, setName] = useState();
    const [petname, setPetName]= useState();
    const [confirmPassword, setConfirmPassword]= useState();
    const [password,setPassword] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const [bio, setBio] = useState();
    const [treat, setTreat] = useState();
    const [activity, setActivity] = useState();
    const [loading, setLoading] = useState(false);

    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

    useEffect(() => {
        (async () => {
          const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
          setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
      }, []);

    const addProfilePhoto = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            setProfilePhoto(result.uri);
          }
        
    }
    if (hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
      }

    const signUp = async () =>{
        setLoading(true)

        const user = {ownerName, petname, email, password, profilePhoto, bio, treat, activity}

        try{
            const createdUser = await firebase.createUser(user);
            setUser({...createdUser, isLoggedIn: true});
        }catch(error){ 
            console.log(user);
            console.log("Error @signUp: ", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Main>
                <Text title heavy center color="#b7e0d1" >PawMeetUp</Text>
            </Main>
            <ProfilePhotoContainer onPress={addProfilePhoto}>
                {profilePhoto ? (
                    <ProfilePhoto source={{uri: profilePhoto}}/>
                ):(
                     <DefaultProfilePhoto>
                    <AntDesign name="plus" size={24} color="#ffffff"/>
                </DefaultProfilePhoto>
                )}
            </ProfilePhotoContainer>
            <Auth>
                <AuthContainer>
                <AuthTitle> Name</AuthTitle>
                <AuthField 
                   autoCapitalize="words" 
                    autoCorrect={false} 
                    autoFocus={true}
                    onChangeText = {ownerName => setName(ownerName.trim())}
                    value={ownerName}
                    />
                </AuthContainer>

                <AuthContainer>
                <AuthTitle> Pet Name</AuthTitle>
                <AuthField 
                   autoCapitalize="words" 
                    autoCompleteType="email" 
                    autoCorrect={false} 
                    autoFocus={true}
                    onChangeText = {petname => setPetName(petname.trim())}
                    value={petname}
                    />
                </AuthContainer>

                <AuthContainer>
                <AuthTitle> Email Address</AuthTitle>
                <AuthField 
                   autoCapitalize="none" 
                    autoCompleteType="email" 
                    autoCorrect={false} 
                    autoFocus={true}
                    keyboardType ="email-address"
                    onChangeText = {email => setEmail(email.trim())}
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
                    onChangeText= { password => setPassword(password.trim())}
                    value ={password}
                    />
                </AuthContainer>

                <AuthContainer>
                <AuthTitle> Verify Password</AuthTitle>
                <AuthField 
                   autoCapitalize="none" 
                    autoCompleteType="password" 
                    autoCorrect={false} 
                    autoFocus={true}
                    secureTextEntry={true}
                    onChangeText= { confirmPassword => setConfirmPassword(confirmPassword.trim())}
                    value ={confirmPassword}
                    />
                </AuthContainer>

                <AuthContainer>
                <AuthTitle> Bio:</AuthTitle>
                <AuthField 
                   autoCapitalize="sentences"
                    autoCorrect={true} 
                    autoFocus={true}
                    onChangeText= { bio => setBio(bio)}
                    value ={bio}
                    />
                </AuthContainer>

                <AuthContainer>
                <AuthTitle> Favorite Treat: </AuthTitle>
                <AuthField 
                   autoCapitalize="sentences" 
                    autoCorrect={true} 
                    autoFocus={true}
                    onChangeText= { treat => setTreat(treat)}
                    value ={treat}
                    />
                </AuthContainer>
                <AuthContainer>

                <AuthTitle> Favorite Activity: </AuthTitle>
                <AuthField 
                   autoCapitalize="sentences" 
                    autoCorrect={true} 
                    autoFocus={true}
                    onChangeText= { activity => setActivity(activity)}
                    value ={activity}
                    />
                </AuthContainer>
                
            </Auth>
           
            <SignUpContainer onPress={signUp}disabled={loading}>
                {loading? (
                        <Loading/>
                ):(
                    <Text bold ceneter color="#ffffff">
                        Sign Up</Text>
                )}     
            </SignUpContainer>

            <SignIn onPress={()=> navigation.navigate("SignIn")}>
                <Text small center>Already have an account? {" "}
                    <Text bold color="#b7e0d1" >
                        Sign In</Text></Text>
            </SignIn>
            <HeaderGraphic>

            </HeaderGraphic>

        </ScrollView>
        </Container>
    )
}
const ScrollView = styled.ScrollView``;
const Container = styled.View`
    flex:1;
`;
const Main = styled.View`
    margin-top: 80px;
`;
const ProfilePhotoContainer = styled.TouchableOpacity`
    background-color: #D3D3D3;
    width: 90px;
    height: 98px;
    border-radius: 40px;
    align-self: center;
    margin-top: 16px;
    overflow: hidden;
`;
const DefaultProfilePhoto = styled.View`
    align-items: center;
    justify-content: center;
    flex:1;
`;
const ProfilePhoto = styled.Image`
    flex:1;
`;
const Auth= styled.View`
    margin: 16px 32px 32px;
`;

const AuthContainer =styled.View`
    margin-bottom: 2px;
`;
const SignUpContainer= styled.TouchableOpacity`
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

const SignIn = styled.TouchableOpacity`
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
    height: 30px;
`;

const HeaderGraphic = styled.View`
    position: absolute;
    wigth 100%;
`;
const StatusBar = styled.StatusBar``;