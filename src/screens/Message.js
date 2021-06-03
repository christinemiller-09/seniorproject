import React,{useLayoutEffect, useState, useEffect} from 'react';
import { TouchableOpacity ,View } from 'react-native';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import Avatar from 'react-native-elements';
import {AntDesign, SimpleLineIcons} from 'react-native-vector-icons';

import * as firebase from 'firebase';

const Message = ({navigation}) => {
    const [chats, setChats] = useState([]);
    const db = firebase.firestore();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "PawMeetUp",
            headerTitleStyle: {backgroundColor:"#ffff"},
            headerTintColor: "black",
        });
       
    }, [navigation])
    useEffect(()=>{
      const unsubscribe = db.collection("message").onSnapshot(snapshot =>(
          setChats(snapshot.docs.map(doc=>({
              id: doc.id,
              data: doc.data()
          })))
      ));
          return unsubscribe;
  }, []);
    const enterChat = (id, ownerName) =>{
        navigation.navigate('Chat', {
            id,
            ownerName,
        });
    };
    return (
       <SafeAreaView>
         <TouchableOpacity onPress={navigation.goBack} style={{marginLeft:10}}>
           <AntDesign name="arrowleft" size={24}/>
         </TouchableOpacity>
         <TouchableOpacity onPress={() =>navigation.navigate('AddChat')} style={{marginLeft:380, marginTop:-25}}>
           <SimpleLineIcons name="pencil" size={24}/>
         </TouchableOpacity>
          <Text style={styles.headerText}> 
           Messages </Text>
           
           <ScrollView style={styles.container}>
           {chats.map(({id, data:{ ownerName }})=>(
                <CustomListItem key={id} id={id} ownerName={ownerName} enterChat={enterChat}/>
               ))}
           </ScrollView>
       </SafeAreaView>
    );
}

export default Message;
const styles=StyleSheet.create({
    container:{
        height:"100%"
    },
    headerText:{
      fontSize:35,
      fontWeight: "bold",
      fontFamily: "Courier",
      color: "#b7e0d1",
      textAlign: "center",
      paddingTop: 10,
      paddingBottom: 20,
    },
})