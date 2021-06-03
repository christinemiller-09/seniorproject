import React ,{useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContext} from '../context/UserContext.js';


import AuthStackScreen from './AuthStack';
import MainStack from './MainStack';
import Loading from '../screens/Loading';
import EditProfile from '../screens/EditProfile';
import ChatScreen from '../screens/ChatScreen';
import AddChat from '../screens/AddChat';

const AppStackScreen =()=> {
    const AppStack = createStackNavigator();
    const [user] = useContext(UserContext);
   
    return (
        <AppStack.Navigator headerMode={false}>
            {user.isLoggedIn === null ? (
                <AppStack.Screen name="Loading" component={Loading} />
                
            ): user.isLoggedIn ?(
              <AppStack.Screen name="Main" component={MainStack} />
              
            ):(
                <AppStack.Screen name="Auth" component={AuthStackScreen} />
            )}
            <AppStack.Screen name= "Edit" component={EditProfile}/>
            <AppStack.Screen name= "Chat" component={ChatScreen}/>
            <AppStack.Screen name= "AddChat" component={AddChat}/>
        </AppStack.Navigator>
    );
}

export default AppStackScreen;