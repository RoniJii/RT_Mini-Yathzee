import { StyleSheet } from 'react-native';

const black = "rgba(5, 5, 5, 0.9)";
const white = "rgba(255, 255, 255, 0.9)";
const firefoxWhite = "rgba(230, 230, 230, 1)"

export default StyleSheet.create({
  container: {
    flex: 1,
  },

//Headin tyylit
  header: {
    marginTop: 30,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  }, box: {
    shadowColor: 'rgba(0, 0, 0, 0.1',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,  
    elevation: 10,
    width: '50%',
    height: '70%',
    backgroundColor: black,
    alignSelf: 'center',
    marginTop: 100,
  }, 
  HeaderBox: {
    width: '50%',
    height:'5%',
    alignSelf: 'center',
    marginTop: 100,
  },
  HeaderBoxAndroid: {
    width: '90%',
    height:'5%',
    alignSelf: 'center',
    marginTop: 100,
  },
   tab: {
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 0,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
  tabIcons: {
    flexDirection: "row",
    marginTop: '1%',
    marginBottom: '1%',
    marginEnd: 10,
    flex: 2,
  },
  tabIcon: {
    marginRight: 5,
    alignItems: "flex-end",
    flexDirection: "row",
    marginTop: 5,
  },
  tabSpacer: {
    flex: 1/2 ,
  },
  tabFirefox: {
    flex:1/2,
    marginLeft: 10,
    alignSelf: 'flex-start',
    flexDirection: "row",
  },  title: {
    fontFamily: 'Ubuntu-Light',
    color: white,
    marginStart: 10,
    fontSize: 13,
    lineHeight: 30, 
    marginEnd: 10,
  }, border: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    marginStart: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: white,
  },borderActive: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginStart: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: white,
  },

//Footerin tyylit
  footer: {
    marginTop: "10%",
    backgroundColor: black,
    flexDirection: 'row'
  },
  footerAndroid: {
    paddingTop: 5,
    paddingBottom: 1,
    marginTop: "45%",
    backgroundColor: black,
    flexDirection: 'row'
  }, 
  footerIcons: {
    flexDirection: "row",
    marginTop: '0.5%',
    marginBottom: '0.5%',
    flex: 3,
  }, 
  footerMint: {
    flexDirection: 'row',
    flex:1/3,
    alignSelf: 'flex-start',
  },
  footerIcon: {
    flexDirection: 'row',
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
   footerSpacer: {
   flex:1,
  },
  footerLastItems: {
    flexDirection: 'row',
    alignSelf:'flex-end'
  },
  footerLastItem:{
    marginEnd: 10,
  },
  footerVolume: {
    marginEnd: 15,
    color: white, 
  },
  footerClock: {
    color: white,
    textAlign: 'center',
  },




  author: {
    flex:1/3,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',

  },
  gameboard: {
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  gameboardAndroid: {
    width: "90%",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  gameinfo: {
    fontFamily: 'Ubuntu-Light',
    marginBottom: 5,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },
  item: {
    margin: 15,
    padding: 5
  },
  flex: {
    flexDirection: "row",
  },
  flexAndroid: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "rgba(250,0,54,0.8)",
    width: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderStartColor: "rgba(0, 0, 0, 0.1)",
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderTopColor: "rgba(5, 5, 5, 0.0)",
    borderEndColor: "rgba(5, 5, 5, 0.0)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontSize: 20,
    fontFamily: 'Ubuntu-Light',
  },
  gamestats: {
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    backgroundColor: firefoxWhite,
    width: "50%",
    flex: 1,
    paddingTop: 50,
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  gamestatsAndroid: {
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    backgroundColor: firefoxWhite,
    width: "90%",
    flex: 1,
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  gamedots: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  androidIconPadding: {
    fontFamily: 'Ubuntu-Light',
    paddingEnd: 20 
  }, 
  pcIconPadding: {
    fontFamily: 'Ubuntu-Light',
    paddingStart: 10 
   }, 
   linearGradient: {
    flex: 1,
    alignSelf: 'stretch',
    paddingRight: 15,
  },
  gameboardAuthor: {
    fontFamily: 'Ubuntu-Light',
    color: white,
    textAlign: 'center',
    marginStart: 10,
    fontSize: 13,
    lineHeight: 30, 
    marginEnd: 10,
  },  gameboardFooter: {
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(25, 25, 25, 1)',
    backgroundColor: 'rgba(25, 25, 25, 1)'
  },
  gametext: {
    fontFamily: 'Ubuntu-Light',  
    fontSize: 13,
  }
});