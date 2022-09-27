import react, {useEffect, useState} from 'react'
import {Platform} from 'react-native'
import {Text, View} from 'react-native'
import style from '../style/style'
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function header() {
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'android') {
           setIsAndroid(true);
         } 
        }, [])

    return(
            <View style={isAndroid ? style.HeaderBoxAndroid : style.HeaderBox}>
                <View style={style.tab}>
                    <View style={style.tabIcons}> 
                    <View style={style.tabFirefox}>                
                        <FontAwesome  name="firefox" size={16} color="rgba(255, 30, 30, 0.9)" />
                        <View style={style.borderActive}>
                                <Text style={style.title}>
                                    Mini-Yathzee 
                                </Text>
                            </View>
                        </View>
                            <View style={style.tabSpacer}></View>
                            <FontAwesome5 style={style.tabIcon} name="window-minimize" size={16} color="rgba(255, 255, 255, 0.9)" />
                            <FontAwesome5 style={style.tabIcon} name="window-restore" size={16} color="rgba(255, 255, 255, 0.9)" />
                            <EvilIcons style={style.tabIcon} name="close" size={16} color="rgba(255, 255, 255, 0.9)" />
                    </View>
                </View>
            </View>

    )
}