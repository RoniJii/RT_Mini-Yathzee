import React, {useEffect, useState}  from 'react'
import {Text, View, Pressable} from 'react-native'
import style from '../style/style'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const NumOfDice = 5;
const NumOfThrows = 5;
let board = []

export default function gameboard() {

    const [bonus, setBonus] = useState(63);
    const number = []
    const [pair1, setPair1] = useState([]);
    const [pair2, setPair2] = useState([]);
    const [pair3, setPair3] = useState([]);
    const [pair4, setPair4] = useState([]);
    const [pair5, setPair5] = useState([]);
    const [pair6, setPair6] = useState([]);

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }
    
      
    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        } else {
            return selectedDices[i] ? "black" : "steelblue";
        }
    }

    function throwdice() {
        setThrows(throws-1) 
        if(throws > 0 ) {
        for(let i = 0; i < 6; i++) {
                    number.push(
                    <MaterialCommunityIcons
                    name={"dice-"+getRandom(1, 6)}
                    key={i}
                    size={40}
                    color={"black"}/>   
                    )    
                }
            } else {
                setThrows(5) 
            }
            
        }

    return(
        <View style={style.gameboard}>
            <View style={style.flex}>
               {number.map((item) => item)}
            </View>
            <Text>Throws Left: {throws}</Text>
            <Text>Throw dices</Text>
            <Text>Select and throw dices again.</Text>
            <Pressable style={style.button} onPress={() => throwdice()}>
                <Text>Throw dices</Text>
            </Pressable>
            <Text>Total: </Text>
            <Text>You are {bonus} points away from bonus.</Text>
            <View style={style.flex}>
                
                <Text>{pair2}</Text>
                <Text>{pair3}</Text>
                <Text>{pair4}</Text>
                <Text>{pair5}</Text>
                <Text>{pair6}</Text>
            </View>
            <View style={style.flex}>
                    <Text>{1 * pair1.length}{'\n'}
                    <MaterialCommunityIcons name="numeric-1-circle" size={24} color="black" />
                </Text> 
                <MaterialCommunityIcons name="numeric-2-circle" size={24} color="black" />
                <MaterialCommunityIcons name="numeric-3-circle" size={24} color="black" />
                <MaterialCommunityIcons name="numeric-3-circle" size={24} color="black" />
                <MaterialCommunityIcons name="numeric-4-circle" size={24} color="black" />
                <MaterialCommunityIcons name="numeric-5-circle" size={24} color="black" />
                <MaterialCommunityIcons name="numeric-6-circle" size={24} color="black" />
            </View>
        </View>
    )
}