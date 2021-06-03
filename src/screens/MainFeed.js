import React, { useEffect, useState, useContext, useMemo, useLayoutEffect} from 'react';
import TinderCard from 'react-tinder-card';
import {FirebaseContext} from '../config/FirebaseContext.js';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import {SimpleLineIcons} from 'react-native-vector-icons';
import {Ionicons} from '@expo/vector-icons';

export default function MainFeed({navigation}) {
    const [people,  setPeople] = useState([])
    const firebase = useContext(FirebaseContext);
    const db = firebase.getFirestore();
    const alreadyRemoved = [];

    useEffect(()=> { 
   
     const unsubscribe = db.collection('users')
      .onSnapshot(snapshot => (
        setPeople(snapshot.docs.map(doc => doc.data()))));

        return unsubscribe;

    }, []);

    const childRefs = useMemo(() => Array(people.length).fill(0).map(i => React.createRef()), []);

    const onSwipe = (dir) => {
        const cardsLeft = people.filter(person => !alreadyRemoved.includes(person.petname))
        if (cardsLeft.length) {
          const toBeRemoved = cardsLeft[cardsLeft.length - 1].petname // Find the card object to be removed
          const index = people.map(person => person.petname).indexOf(toBeRemoved) // Find the index of which to make the reference to
          alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
          childRefs[index].current.swipe(dir) // Swipe the card!
        }
      };
    return (
            <Container>
              <CardContainer>
                {people.map((person,index) =>
                  <TinderCard key={person.ownerName}
                  preventSwipe= {['up','down']}
                  ref={childRefs[index]}
                  >
                    <Card>
                      <CardImage source={{uri: person.profilePhotoUrl}}>
                      </CardImage>
                      <CardTitle>{person.ownerName}</CardTitle>
                    </Card>
                  </TinderCard>
                )}  
              </CardContainer>
                  <ButtonsContainer>
                    <LikeContainer >
                        <LikeButton onPress= {()=> onSwipe('left')}>
                          <LikePaw source= {require("../../assets/pawLike.png")}/>  
                        </LikeButton>
                        
                    </LikeContainer>
                        
                    <DislikeContainer >
                        <DislikeButton onPress= {()=> onSwipe('right')}>
                            <DislikePaw source={require("../../assets/pawDislike.png")}/>
                        </DislikeButton> 
                    </DislikeContainer>      
                    
                </ButtonsContainer>
            </Container>
          );

}
const Container = styled.View`
    margin-top: 100px; 
    padding: 100px;
    align-items: center;
    justify-content: center;
    width: 100%;
`


const CardContainer = styled.View`
    width: 100%;
    max-width: 260px;
    height: 300px;
   
`

const Card = styled.View`
    position: absolute;
    background-color: #333333;
    width: 100%;
    max-width: 460px;
    height: 300px;
    width: 300px;
    shadow-color: black;
    shadow-opacity: 0.2;
    shadow-radius: 20px;
    border-radius: 20px;
    resize-mode: cover; 
    margin-left: -30px;
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
`

const CardTitle = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
    font-size: 20px;
`

const LikeContainer = styled.View`
margin-left: 130px;
`
const DislikeContainer = styled.View`
margin-right: 130px;
`
const LikePaw = styled.Image`
width: 100px;
height: 90px;
resizeMode: contain;
`
const DislikePaw = styled.Image`
width: 100px;
height: 90px;
resizeMode: contain;
`
const ButtonsContainer = styled.View`
flex:1;
margin-top: 150px;
`
const LikeButton = styled.TouchableOpacity``
const DislikeButton = styled.TouchableOpacity``