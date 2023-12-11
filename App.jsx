import { StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JoinRoom from './src/screens/JoinRoom';
import JoiningRoom from './src/screens/JoiningRoom'
import CreateRoom from './src/screens/CreateRoom';
import GameBoard from './src/screens/GameBoard';
const Stack = createStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animationEnabled:false}}>
        <Stack.Screen name="JoiningRoom" component={JoinRoom} options={{headerShown:false}}/>
        <Stack.Screen name="CreateRoom" component={CreateRoom} options={{headerShown:false}}/>
        <Stack.Screen name="JoinRoom" component={JoiningRoom} options={{headerShown:false}}/>
        <Stack.Screen name="GameBoard" component={GameBoard} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
 
  )
}

export default App

const styles = StyleSheet.create({})