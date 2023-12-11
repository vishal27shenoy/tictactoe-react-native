import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { font } from '../constants/font';
import { color } from '../constants/color';
const GradientBtn = ({btnText,onPress}) => {
  return (
      <TouchableOpacity style={styles.multiplayer} onPress={onPress} activeOpacity={.9}>
      <LinearGradient
        colors={[color.GRADIENT_ONE, color.GRADIENT_TWO]}
        style={styles.linearGradient}>
        <Text style={styles.multiplayerText}>{btnText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientBtn;

const styles = StyleSheet.create({
  multiplayer: {
    height: responsiveHeight(7),
    width: responsiveWidth(80),
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: responsiveWidth(2),
    elevation: 3,
  },
  multiplayerText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontFamily:font.ROAD_RAGE,
    textAlign:'center'
  },
  linearGradient: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHolder: {
    height: responsiveHeight(3),
    width: responsiveHeight(3),

  },
});
