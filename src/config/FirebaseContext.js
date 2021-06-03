import React,{createContext,useState} from 'react';

import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import config from './firebaseConfig.js';

const FirebaseContext = createContext();

firebase.initializeApp(config)
const db = firebase.firestore();

const Firebase = {
  getFirestore:()=>{
    return firebase.firestore();
  },
  getCurrentUser:()=>{
    return firebase.auth().currentUser
  },
  
  createUser: async(user)=>{
    try{
      await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;

      let profilePhotoUrl ="default";
      await db.collection("users").doc(uid)
      .set({
        email: user.email,
        ownerName: user.ownerName,
        petname: user.petname,
        bio: user.bio,
        treat: user.treat,
        activity: user.activity,
        profilePhotoUrl
      });

      if (user.profilePhoto){
        profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
      }
      delete user.password;

      return {...user, profilePhotoUrl, uid};
      
    }catch(error){
      console.log("Error @createUser: ", error.message)
    }
    },

    uploadProfilePhoto: async (uri) => {
        const uid = Firebase.getCurrentUser().uid;
        try{
          const photo = await Firebase.getBlob(uri);

          const imageRef = firebase.storage().ref("profilePhotos").child(uid);
          await imageRef.put(photo);
          const url = await imageRef.getDownloadURL();

          await db.collection("users").doc(uid).update({
            profilePhotoUrl: url,
          });
          return url;

        }catch(error){
          console.log("Error @uploadProfilePhoto: ", error);
        }
    },
    getBlob: async (uri) => {
      return await new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest()

        xhr.onload =() =>{
          resolve(xhr.response)
        }
        xhr.onerror = () =>{
          reject(new TypeError("Netowrk request failed."))
        }
        xhr.responseType ="blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    },
    getUserInfo: async (uid)=>{
      try{
        const user = await db.collection("users").doc(uid).get()

        if (user.exists){
          return user.data()
        }
      }catch(error){
        console.log("Error @getUserInfo: ", error)
      }
      
    },
    logOut: async () =>{
      try{
        await firebase.auth().signOut()
        return true;
      }catch(error){
        console.log("Error @logout: ", error)
      }
      return false;
    },
    signIn: async (email, password) =>{
      return firebase.auth().signInWithEmailAndPassword(email,password);
    },
    updateUserInfoBio: async (user) =>{
      try{
        const uid = Firebase.getCurrentUser().uid;

         await db.collection("users").doc(uid)
        .update({
          uid,
          bio: user.bio
        }); 
 
        return {...user, uid};
        
      }catch(error){
        console.log("Error @updateUserBio: ", error.message)
      }
    },
    updateUserInfoTreat: async (user) =>{
      try{
        const uid = Firebase.getCurrentUser().uid;
        
         await db.collection("users").doc(uid)
        .update({
          uid,
          treat: user.treat
        }); 
 
        return {...user, uid};
        
      }catch(error){
        console.log("Error @updateUserTreat: ", error.message)
      }
    },
    updateUserInfoActivity: async (user) =>{
      try{
        const uid = Firebase.getCurrentUser().uid;
        
         await db.collection("users").doc(uid)
        .update({
          uid,
          activity: user.activity
        }); 
 
        return {...user, uid};
        
      }catch(error){
        console.log("Error @updateUserActivity: ", error.message)
      }
    },
    updateUserProfilePhoto: async(user)=>{

      try{
        const uid = Firebase.getCurrentUser().uid;
        if (user.profilePhoto){
        profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
        }
        await db.collection("users").doc(uid)
        .update({
          uid,
          profilePhotoUrl
        }); 
        return { profilePhotoUrl, uid};

      }catch(error){
        console.log("Error @updateUserProfilePhoto: ", error)
      }
    }
  };

const FirebaseProvider = (props) =>{
  return <FirebaseContext.Provider value = {Firebase}>{props.children}</FirebaseContext.Provider>
};

export {FirebaseContext, FirebaseProvider};