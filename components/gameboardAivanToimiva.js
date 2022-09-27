import React, {useState, useEffect, useCallback} from 'react';
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
let pair1 = []

export default function Gameboard() {

    //bonus ei toimi. jos bonus turn pitäs olla 0

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

   // const [isEnabled, setIsEnabled] = useState("You are " + bonus + " points away from bonus.");
   // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    function calculate() {
        let choosenone = pair1[selectedDices.indexOf(true)];
        let multiplier = 0;
        multiplier = 0;
            for (let x = 0; x < NBR_OF_DICES; x++) {
                if(pair1[x] === choosenone) {
                    //console.log(pair1[selectedDices.indexOf(true)]) Tää löytää sen mikä on valittu. Pair[i] i on se index millä etitään. Pairin sisältä pitäisi löytyy KAIKKI valitut numerot               
                    multiplier++
                    console.log(multiplier)
                } 
            }
        if (isBonus === true) {
            setTotal(total + pair1[1] * NBR_OF_DICES);
            setBonus(bonus - pair1[1] * NBR_OF_DICES);
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

    //pair1 saa nopan luvut JOTKA HEITETTY nyt pitäisi saaha selectatut nimet === board[i] tms
    function getDiceColor(i) {     
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        } else {
            return selectedDices[i] ? "black" : "steelblue";
        }
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }
       
    function getIconColor(i) {
        return selectedIcons[i] ? "black" : "steelblue";
    }
    
    function selectIcon(i) {
       // setSelectedDices(new Array(NBR_OF_DICES + 1).fill(false, 1));
        let Icon = [...selectedIcons];      
        if(isBonus === true) {
            if(Icon[i] === false && i === pair1[1]) {
                setSelected(true)
                turnsleft = turnsleft - 1
                Icon[i] = selectedIcons[pair1[1]] = true; 
                setSelectedIcons(Icon);     
               if (1 === i && pair1[1] === i) {
                    setOne(NBR_OF_DICES * pair1[1])
                }
                else if (2 === i && pair1[1] === i) {
                    setTwo(NBR_OF_DICES * pair1[1])
                }
                else if (3 === i && pair1[1] === i) {
                    setThree(NBR_OF_DICES * pair1[1])
                }
                else if (4 === i && pair1[1] === i) {
                    setFour(NBR_OF_DICES * pair1[1])
                }
                else if (5 === i && pair1[1] === i) {
                    setFive(NBR_OF_DICES * pair1[1])
                }   
                else if (6 === i && pair1[1] === i) {
                    setSix(NBR_OF_DICES * pair1[1])
                } 
                CheckBonus();      
            } else if (Icon[i] === true) { 
                setStartText("You already selected points for " + i + ".")
            } else {
                setStartText("Select correct number.")
            }
        } else {   
            if(numberOfThrowsLeft > 0) {
                setStartText("Throw " + numberOfThrowsLeft +  " times before setting points.")
            } else {
                if(Icon[i] === false && (pair1[selectedDices.indexOf(true)] === i)){ // katotaan onko dice ja icon sama luku icon === false tarkoittaa että sitä ei ole valittu kerran
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
/*             if(pair1[1] === 1){
                setOne(5)
            } 
            if(pair1[1] === 2){
                setTwo(10)
            } 
            if(pair1[1] === 3){
                setThree(15)
            } 
            if(pair1[1] === 4){
                setFour(20)
            } 
            if(pair1[1] === 5){
                setFive(25)
            } 
            if(pair1[1] === 6){
                setSix(30)
            } 
            setNumberOfThrowsLeft(0)
            selectedIcons[pair1[1]] = true;     */
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
/*         for (let i = 0; i < NBR_OF_DICES + 1; i++) {
        let randomNumber = Math.floor(Math.random() * 6  + 1);
        board[i] = 'dice-' + randomNumber;
        pair1[i] = randomNumber;       
        setNumberOfThrowsLeft(NBR_OF_THROWS - 1)
        }   */
    }

    function throwDices() {
        if (turnsleft === 0 && numberOfThrowsLeft === 0) {
            resetGame()
        } else {
            const values = (currentValue) => currentValue === false;
    /*         if(isBonus === true) {
                setIsBonus(false)
                for (let i = 0; i < NBR_OF_DICES + 1; i++) {
                    let randomNumber = Math.floor(Math.random() * 6  + 1);
                    board[i] = 'dice-' + randomNumber;
                    pair1[i] = randomNumber;       
                    setNumberOfThrowsLeft(NBR_OF_THROWS - 1)
                    } 
                console.log("asdasd")
            } */
                console.log(selected)
            if (selectedDices.every(values) === false && numberOfThrowsLeft > 0 || numberOfThrowsLeft === 3 || isBonus === true|| selected === true) {  // katotaan onko kaikki dices false jos false niin sitten päästääteittää
                setNumberOfThrowsLeft(numberOfThrowsLeft - 1);  
                setSelected(false)                
                resetBoard()
                for (let i = 0; i < NBR_OF_DICES; i++) {
                    if(!selectedDices[i]) {
                        let randomNumber = Math.floor(Math.random() * 6  + 1);
                        board[i] = 'dice-' + randomNumber;
                        pair1[i] = randomNumber;
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
            console.log("android");
            setIsAndroid(true);
          } else if (Platform.OS === 'web') {
            console.log("web");
            setOutersize(20);
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
           // resetGame()
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
                key={"doubles" + i} //vaihoinko turhaa row
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
                    <View style={style.flex}>{row}</View>
                    <Text style={style.gameinfo}>Throws left: {numberOfThrowsLeft}</Text>
                    <Text style={style.gameinfo}>{startText}</Text>
                    <Pressable style={style.button} onPress={()=>throwDices()}>
                        <Text style={style.buttonText}>Throw dices</Text>
                    </Pressable>
                    <Text>Total: {total}</Text>
                    <Text>Turns left: {turnsleft}</Text>
                    <Text>{isEnabled ? bonustext[0].bonus : bonustext[0].wait}</Text>
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
{/*                             <Col size={Innersize}><Text>{one}</Text><Row><Text>{doubles[0]}</Text></Row></Col>
                            <Col size={Innersize}><Text>{two}</Text><Row><Text>{doubles[1]}</Text></Row></Col>
                            <Col size={Innersize}><Text>{three}</Text><Row><Text>{doubles[2]}</Text></Row></Col> 
                            <Col size={Innersize}><Text>{four}</Text><Row><Text>{doubles[3]}</Text></Row></Col> 
                            <Col size={Innersize}><Text>{five}</Text><Row><Text>{doubles[4]}</Text></Row></Col>
                            <Col size={Innersize}><Text>{six}</Text><Row><Text>{doubles[5]}</Text></Row></Col> */}
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
/* 
return (
    <View style={style.gameboard}>
        <View style={style.flex}>{row}</View>
        <Text style={style.gameinfo}>Throws left: {numberOfThrowsLeft}</Text>
        <Text style={style.gameinfo}>{startText}</Text>
        <Pressable style={style.button} onPress={()=>throwDices()}>
            <Text style={style.buttonText}>Throw dices</Text>
        </Pressable>
        <Text>Total: {total}</Text>
        <Text>Turns left: {turnsleft}</Text>
        <Text>{isEnabled ? bonustext[0].bonus : bonustext[0].wait}</Text>
        <View style={style.gamestats}>
            <Grid>     
                <Row size={20}>
                    {doublenumbers}
                </Row>
                <Row size={25}>
                    {doubles}  
                </Row> 
            </Grid>
        </View>
        <Pressable style={style.button} onPress={() => resetGame()}>
            <Text style={style.buttonText}>Reset Game</Text>
        </Pressable>
    </View>
)
} */



{/* <View style={style.gameboard}>
<Grid>
    <Row size={1}>                
        <View style={style.flex}>{row}</View>   
        <Text style={style.gameinfo}>Throws left: {numberOfThrowsLeft}</Text>            
    </Row>
    <Row size={1}>
        <Text style={style.gameinfo}>{startText}</Text>
    </Row>
    <Row size={2}>        
        <Pressable style={style.button} onPress={()=>throwDices()}>
            <Text style={style.buttonText}>Throw dices</Text>
        </Pressable>
    </Row>
    <Row size={1}>
        <Text>Total: {total}</Text>
    </Row>         
    <Row size={1}>
        <Text>Turns left: {turnsleft}</Text>
    </Row>
    <Row size={2}>
        <Text>{isEnabled ? bonustext[0].bonus : bonustext[0].wait}</Text>
    </Row>                   
    <Row size={1}>
        {doublenumbers}
    </Row>
    <Row size={2}>
        {doubles}  
    </Row>                 
</Grid>
</View> */}






/* 


return (
    <View style={style.gameboard}>
        <View style={style.flex}>{row}</View>
        <Text style={style.gameinfo}>Throws left: {numberOfThrowsLeft}</Text>
        <Text style={style.gameinfo}>{startText}</Text>
        <Pressable style={style.button} onPress={()=>throwDices()}>
            <Text style={style.buttonText}>Throw dices</Text>
        </Pressable>
        <Text>Total: {total}</Text>
        <Text>Turns left: {turnsleft}</Text>
        <Text>{isEnabled ? bonustext[0].bonus : bonustext[0].wait}</Text>
            <Grid style={style.gamestats} size={5}>     
                <Row>
                    <Col size={20}><Text>{one}</Text></Col>
                    <Col size={20}><Text>{two}</Text></Col>
                    <Col size={20}><Text>{three}</Text></Col> 
                    <Col size={20}><Text>{four}</Text></Col> 
                    <Col size={20}><Text>{five}</Text></Col>
                 <Col style={{paddingLeft: 10}} size={20}><Text>{one}</Text></Col>
                    <Col style={{paddingLeft: 10}} size={10}><Text>{two}</Text></Col>
                    <Col style={{paddingLeft: 10}} size={10}><Text>{three}</Text></Col> 
                    <Col style={{paddingLeft: 10}} size={10}><Text>{four}</Text></Col> 
                    <Col style={{paddingLeft: 10}} size={10}><Text>{five}</Text></Col>
                    <Col style={{paddingLeft: 10}} size={10}><Text>{six}</Text></Col>            
                </Row>
                <Row>
                    {doubles}  
                </Row> 
            </Grid>
        <Pressable style={style.button} onPress={() => resetGame()}>
            <Text style={style.buttonText}>Reset Game</Text>
        </Pressable>
    </View>
)
} */


{/* 
                        <Col size={10}></Col>     
                        <Col size={2}><Text>{one}</Text><Row>{doubles[0]}</Row></Col>
                        <Col size={2}><Text>{two}</Text><Row>{doubles[1]}</Row></Col>
                        <Col size={2}><Text>{three}</Text><Row>{doubles[2]}</Row></Col> 
                        <Col size={2}><Text>{four}</Text><Row>{doubles[3]}</Row></Col> 
                        <Col size={2}><Text>{five}</Text><Row>{doubles[4]}</Row></Col>
                        <Col size={2}><Text>{six}</Text><Row>{doubles[5]}</Row></Col>
                        <Col size={10}></Col>    */}
{/*                     <Col style={{paddingLeft: 10}} size={20}><Text>{one}</Text></Col>
                        <Col style={{paddingLeft: 10}} size={10}><Text>{two}</Text></Col>
                        <Col style={{paddingLeft: 10}} size={10}><Text>{three}</Text></Col> 
                        <Col style={{paddingLeft: 10}} size={10}><Text>{four}</Text></Col> 
                        <Col style={{paddingLeft: 10}} size={10}><Text>{five}</Text></Col>
                        <Col style={{paddingLeft: 10}} size={10}><Text>{six}</Text></Col>    */} 