import React from 'react';
import './App.css';

function Square(props) {
  console.log(props)
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    console.log(this.props.squares[i])
    return (
      <Square
      key={i}
      value = {this.props.squares[i]}
      onClick = {() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {
            [0, 1, 2].map(v => this.renderSquare(v))
          }
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: [...history, ...[{squares:squares}]],
      xIsNext: !this.state.xIsNext,
      stepNumber: 0
    })
    console.log(this.state.history)
  }

  jumpTo(i){
    this.setState({
      stepNumber: i,
      xIsNext: i%2 === 0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    const status = winner ? `Winner is ${winner}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    const moves = history.map((step, move) =>{
      const desc = move ? `Go to move # ${move}` : `Go to start`;
      return(
        <li key={move}>
          <button onClick={() =>this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) =>{this.handleClick(i)}} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function App() {
  return ( 
    <Game/>
  )
}

export default App;
