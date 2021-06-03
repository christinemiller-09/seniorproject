import { Avatar, ListItem } from 'react-native-elements'
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as firebase from 'firebase';

const CustomListItem = ({id, ownerName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([]);
    const db = firebase.firestore();
    useEffect(() => {
        const unsubscribe = db.collection('message')
        .doc(id).collection('messages').orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>
            setChatMessages(snapshot.docs.map((doc) => doc.data()))
        );
        return unsubscribe;
    });
    return (
        <ListItem onPress={()=> enterChat(id,ownerName)} key={id} bottomDivider>
            <Avatar rounded source={{
                uri: chatMessages?.[0]?.profilePhotoUrl ||
                 "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cbc.ca%2Fsmartestperson%2Fcontent%2Fimage%2Favatar-placeholder.png&f=1&nofb=1"
                }}/>

            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                {ownerName}
                </ListItem.Title>
                <ListItem.Subtitle 
                    numberOfLines = {1}
                    elipsizeMode="tail" >
                   {chatMessages?.[0]?.ownerName} : {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem;

const styles = StyleSheet.create({})
