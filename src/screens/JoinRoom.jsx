import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import GradientBtn from '../component/GradientBtn'
import { color } from '../constants/color'
import { useNavigation } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
const JoinRoom = () => {
    const navigation = useNavigation();
  useEffect(() => { SplashScreen.hide(); },[])
  return (
    <View style={styles.container}>
          <GradientBtn btnText={"Create Room"} onPress={() => navigation.navigate("CreateRoom")} />
      <GradientBtn btnText={"Join Room"} onPress={() => navigation.navigate("JoinRoom")} />
    </View>
  )
}

export default JoinRoom

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:responsiveHeight(4),
        backgroundColor:color.DARK
    }
})