import { StyleSheet, Text, View ,TextInput} from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { color } from '../constants/color';
import { font } from '../constants/font';
import { useNavigation ,useIsFocused} from '@react-navigation/native';
import GradientBtn from '../component/GradientBtn';
import axios from 'axios';

const JoiningRoom = () => {
    const [load,setLoad] = useState(false);
    const [id, setId] = useState("");
    const navigation = useNavigation();
    const handleCreate = async () => {
        try {
            const response = await axios.put("https://tictactoe-stz8.onrender.com/joinRoom", { roomID: id.toLowerCase() });
            console.log(response?.data);
            if (response?.data?.status == 200) {
                console.log("came to if")
                navigation.navigate("GameBoard", {
                    roomId: id,
                    userId: 2,
                });
            } else {
                ToastAndroid.show(response?.data?.message, ToastAndroid.LONG);
            }
        } catch (err) {
            console.log(err)
        }
    }



  return (
  <View style={styles.container}>
      <TextInput style={styles.inputHolder} placeholder='Enter Room Id' value={id} placeholderTextColor={color.DARK} maxLength={4} onChangeText={(text) => setId(text)}/>
      <GradientBtn btnText={"Join"} onPress={() => handleCreate()}/>
    </View>
  )
}

export default JoiningRoom

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:responsiveHeight(4),
        backgroundColor:color.DARK,
        position:'relative',
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
    },
    cameraHolder:{
        height:responsiveWidth(60),
        width:responsiveWidth(60),
    }
})



