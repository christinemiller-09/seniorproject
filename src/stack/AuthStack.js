import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const AuthStackScreen =()=> {
const AuthStack = createStackNavigator();
    return(
    <AuthStack.Navigator headerMode={false}>
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
    );
}
export default AuthStackScreen;