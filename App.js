import { View } from 'react-native';
import Header from './components/Header'
import Footer from './components/Footer'
import Gameboard from './components/Gameboard'
import styles from './style/style'
import { LinearGradient } from 'expo-linear-gradient';
import {useFonts} from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    'Ubuntu-Light': require('./assets/fonts/Ubuntu-Light.ttf')
  })
  
  if(!loaded) {
    return null;
  }
  
  return (
    <LinearGradient
        colors={['rgba(158,4,107,0.8)', 'rgba(250,0,54,0.8)']}
        style={styles.container}>
        <View style={styles.container}>
          <Header />
          <Gameboard />
          <Footer />
        </View>
    </LinearGradient>
  );
}
