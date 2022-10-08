import React, {useState, useEffect} from 'react';
import {Button, Text, View, Pressable, Platform} from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import style from '../style/style'
import { Col, Row, Grid } from "react-native-easy-grid";

const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NumberOfIcons = 6;
const BaseBonus = 63;
let turnsleft = 6;
let board = []
let thrownNumbers = []

export default function Gameboard() {

    const [numberOfThrowsLeft, setNumberOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES + 1).fill(false, 1));
    const [selectedIcons, setSelectedIcons] = useState(new Array(NumberOfIcons + 1).fill(false, 1));
    const [startText, setStartText] = useState("Throw dices");
    const [bonus, setBonus] = useState(BaseBonus);
    const [isBonus, setIsBonus] = useState(false);
    const [selected, setSelected] = useState(false);
    const [total, setTotal] = useState(0);
    const [one, setOne] = useState(0);
    const [two, setTwo] = useState(0);
    const [three, setThree] = useState(0);
    const [four, setFour] = useState(0);
    const [five, setFive] = useState(0);
    const [six, setSix] = useState(0);
    const row = [];
    const doubles = [];
    const [Outersize, setOutersize] = useState(20);
    const [Innersize, setInnersize] = useState(10);
    const [isAndroid, setIsAndroid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    let bonustext = {
        0: {"wait" : "You are " + bonus + " points away from bonus.",
            "bonus" : "You got the bonus"
        }
    }

    function calculate(i) {
        let choosenone = thrownNumbers[selectedDices.indexOf(true)];
        let multiplier = 0;
        multiplier = 0;
            for (let x = 0; x < NBR_OF_DICES; x++) {
                if(thrownNumbers[x] === choosenone) {
                    multiplier++
                } 
            }
            
        if (isBonus === true) {
            setTotal(total + thrownNumbers[1] * NBR_OF_DICES);
            setBonus(bonus - thrownNumbers[1] * NBR_OF_DICES);
            if (1 === i && thrownNumbers[1] === i) {
                setOne(NBR_OF_DICES * thrownNumbers[1])
            }
            else if (2 === i && thrownNumbers[1] === i) {
                setTwo(NBR_OF_DICES * thrownNumbers[1])
            }
            else if (3 === i && thrownNumbers[1] === i) {
                setThree(NBR_OF_DICES * thrownNumbers[1])
            }
            else if (4 === i && thrownNumbers[1] === i) {
                setFour(NBR_OF_DICES * thrownNumbers[1])
            }
            else if (5 === i && thrownNumbers[1] === i) {
                setFive(NBR_OF_DICES * thrownNumbers[1])
            }   
            else if (6 === i && thrownNumbers[1] === i) {
                setSix(NBR_OF_DICES * thrownNumbers[1])
            } 
            setNumberOfThrowsLeft(0);
        } else {
            setTotal(total + choosenone * multiplier);
            setBonus(bonus - (choosenone * multiplier));   
            if (choosenone === 1) {
                setOne(choosenone * multiplier);     
            }
            else if (choosenone === 2) {
                setTwo(choosenone * multiplier);
            }
            else if (choosenone === 3) {
                setThree(choosenone * multiplier);
            }
            else if (choosenone === 4) {
                setFour(choosenone * multiplier);
            }
            else if (choosenone === 5) {
                setFive(choosenone * multiplier);
            }   
            else {
                setSix(choosenone * multiplier);
            }
        }
    }

    function getDiceColor(i) {     
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        } else {
            return selectedDices[i] ? "black" : "rgba(250,0,54,0.8)";
        }
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }
       
    function getIconColor(i) {
        return selectedIcons[i] ? "black" : "rgba(250,0,54,0.8)"; 
    }
    
    function selectIcon(i) {
        let Icon = [...selectedIcons];      
        if(isBonus === true) {
            if(Icon[i] === false && i === thrownNumbers[1]) {
                setSelected(true)
                turnsleft = turnsleft - 1
                Icon[i] = selectedIcons[thrownNumbers[1]] = true; 
                setSelectedIcons(Icon); 
                calculate(i)          
            } else if (Icon[i] === true) { 
                setStartText("You already selected points for " + i + ".")
            } else {
                setStartText("Select correct number.")
            }
        } else {   
            if(numberOfThrowsLeft > 0) {
                setStartText("Throw " + numberOfThrowsLeft +  " times before setting points.")
            } else {
                if(Icon[i] === false && (thrownNumbers[selectedDices.indexOf(true)] === i)){
                    turnsleft = turnsleft - 1 
                    setSelected(true)   
                    CheckBonus()
                    Icon[i] = selectedIcons[i] = true;
                    setSelectedIcons(Icon);
                } else if (Icon[i] === true && isBonus === false) { 
                    setStartText("You already selected points for " + i + ".")
                } else {                
                    setStartText("Select correct number.")
                }            
            }
        }
    }

    function IsBonus() {
        if (board.every((val, i, arr) => val === arr[0])) {  
            setIsBonus(true);
            resetBoard();
            GameState();
        }
    }

    function CheckBonus() {
        calculate()
        setIsBonus(false)
        GameState()  
        setSelectedDices(new Array(NBR_OF_DICES + 1).fill(false, 1));
        setNumberOfThrowsLeft(NBR_OF_THROWS);
    }

    function throwDices() {
        if (turnsleft === 0 && numberOfThrowsLeft === 0) {
            resetGame()
        } else {
            const values = (currentValue) => currentValue === false;
            if (selectedDices.every(values) === false && numberOfThrowsLeft > 0 || numberOfThrowsLeft === 3 || isBonus === true|| selected === true) { 
                setNumberOfThrowsLeft(numberOfThrowsLeft - 1);  
                setSelected(false)                
                resetBoard()
                for (let i = 0; i < NBR_OF_DICES; i++) {
                    if(!selectedDices[i]) {
                        let randomNumber = Math.floor(Math.random() * 6  + 1);
                        board[i] = 'dice-' + randomNumber;
                        thrownNumbers[i] = randomNumber;
                    } 
                }
                IsBonus();
            } else if (numberOfThrowsLeft === 0) {
                setStartText("Please select your points before starting a new round. ")         
            } else { 
                setStartText("Select at least one dice before throwing again. ")
            }
        }
    }

    function resetGame() {
        turnsleft = 6;
        setNumberOfThrowsLeft(NBR_OF_THROWS);
        setTotal(0);
        setBonus(BaseBonus);
        board = [];
        setSelectedIcons(new Array(NBR_OF_DICES + 1).fill(false, 1));
        setSelectedDices(new Array(NumberOfIcons + 1).fill(false, 1));
        setOne(0);
        setTwo(0);
        setThree(0);
        setFour(0);
        setFive(0);
        setSix(0);
        setIsEnabled(false);
    }

    function resetBoard() { 
            if (numberOfThrowsLeft === 0 || IsBonus === true){
                for(let i = 0; i < NBR_OF_DICES + 1; i++) {
                    selectedDices[i] = false;
                    setNumberOfThrowsLeft(0);    
            } 
        }
    }


    function GameState() {
        if (numberOfThrowsLeft === 3) {
            setStartText("Throw dices.");

        } else if (numberOfThrowsLeft >= 1) {
            setStartText('Select dices and throw dices again.');
                    
        } else if (numberOfThrowsLeft === 0) {
            setStartText('Select your points.');             
        } 
    }

 
    useEffect(() => {
         if (Platform.OS === 'android') {
            setIsAndroid(true);
          } else if (Platform.OS === 'web') {
            setOutersize(13);
            setInnersize(1);
          } 

        GameState()
        if (bonus <= 0) {
            setBonus(0)
            setIsEnabled(true)
            setNumberOfThrowsLeft(0);
            board = [];
        }
        if (turnsleft === 0) {
            setStartText(' Game over. All points selected. ');
            setNumberOfThrowsLeft(0);
        }
        
        if(numberOfThrowsLeft < 0) {
            setNumberOfThrowsLeft(NBR_OF_THROWS - 1)
        }
    }, [numberOfThrowsLeft])

    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
            key={"row" + i}
            onPress={() => selectDice(i)}
            >
            <MaterialCommunityIcons
            name={board[i]}
            key={"row" + i}
            size={50}
            color={getDiceColor(i)}
            >
            </MaterialCommunityIcons>
            </Pressable>
        )
    }

    for (let i = 1; i <= NumberOfIcons; i++) {
        doubles.push(   
            <Pressable
                key={"doubles" + i} 
                onPress={() => selectIcon(i)}
                >  
                <MaterialCommunityIcons
                name={"numeric-" + [i] + "-circle"}
                key={"doubles" + i}
                size={30}
                color={getIconColor(i)}
                />
            </Pressable> 
        )
    }
    
    return (
            <View style={isAndroid ? style.gamestatsAndroid : style.gamestats}>
                <View style={style.gameboard}>
                    <View style={isAndroid ? style.flexAndroid : style.flex}>{row}</View>
                    <Text style={[style.gameinfo]}>Throws left: {numberOfThrowsLeft}</Text>
                    <Text style={style.gameinfo}>{startText}</Text>
                    <Pressable style={style.button} onPress={()=>throwDices()}>
                        <Text style={style.buttonText}>Throw dices</Text>
                    </Pressable>
                    <Text style={style.gametext}>Total: {total}</Text>
                    <Text style={style.gametext}>Turns left: {turnsleft}</Text>
                    <Text style={style.gametext}>{isEnabled ? bonustext[0].bonus : bonustext[0].wait}</Text>
                </View>
                    <Grid  style={style.gamedots}>     
                        <Row>
                            <Col size={Outersize}></Col>     
                            <Col style={isAndroid ? null : style.androidIconPadding} size={Innersize}><Text style={isAndroid ? style.pcIconPadding : null}>{one}</Text><Row><Text>{doubles[0]}</Text></Row></Col>
                            <Col style={isAndroid ? null : style.androidIconPadding} size={Innersize}><Text style={isAndroid ? style.pcIconPadding : null}>{two}</Text><Row><Text>{doubles[1]}</Text></Row></Col>
                            <Col style={isAndroid ? null : style.androidIconPadding} size={Innersize}><Text style={isAndroid ? style.pcIconPadding : null}>{three}</Text><Row><Text>{doubles[2]}</Text></Row></Col> 
                            <Col style={isAndroid ? null : style.androidIconPadding} size={Innersize}><Text style={isAndroid ? style.pcIconPadding : null}>{four}</Text><Row><Text>{doubles[3]}</Text></Row></Col> 
                            <Col style={isAndroid ? null : style.androidIconPadding} size={Innersize}><Text style={isAndroid ? style.pcIconPadding : null}>{five}</Text><Row><Text>{doubles[4]}</Text></Row></Col>
                            <Col style={isAndroid ? null : style.androidIconPadding} size={Innersize}><Text style={isAndroid ? style.pcIconPadding : null}>{six}</Text><Row><Text>{doubles[5]}</Text></Row></Col> 
                            <Col size={Outersize}></Col>             
                        </Row>
                    </Grid>
                <View style={style.gameboardFooter}>
                    <Text style={style.gameboardAuthor}>
                        Author: Roni Junttila
                    </Text>
                </View>
            </View>
    )
}
