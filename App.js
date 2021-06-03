import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackScreen from './src/stack/AppStackScreen.js';
import {UserProvider} from './src/context/UserContext.js';
import {FirebaseProvider,FirebaseContext} from './src/config/FirebaseContext.js';


export default App =() =>{

  return(
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreen/>
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
    
  )
}