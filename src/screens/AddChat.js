import React,{useLayoutEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import {AntDesign} from 'react-native-vector-icons';
    
function AddChat ({navigation}) {
const [input, setInput] = useState("");

const db = firebase.firestore();

    const createChat = async()=>{
        await db.collection('message')
            .add({
             ownerName:input
            }).then(()=>{
                navigation.goBack();
            }).catch((error)=>alert(error));
    };

    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={navigation.goBack} style={{marginLeft:10}}>
           <AntDesign name="arrowleft" size={24}/>
         </TouchableOpacity>
          <Text style={styles.headerText}> Message a Paw Match!</Text>
            <Input 
                placeholder ="Enter a paw friend"
                value={input}
                onChangeText ={(text)=> setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
            />
            <TouchableOpacity  style= {styles.chatButton} onPress={createChat}>
                <Text>Create a new chat</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container:{
        marginTop:50,
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
    chatButton:{
        margin: 0,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#b7e0d1",
        borderRadius: 6,
    },
})
