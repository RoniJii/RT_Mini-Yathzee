import react, {useEffect, useState} from 'react'
import {Text, View, Platform} from 'react-native'
import style from '../style/style'
import styles from '../style/style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function footer() {
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'android') {
           setIsAndroid(true);
         } 
        }, [])
    return (
        <View style={isAndroid ? styles.footerAndroid : styles.footer}>
            <View style={styles.footerIcons}>
                <View style={styles.footerMint}>
                    <MaterialCommunityIcons style={styles.footerIcon} name="linux-mint" size={24} color="rgba(0, 255, 100, 0.9)" />
                    <Octicons style={styles.footerIcon} name="file-directory" size={24} color="rgba(0, 255, 100, 0.9)" />
                    <FontAwesome style={styles.footerIcon} name="firefox" size={24} color="rgba(255, 30, 30, 0.9)" />   
                    <MaterialCommunityIcons style={styles.footerIcon} name="console" size={24} color="rgba(0, 255, 100, 0.9)" />
                </View>
{/*                 <Text style={style.author}>
                Author: Roni Junttila
                </Text> */}
                <View style={styles.footerSpacer}></View>
                
                <View style={styles.footerLastItems}>
                    <Feather style={styles.footerVolume} name="volume-x" size={24} color="rgba(255, 255, 255, 0.9)" />
                        <View style={styles.footerLastItem}>
                            {(function() {
                                    if (new Date().getMinutes(new Date().getMinutes()) < 10) {
                                        return <Text style={styles.footerClock} >{new Date().getHours()}.0{new Date().getMinutes()}</Text>
                                    } else {
                                        return <Text style={styles.footerClock}>{new Date().getHours()}.{new Date().getMinutes()}</Text>
                                    }
                            })()}       
                            <Text style={styles.footerClock}>{new Date().getDate()}.{new Date().getMonth() + 1}.{new Date().getFullYear()}</Text>
                        </View>
                </View>
            </View>
        </View>
    )
} //https://www.npmjs.com/package/react-native-linear-gradient