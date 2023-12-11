import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../constants/color';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {io} from 'socket.io-client';
import {font} from '../constants/font';
import GradientBtn from '../component/GradientBtn';
let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let turnn = 'X';
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const GameBoard = () => {
  const navigation = useNavigation();
  const socket = io('https://tictactoe-stz8.onrender.com');
  const {roomId, userId} = useRoute().params;
  console.log(roomId, userId);
  const playerId = roomId + userId;

  const [animate, setAnimate] = useState(true);
  const temp = animate ? responsiveWidth(7) : responsiveWidth(40);
  const [check, setCheck] = useState(false);
  const [change, setChange] = useState(true);

  useEffect(() => {
    socket.on(roomId, object => {
      const {userId, index, value, turn, message} = object;
      if (message) {
        turnn = 'X';
        arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        setCheck(false);
        setChange(prev => !prev);
      } else {
        arr[index] = value;
        setChange(prev => !prev);
        turnn = turn;
        checkWin();
      }
    });
  }, []);

  const checkWin = () => {
    for (const element of win) {
      let [a, b, c] = element;
      if (arr[a || b || c] != 0 && arr[a] === arr[b] && arr[b] === arr[c]) {
        ToastAndroid.show(`${arr[a]} Won a Game`, ToastAndroid.LONG);
        setCheck(true);
        return;
      }
    }
    if (!arr.includes(0)) {
      ToastAndroid.show(`Game Draw`, ToastAndroid.LONG);
      setCheck(true);
    }
  };

  const handleClick = index => {
    if (check) {
      return;
    } else if (turnn == 'X' && userId == 1) {
      socket.emit('ongame', {
        roomId: roomId,
        userId: playerId,
        turn: 'O',
        value: 'X',
        index: index,
      });
    } else if (turnn == 'O' && userId == 2) {
      socket.emit('ongame', {
        roomId: roomId,
        userId: playerId,
        turn: 'X',
        value: 'O',
        index: index,
      });
    }
  };


//device backbutton handler 
 useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            navigation.goBack();
          },
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket');
      socket.emit('users-connect', {roomId: roomId, userId: playerId});
    });
  }, []);


  

//reseting button
  const handelReset = () => {
    socket.emit('playagain', {roomId: roomId, turm: 'X'});
    setCheck(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxHolder}>
        <FlatList
          data={arr}
          numColumns={3}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.box}
              onPress={() => item == 0 && handleClick(index)}>
              <Text
                style={{
                  color: item == 'O' ? '#80deea' : '#e60073',
                  fontSize: responsiveFontSize(8),
                  textAlign: 'center',
                  fontFamily: font.ROAD_RAGE,
                }}>
                {item != 0 && item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {check && (
        <GradientBtn btnText={'Replay'} onPress={() => handelReset()} />
      )}
    </View>
  );
};

export default GameBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.DARK,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrHolder: {
    position: 'absolute',
    right: responsiveWidth(5),
    backgroundColor: 'white',
    top: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: responsiveWidth(2),
    zIndex: 4,
  },
  box: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    backgroundColor: 'purple',
    margin: responsiveWidth(1),
    borderRadius: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxHolder: {
    height: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
