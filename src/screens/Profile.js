import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components';

import { UserContext } from '../context/UserContext.js';
import {FirebaseContext} from '../config/FirebaseContext.js';

import Text from '../components/Text.js';
import { MaterialIcons } from '@expo/vector-icons'; 
import {Ionicons} from '@expo/vector-icons';

export default function Profile ({navigation})  {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);
    const [loading, setLoading] = useState(false);

    const logOut = async() =>{
        const loggedOut =  await firebase.logOut()
        if(loggedOut){
            setUser(state =>({...state, isLoggedIn: false}));
        }
    };
    const onEdit= () =>{
        setLoading(true)
        navigation.navigate('Edit');
    }
    useEffect(() => {
        setLoading(true)
        
      }, []);

    return (   
        <Container> 
            <ProfilePhotoContainer>
                <ProfilePhoto source={user.profilePhotoUrl === "default" ? 
                require("../../assets/dogprofilepic.png"):
                {uri: user.profilePhotoUrl}}/>
            </ProfilePhotoContainer>
            <Text title bold margin="16px 0 20px 0">
                {user.petname}
            </Text>
            <Text medium bold margin="16px 0 20px 0" color= "#b7e0d1">
                Owner Name: {user.ownerName}
            </Text> 

             <EditProfile onPress={() => onEdit()}>
                <Text small bold color="#ffffff" >Edit Profile</Text>
            </EditProfile>

           <Logout onPress={logOut}>
                <Text small bold color="#ffffff" >Log out</Text>
            </Logout>

            <Text medium bold >Get to know my {user.petname}</Text>
            <BioContainer>
                <Text bold> <MaterialIcons name="pets" size={18} color="#b7e0d1"/>  Bio:</Text>
             
                <Text light center margin="15px">
                        {user.bio}
                     </Text>
            
           
            </BioContainer>
            
            <BioContainer>
                <Text  bold> <MaterialIcons name="pets" size={18} color="#b7e0d1"/>  My favorite treat:</Text>
             <Text light center margin="15px">
                {user.treat} </Text>
            </BioContainer>
            
            <BioContainer>
            <Text bold><MaterialIcons name="pets" size={18} color="#b7e0d1"/> My favorite activity to do is: </Text>
            <Text light center margin="15px">
                {user.activity}
            </Text>
            </BioContainer>   
            <StatusBar barStyle = "dark-content"/>    
        </Container>
    )
}

const Container = styled.View`
    align-items: center;
    margin-top: 64px;
    flex: 1;
`;
const ProfilePhotoContainer = styled.View`
    shadow-opacity: 0.8;
    shadow-radius: 25px;
    shadow-color: #333333;
`;

const ProfilePhoto = styled.Image`
    width: 130px;
    height: 130px;
    border-radius: 64px;
`;

const Logout = styled.TouchableOpacity`
    width:110px;
    backgroundColor:#b7e0d1;
    borderRadius:15px;
    height:25px;
    alignItems: center;
    justifyContent:center;
    marginTop:5px;
    marginBottom:5px;

`;
const EditProfile = styled.TouchableOpacity`
    width:130px;
    backgroundColor:#b7e0d1;
    borderRadius:15px;
    height:25px;
    alignItems: center;
    justifyContent:center;
    marginTop:5px;
    marginBottom:5px;
`;
const BioContainer = styled.View`
    margin: 25px;
    margin-top: 25px;
`;
const HeaderBar = styled.View`
    flexDirection: row;
    justifyContent: space-around;
    marginTop: 24px;
    marginHorizontal: 16px;
`;
const ProfileField = styled.TextInput`
    border-bottom-color: #8e93a1;
    border-bottom-width: 0.5px;
    height: 30px;
`;

const EditContainer = styled.View`
margin-bottom: 2px;
`;
const StatusBar = styled.StatusBar``;