import React, {Component} from 'react';

import data from "./data.json";
import Nav from "./components/Nav";
import Jumbotron from './components/Jumbotron';
import {GameContainer, Game} from "./components/Game";
// import Characters from "./components/Characters"
import './App.css';

class App extends Component {

  state = {
    score: 0,
    highScore: 0,
    message: "Welcome to the Clicky Game. Click an Image to Begin!",
    data: data.sort(() => Math.random() - 0.5)
  }

  componentDidMount(){
    console.log(this.state);
  }

  componentDidUpdate(){
    console.log(this.state);
  }

  handleClick = item => {
    // let stateArray = this.state.data;
    let stateArray = this.state.data.slice();

    if(!item.clicked){
      console.log("Item has not been clicked");

      for(let i = 0; i < stateArray.length; i++){
        if(stateArray[i].id === item.id){
          console.log("found our match!");

          stateArray[i].clicked = true;
        }
      }

      this.setState({
        score: this.state.score + 1,
        highScore: this.checkHighScore(),
        message: "You got a point!, Keep clicking!",
        data: stateArray.sort(() => Math.random() - 0.5)
      })
    }
    else{
      console.log("this item has already been clicked, game over");

      for(let i = 0; i < data.length; i++){
        data[i].clicked = false;
      }

      this.setState({
        score: 0,
        highScore: this.checkHighScore(),
        message: "You already clicked that image! Start over",
        data: data.sort(() => Math.random() - 0.5)
      })
    }
  }

  checkHighScore(){
    if(this.state.score === this.state.data.length){
      return this.state.score
    }
    else if(this.state.highScore === this.state.score){
      return this.state.score + 1;
    }
    else {
      return this.state.highScore
    }
  }

 



  render() {
    return (
      <div className="App">
        <Nav message={this.state.message} score={this.state.score} highScore={this.state.highScore} />
          <Jumbotron />
            <GameContainer>
              {this.state.data.map(item =>{
                return (
                  <Game 
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    handleClick={this.handleClick}
                    clicked={item.clicked}
                  />
                );
              })}

            </GameContainer>
      </div>
    );
  }
}

export default App;



