import { StyleSheet } from "react-native";
const cardStyle= StyleSheet.create({
  card:{
    position:'absolute',
    width:600,
    padding: 20,
    maxWidth:85,
    height: 50,
    borderRadius: 20,
    shadowColor:"gray",
    shadowRadius: 18,
  },
  heading:{
    position:"absolute",
    bottom:10,
    color: "white",
  }, 
  tinderCards__cardContainer:{
    flex:1, 
    justifyContent: 'center', 
    marginTop:5,},
  
    swipe:{
    position:'absolute'
  }
})
