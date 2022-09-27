import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, Pressable} from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import style from '../style/style'
import { Col, Row, Grid } from "react-native-easy-grid";

const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NumberOfIcons = 6;
let turnsleft = 6;
let board = []
let pair1 = []
let sum = 0;


export default function Gameboard() {

    // elegantimpi tapa miten asetetaan nuo dot valuet, poista dotin klikkaamis mahdollisuus kun se on mustana, 
    //bonus edellee kertaantuu
    //reset game button??? 
    // Fill array on 0 - 5 siksi ei rekisteröi 6
    //bonusta ei rekisteröidä enää
    //bonus pisteiden lasku, mahdollisesti array ratkaisu
    //align kunnolla nuo pisteet
    // voisko pisteet olla peräti object jota päivitetään 
    //kun saa boonuksen lisää pisteet
    /* {1, 
    <Row style={{paddingLeft: 10}}>: arvo: tms.</Row>,
    } */

    //boooooooooonukset saada toimimaan
    //selection pitäs vaan poistaa kun 
    //array

    const [numberOfThrowsLeft, setNumberOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES + 1).fill(false, 1));
    const [selectedIcons, setSelectedIcons] = useState(new Array(NumberOfIcons + 1).fill(false, 1));
    const [startText, setStartText] = useState("Throw dices");
    const [bonus, setBonus] = useState(63);
    const row = [];
    const [isBonus, setIsBonus] = useState(false);

    const [selected, setSelected] = useState(false)
    const allowtothrow = () => setSelected(prev => !prev)
    
    const [eka, setEka] = useState(0);
    const [toka, setToka] = useState(0);
    const [kolkku, setKolkku] = useState(0);
    const [nelkku, setNelkku] = useState(0);
    const [vilkku, setVilkku] = useState(0);
    const [kulkku, setKulkku] = useState(0);
    const rowwidth = "width: 100"

    const doublenumbers2 = [
    <Row style={{paddingLeft: 10}}>{eka}</Row>, 
    <Row style={{paddingLeft: 10}}>{toka}</Row>, 
    <Row style={{paddingLeft: 10}}>{kolkku}</Row>, 
    <Row style={{paddingLeft: 10}}>{nelkku}</Row>, 
    <Row style={{paddingLeft: 10}}>{vilkku}</Row>, 
    <Row style={{paddingLeft: 10}}>{kulkku}</Row>
    ]

   // const listItems = numbers.map((doublenumbers) =>  <Row>{doublenumbers}</Row>);

// indexOf
/*     for (i = 0; i < 5; i++) {
        if (selectedDices[i] === true) {
            console.log(pair1[i], selectedDices[i])
           
        }

    }  */
    function calculate() {
        let choosenone = pair1[selectedDices.indexOf(true)]
      //  console.log(pair1[selectedDices.indexOf(true)])
        let multiplier = 0
       // if(!choosenone === undefined) {
            for (let x = 0; x < 5; x++) {
                if(pair1[x] === choosenone) {
                    //console.log(pair1[selectedDices.indexOf(true)]) Tää löytää sen mikä on valittu. Pair[i] i on se index millä etitään. Pairin sisältä pitäisi löytyy KAIKKI valitut numerot
                    sum = sum + pair1[x]
                    multiplier++
                } 
            }// console.log("total" + sum)
      //  }
        if (choosenone === 1) {
            setEka(choosenone * multiplier)
         //   console.log("eka" + eka)
          }
        if (choosenone === 2) {
            setToka(choosenone * multiplier)
          //  console.log("toka" + toka)
        }
        if (choosenone === 3) {
            setKolkku(choosenone * multiplier)
         //   console.log("kolmas" + kolkku)
        }
        if (choosenone === 4) {
            setNelkku(choosenone * multiplier)
           // console.log("neljäs" + nelkku)
        }
        if (choosenone === 5) {
            setVilkku(choosenone * multiplier)
           // console.log("vides" + vilkku)
        }   
        if (choosenone === 6) {
            setKulkku(choosenone * multiplier)
            //console.log("kuudes" + kulkku)
        }

    }


   // const throwTxt = () => setStartText(previousState => !previousState);

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
        let Icon = [...selectedIcons];      
        if(isBonus === true) {
            if(Icon[i] === false && i === pair1[1]) {
                turnsleft = turnsleft - 1
                Icon[i] = selectedIcons[pair1[1]] = true; 
                setSelectedIcons(Icon);
                turnsleft = turnsleft - 1
                CheckBonus()
                setBonus(bonus - sum)
                sum = sum + (pair1[1] * NBR_OF_DICES)          
                if (1 === i && pair1[1] === i) {
                    setEka(5)
                    //muista vaihtaa rnd number MOLEMPII throw ja check
                }
              else if (2 === i && pair1[1] === i) {
                    setToka(10)
                }
                else if (3 === i && pair1[1] === i) {
                    setKolkku(15)
                }
                else if (4 === i && pair1[1] === i) {
                    setNelkku(20)
                }
                else if (5 === i && pair1[1] === i) {
                    setVilkku(25)
                }   
                else if (6 === i && pair1[1] === i) {
                    setKulkku(30)
                }  
            } else if (Icon[i] === true) { 
                setStartText("You already selected points for " + i + ".")
            } else {
                setStartText("Select correct number.")
            }
        }
        

       if(numberOfThrowsLeft > 0) {
       setStartText("Throw " + numberOfThrowsLeft +  " times before setting points.")
                } else {
                // if(Icon[i] === false && true === (pair1[selectedDices.indexOf(true)] === i)){                   
                   //console.log((pair1[selectedDices.indexOf(true)] === i), i , pair1[selectedDices.indexOf(true)], "selected dices" + selectedDices)
                    //console.log("if lauseen kysymys" + pair1[selectedDices.indexOf(true)] === i)
                if(Icon[i] === false && (pair1[selectedDices.indexOf(true)] === i)){ // katotaan onko dice ja icon sama luku icon === false tarkoittaa että sitä ei ole valittu kerran
                    turnsleft = turnsleft - 1     
                    CheckBonus()
                    setBonus(bonus - sum)
                    setSelected(true) //Tulee yhden vuoron jäljessä, tuleeko?
                    Icon[i] = selectedIcons[i] = true; /// ? false : true;
                    setSelectedIcons(Icon);
                } else if (Icon[i] === true && isBonus === false) { 
                        setStartText("You already selected points for " + i + ".")
                } else {                
                        setStartText("Select correct number.")
                }            
        }
    }


    function IsBonus() {
            if (board.every((val, i, arr) => val === arr[0])) { 
                setIsBonus(true);
                resetBoard();
                calculate();
                GameState();
                setNumberOfThrowsLeft(0);
        }
    }


    function CheckBonus() {
        calculate()
        setIsBonus(false)
       // setBonus(bonus - sum)
        GameState()  
        setSelectedDices(new Array(NBR_OF_DICES + 1).fill(false, 1));
        //console.log(selectedDices)   
        for (let i = 0; i < NBR_OF_DICES + 1; i++) {
        let randomNumber = Math.floor(Math.random() * 6  + 1);
        board[i] = 'dice-' + randomNumber;
        pair1[i] = randomNumber;       
        //console.log(selectedDices[i])
        setNumberOfThrowsLeft(NBR_OF_THROWS - 1)
        }

    }

    function resetGame() {
        turnsleft = 6;
        sum = 0;
        
    }

    function throwDices() {
/*         if(numberOfThrowsLeft === 0) {
            for(let i = 1; i < selectedDices.length + 1; i++) {
                selectedDices[i] = false;
            }   
        } */
        const numba = (currentValue) => currentValue === false;
        //console.log(selectedDices.every(numba))
        console.log(isBonus)
        if (numberOfThrowsLeft === 0) {
            turnsleft = turnsleft - 1; 
        }
        if (selectedDices.every(numba) === false && numberOfThrowsLeft > 0 || numberOfThrowsLeft === 3 || isBonus === true) {  // katotaan onko kaikki dices false jos false niin sitten päästääteittää
             setNumberOfThrowsLeft(numberOfThrowsLeft - 1);            
          //  console.log(selectedDices.every((numba))) //ei päästetää vaa annetaan teksti please select dice for throwing again ???? jättää kysymyksen tarvitaanko selected??? 
            setSelected(false);
            resetBoard()
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if(!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6  + 1);
                    board[i] = 'dice-' + randomNumber;
                    pair1[i] = randomNumber;
                } 
            }
       // } else (setStartText("Please select dices before throwing again"))
            IsBonus();
        } else if (numberOfThrowsLeft === 0) { 
            setStartText("Please select points before starting a new round. ")         
        } else { 
            setStartText("Select at least one dice before throwing again. ")
        }
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
                    setStartText("Throw dices.")
                   // turnsleft = turnsleft - 1; ////////////tälle joku järkevä päivä
                }
                else if (numberOfThrowsLeft >= 1) {
                    setStartText('Select dices and throw dices again.')
                    
                } else if (numberOfThrowsLeft === 0) {
                    setStartText('Select your points.');      
                  
            } 
    }

 
    useEffect(() => {
        GameState()
            //setSelected(false)
/*         if (numberOfThrowsLeft === 0) {
           //if not selected cannot throw 
           allowtothrow()
           console.log(selected ? true : false)
        } */



        if (bonus <= 0) {
            setBonus(0)
            setStartText("You got the bonus")
            setNumberOfThrowsLeft(0);
            board = [];
        }
        if (turnsleft === 0) {
            setStartText(' Game over. All points selected. ');
            setNumberOfThrowsLeft(0);
            board = [];
        }
        
        if(numberOfThrowsLeft < 0) {
            setNumberOfThrowsLeft(NBR_OF_THROWS - 1)
        }
    }, [numberOfThrowsLeft])


    //dices selectaaminen
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

    const doubles = [];

    for (let i = 1; i <= NumberOfIcons; i++) {
        doubles.push(    
            <Pressable
            key={"row" + i}
            onPress={() => selectIcon(i)}
            // onHoverIn={e(e: MouseEvent) => void}
            // onHoverIn={ (e: MouseEvent) => void;}
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
        <View style={style.gameboard}>
            <View style={style.flex}>{row}</View>
            <Text style={style.gameinfo}>Throws left: {numberOfThrowsLeft}</Text>
            <Text style={style.gameinfo}>{startText}</Text>
            <Pressable style={style.button} onPress={()=>throwDices()}>
                <Text style={style.buttonText}>Throw dices</Text>
            </Pressable>
            <Text>Total: {sum}</Text>
            <Text>Turns left: {turnsleft}</Text>
            <Text>You are {bonus} points away from bonus.</Text>
            <Grid>     
                 <Row size={20}>
                        {doublenumbers2}
                </Row>
                <Row size={25}>
                    {doubles}  
                </Row> 

            </Grid>
        </View>
    )
}