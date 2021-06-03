import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext.js';
import {FirebaseContext} from '../config/FirebaseContext.js';
import Text from '../components/Text.js';
import * as ImagePicker from 'expo-image-picker';


export default function EditProfile ({navigation})  {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);
    const [loading, setLoading] = useState(false);

    const [bio, setBio] = useState();
    const [treat, setTreat] = useState();
    const [activity, setActivity] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
   
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

    useEffect(() => {
        (async () => {
          const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
          setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
      }, []);

    const updateProfilePhoto = async ()=>{
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

    const handleUpdateProfile = async () =>{
        setLoading(true)
        try{
        const uid = firebase.getCurrentUser().uid;
        const user ={bio, treat, activity,profilePhoto}
        console.log(user);
        if(bio != undefined || bio != null){
           await firebase.updateUserInfoBio(user)
        }
        if(treat != undefined || treat != null){
            await firebase.updateUserInfoTreat(user)
         }
         if(activity != undefined || activity != null){
            await firebase.updateUserInfoActivity(user)
         }
         if(profilePhoto != undefined){
             await firebase.updateUserProfilePhoto(user)
         }

        const updateUser = await firebase.getUserInfo(uid);
        setUser({
            bio: updateUser.bio,
            treat: updateUser.treat,
            activity: updateUser.activity,
            profilePhotoUrl: updateUser.profilePhotoUrl,
            isLoggedIn: true
        })

    }catch(error){
        alert(error.message)
    } finally{
        navigation.navigate('Profile');
    }
        
    }
    return(
        <Container>
            <ProfilePhotoContainer onPress={updateProfilePhoto}>
            {profilePhoto ? (
                   <ProfilePhoto source= {{uri: profilePhoto}}/> 
                ):(
                     <ProfilePhoto source={user.profilePhotoUrl === "default" ? 
                require("../../assets/dogprofilepic.png"):
                {uri: user.profilePhotoUrl}}/>
                )}   
            </ProfilePhotoContainer>

        <Text large semi center>{user.petname}</Text>

        <EditPro>
            <EditContainer>
            <EditTitle> Bio </EditTitle> 
        <ProfileField
            autoCapitalize="sentences"
            autoCorrect={true} 
            autoFocus={true}
            onChangeText= { (txt) => setBio(txt)}
            value ={bio}
        />
        </EditContainer>
        <EditContainer>
            <EditTitle>Favorite Treat  </EditTitle>
            <ProfileField
                autoCapitalize="sentences" 
                autoCorrect={true} 
                autoFocus={true}
                onChangeText= { (txt) => setTreat(txt)}
                value ={treat}
            />
        </EditContainer>
        <EditContainer>
            <EditTitle>Favorite Activity </EditTitle>
            <ProfileField
                autoCapitalize="sentences" 
                autoCorrect={true} 
                autoFocus={true}
                onChangeText= { (txt) => setActivity(txt)}
                value ={activity}
            />
        </EditContainer>
        </EditPro>

        <UpdateContainer onPress={handleUpdateProfile} disabled={loading}>
                {loading? (
                        <Loading/>
                ):(
                    <Text bold ceneter color="#ffffff">
                        Update Profile</Text>
                )}     
            </UpdateContainer>

            <ProfileButton onPress={()=> navigation.navigate("Profile")}>
                    <Text bold color="#ffffff">Cancel</Text>
            </ProfileButton>
        </Container>
       
    )
}
const Container = styled.View`
    align-items: center;
    margin-top: 64px;
    flex: 1;
`;
const EditPro = styled.View`
    margin: 30px 32px 32px;
`;
const ProfileField = styled.TextInput`
    border-bottom-color: #8e93a1;
    border-bottom-width: 0.5px;
    height: 30px;
`;

const EditContainer = styled.View`
margin-bottom: 2px;
`;
const EditTitle= styled(Text)`
    color: #8e93a1;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 300;
`;
const Loading = styled.ActivityIndicator.attrs(props => ({
    color:"#ffffff",
    size:"small"

}))``;
const ProfileButton = styled.TouchableOpacity`
        margin: 32px;
        height: 50px;
        align-items: center;
        justify-content: center;
        background-color: #b7e0d1;
        border-radius: 16px;
`;
const UpdateContainer= styled.TouchableOpacity`
    margin: 0 32px;
    height: 50px;
    align-items: center;
    justify-content: center;
    background-color: #b7e0d1;
    border-radius: 6px;
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
const ProfilePhoto = styled.Image`
   flex: 1
`;