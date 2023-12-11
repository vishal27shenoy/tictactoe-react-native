import { StyleSheet, Text, View,TextInput,ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { color } from '../constants/color';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import GradientBtn from '../component/GradientBtn';
import { useNavigation } from '@react-navigation/native';
import { font } from '../constants/font';

const CreateRoom = () => {
    const [id,setId] = useState("");
    const navigation = useNavigation();
    const handleCreate = async() => {
        console.log("clicked create")
        try{
            const response = await axios.post("https://tictactoe-stz8.onrender.com/createRoom",{ roomID: id.toLowerCase() });
            // console.log(response);
            if(response?.data?.status == 200){
                console.log("came to if")
                navigation.navigate("GameBoard", {
                    roomId: id,
                    userId: 1,
                });
            }else{
                ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
            }
        }catch(err){

        }
    }
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputHolder} placeholder='Enter Room Id' placeholderTextColor={color.DARK} maxLength={4} onChangeText={(text) => setId(text)}/>
      <GradientBtn btnText={"Create"} onPress={() => handleCreate()}/>
    </View>
  )
}

export default CreateRoom

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:responsiveHeight(4),
        backgroundColor:color.DARK
    },
    inputHolder:{
        height:responsiveHeight(7),
        width:responsiveWidth(80),
        backgroundColor:color.INPUT_BG,
        borderRadius:responsiveWidth(2),
        paddingLeft:responsiveWidth(4),
        fontFamily:font.ROAD_RAGE,
        textTransform:'capitalize',
        color:color.DARK
    }
})