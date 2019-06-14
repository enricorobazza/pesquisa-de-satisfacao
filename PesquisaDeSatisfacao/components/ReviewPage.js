import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import {SafeAreaView} from 'react-navigation';

const images = [
  require('../imgs/Ativo1.png'),
  require('../imgs/Ativo2.png'),
  require('../imgs/Ativo3.png'),
  require('../imgs/Ativo4.png'),
  require('../imgs/Ativo5.png'),
  require('../imgs/Ativo6.png'),
  require('../imgs/Ativo7.png'),
  require('../imgs/Ativo8.png'),
  require('../imgs/Ativo9.png'),
  require('../imgs/Ativo10.png'),
];
var screenHeight = Dimensions.get('screen').height;
var screenWidth = Dimensions.get('screen').width;
const Portrait = false, Landscape = true;

class Option{
  constructor(text, imgs, next, buttonText)
  {
    this.text = text;
    this.images = imgs;
    this.next = next;
    if(buttonText) 
      this.buttonText = buttonText;
  }
}

options = []
options.push(new Option("O que você achou da sua estadia aqui conosco?", [1, 3, 2],[1,2,3]));
options.push(new Option("Que legal!!\nFicamos muito felizes com isso.", [4], [4], "Continuar"));
options.push(new Option("Obrigado por avaliar!", [5], [5], "Continuar"));
option = new Option("Poxa, que pena! Desculpe-nos por isso.", [6], [6], "Continuar");
option.smallText = "Sentimos muito que sua experiência aqui conosco não foi a que desejamos nem a que tanto nos preparamos para lhe oferecer.";
options.push(option);
options.push(new Option("Que tal contar para mais pessoas como foi se hospedar aqui conosco?", [7], [], "Clique e acesse o Trip Advisor, é bem rápido."));
options.push(new Option("Ficou alguma dúvida?\nQuer dar alguma sugestão?", [8], [], "Clique aqui e deixe seu recado!"));
options.push(new Option("Você quer falar\ncom nossa gerente?", [9], [], "Clique aqui e ela receberá uma mensagem para vir lhe encontrar."));


export default class ReviewPage extends Component {
  _isMounted = false;


  constructor(props) {
    super(props);

    var height = Dimensions.get('screen').height;
    var width = Dimensions.get('screen').width;
    var isLandscape = (width<height) ? Portrait: Landscape;
    this.state = {
      isLandscape:isLandscape,
      op: 0
    };
  }

  imageClick(op){
    if(options[op] && this._isMounted)
    this.setState({op: op});
  }


  render() {
    return (
      <SafeAreaView style = {styles.container}> 
        <Text style={styles.welcome}>{options[this.state.op].text}</Text>
        <View style={this.state.isLandscape ? styles.img_container_ls : styles.img_container}>
            {options[this.state.op].images.map(function(image,i){
              return(
                <TouchableOpacity key={i} onPress={()=>this.imageClick(options[this.state.op].next[i])}>
                  <Image source={images[image]} 
                style={this.state.isLandscape ? styles.face_ls : styles.face}/>
                </TouchableOpacity>
              )
            }, this)}
        </View>
        {
          (options[this.state.op].smallText)
            ? <Text style={styles.smallText}>{options[this.state.op].smallText}</Text>
            : null
        }
        {
          (options[this.state.op].buttonText) 
            ? <Button onPress={()=>this.imageClick(options[this.state.op].next[0])} backgroundColor="#fff" title={options[this.state.op].buttonText}></Button> 
            : null
        }
      </SafeAreaView>
    );
  }

  componentDidMount(){
    this._isMounted = true;

    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if(width<height){
        // Portrait Mode
        this.setState({isLandscape: Portrait});
      }
      else{
        // Landscape Mode
        this.setState({isLandscape: Landscape});
      }
    });
  }

}

const styles = StyleSheet.create({
    container: {
      padding: 30,
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#141f78'
    },
    img_container:{
      flex:1, 
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    img_container_ls:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: screenWidth
    },
    face: {
      width: screenHeight/6, 
      height: screenHeight/6, 
    },
    face_ls:{
      width: screenWidth/6, 
      height: screenWidth/6, 
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#fff'
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    smallText:{
      marginBottom:30,
      textAlign: 'center',
      color:'#fff',
    }
  });