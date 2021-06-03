import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

import MainFeed from '../screens/MainFeed';
import Profile from '../screens/Profile';
import Message from '../screens/Message';

export default MainStack =() =>{
    const MainStacks = createBottomTabNavigator();

    const tabBarOptions ={
        showLabel: false,
        style:{
            backgroundColor :"#b7e0d1",
            paddingBottom: 12
        }
    }
    const screenOptions =({route})=>({
        tabBarIcon: ({focused}) =>{
            let iconName = "home-outline";
            switch(route.name){
                case "Home":
                    iconName = "home-outline"; break;
                case "Profile":
                    iconName = "person-circle-outline"; break;
                case "Message":
                    iconName = "chatbox-outline"; break;
                default:
                    iconName = "home-outline";
            }
            return <Ionicons name={iconName} size={30} color={focused ? "#ffffff" : "#666666"}/>;
        }
    });

    return(
        <MainStacks.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
           <MainStacks.Screen name= "Home" component={MainFeed}/> 
           <MainStacks.Screen name= "Profile" component={Profile}/> 
            <MainStacks.Screen name= "Message" component={Message}/>
        </MainStacks.Navigator>

    )
}