import React,{useContext, useEffect} from 'react';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';

import Text from '../components/Text.js';
import { UserContext } from '../context/UserContext.js';
import { FirebaseContext } from '../config/FirebaseContext.js';


export default Loading = ()=> {
    const [_, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        setTimeout(async ()=>{
            const user = firebase.getCurrentUser()

            if(user){
                const userInfo = await firebase.getUserInfo(user.uid)

                setUser({
                    isLoggedIn: true,
                    email: userInfo.email,
                    uid: user.uid,
                    profilePhotoUrl: userInfo.profilePhotoUrl,
                    ownerName: userInfo.ownerName,
                    petname: userInfo.petname,
                    bio: userInfo.bio,
                    treat: userInfo.treat,
                    activity: userInfo.activity,
                })

            } else{
                setUser((state)=>({...state, isLoggedIn: false}));
            }
        },500)
    }, [])
    return (
        <Container>
            <Text title color ="#b7e0d1">
                PawMeetUp
            </Text>

            <LottieView 
                source={require("../../assets/loadingAnimation.json")}
                autoPlay
                loop
                style= {{width:"50%"}}
                />
        </Container>
    )
}
const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #8e93a1;
`;
