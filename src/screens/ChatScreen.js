import React,{useLayoutEffect, useState, useContext} from 'react'
import { ScrollView, SafeAreaView ,TouchableOpacity ,TouchableWithoutFeedback} from 'react-native';
import { StatusBar } from 'react-native';
import { Keyboard } from 'react-native';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Text, View,TextInput } from 'react-native'
import Avatar from 'react-native-elements';
import {AntDesign, Ionicons} from 'react-native-vector-icons';
import * as firebase from 'firebase';
import { UserContext } from '../context/UserContext.js';
const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [user] = useContext(UserContext);
    const db = firebase.firestore();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: ()=>(
                <View style={{flexDirection:'row',
                    alignItems:'center',
                }}>
                    <Text>{route.params.ownerName}</Text>
                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity
                    style={{marginLeft:10}}
                    onPress={navigation.goBack}>
                    <AntDesign name ="arrowleft" size={24} color='gray'/>
                </TouchableOpacity>
            )
        });
    }, [navigation, messages])
    const sendMessage = () =>{
        Keyboard.dismiss();
        db.collection('message').doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            ownerName: user.ownerName,
            email: user.email,
            photoURL: user.profilePhotoUrl,
        })
        setInput("");
    }; 
    useLayoutEffect(() => {
        const unsubscribe = db.collection('message')
        .doc(route.params.id).collection("messages")
        .orderBy('timestamp','desc')
        .onSnapshot(snapshot => 
         setMessages(
            snapshot.docs.map(doc=>({
                id:doc.id,
                 data: doc.data()
             }))
        ));
        return unsubscribe;
     }, [])
     return (
        <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding": "height"}
                style={styles.container}
                keyboardVerticalOffset= {90} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <ScrollView contentContainerStyle={{ padding:15 }}>
                    {messages.map(({id, data})=>
                    data.email === user.email ? (
                        <View key={id} style={styles.reciever}>
                            <Text style={styles.recieverText}>{data.message}</Text>
                        </View>
                    ):(
                        <View style={styles.sender}>
                            <Text style={styles.senderText}>{data.message}</Text>
                        </View>
                    )
                )}
                </ScrollView>
                <View style= {styles.footer}>
                <TextInput 
                    value={input}
                    onChangeText={(text)=> setInput(text)}
                    onSubmitEditing={sendMessage}
                    placeholder="Enter Messsage"
                    style={styles.textInput}
                    />
                    <TouchableOpacity  onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name="send" size={24} color="#b7e0d1"/>
                    </TouchableOpacity>
                </View>
                </>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


export default ChatScreen;
    
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    reciever:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom:20,
        maxWidth: "80%",
        position:"relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin:15,
        maxWidth: "80%",
        position:"relative",
    },
    senderText:{
        color:"white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    recieverText:{
        color: "black",
        fontWeight:"500",
        marginLeft: 10,
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white",
    },
    footer:{
        flexDirection:'row',
        alignItems:"center",
        width:"100%",
        padding:15,
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        borderColor:"#ECECEC",
        borderWidth: 1,
        padding: 10,
        color:"gray",
        borderRadius: 30,
    },
})