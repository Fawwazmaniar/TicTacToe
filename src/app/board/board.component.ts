import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  animations: [
    trigger('flipState', [
      state('true', style({
        transform: 'rotateY(179deg)'
      })),
      state('false', style({
        transform: 'rotateY(0)'
      })),
      transition('false => true', animate('500ms ease-in')),
      transition('true => false', animate('500ms ease-out'))
    ])
  ]
})
export class BoardComponent implements OnInit {

  players = ["X", "O"]

  currentPlayer: string = '';
  gameComplete: boolean = false;

  gameWinner: string = '';
  boardSquares: any[] = []; 

  constructor() {
  }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.currentPlayer = this.players[0];
    this.gameComplete = false;
    this.gameWinner = '';
    this.boardSquares = [
      {
        id: 1,
        isFlipped: 'false',
        player: '',
      },
      {
        id: 2,
        isFlipped: 'false',
        player: '',
      },
      {
        id: 3,
        isFlipped: 'false',
        player: '',
      },
      {
        id: 4,
        isFlipped: 'false',
        player: '',
      },
      {
        id: 5,
        isFlipped: 'false',
        player: '',
      },
      {
        id: 6,
        isFlipped: 'false',
        player: '',
      },
      {
        id: 7,
        isFlipped: 'false',
        player: '',
      },
      {
        id: 8,
        isFlipped: 'false',
        player: '',
      },
      {
        id: 9,
        isFlipped: 'false',
        player: '',
      }];
  }

  squareFlipped(square: any) {
    if (square.isFlipped === 'false') {
      let squareIndex = this.boardSquares.findIndex(x => x.id === square.id);
      this.boardSquares[squareIndex].isFlipped = 'true';
      this.boardSquares[squareIndex].player = this.currentPlayer;
      this.currentPlayer = this.players[0] === this.currentPlayer ? this.players[1] : this.players[0];
      this.checkValid();
    }
  }

  checkValid() {
    let xCount = 0, oCount = 0;

    for (let board of this.boardSquares) {
      if (board.player === 'X')
        xCount++;

      if (board.player === 'O')
        oCount++;
    }

    if (xCount === oCount || xCount == oCount + 1) {
      if (this.checkWinner('X')) {
        this.gameWinner = 'X';
        this.gameComplete = true;
      } else if (this.checkWinner('O')) {
        this.gameWinner = 'O';
        this.gameComplete = true;
      }
    }
     this.gameComplete = this.boardSquares.every(x => x.isFlipped === 'true');
  }

  checkWinner(playerName: string) {
    let winningCombinations = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
    ]

    let Combinations = this.boardSquares.filter(x => x.player === playerName).map(e => {
      return e.id;
    });

    if (Combinations.length > 2) {
      for (var i = 0; i < Combinations.length - 1; i++) {
        for (var j = i + 1; j < Combinations.length; j++) {
          for (var k = j + 1; k < Combinations.length; k++) {
            if (this.checkArrayinArray(winningCombinations, [Combinations[i], Combinations[j], Combinations[k]])) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  checkArrayinArray(arr: any, item: any) {
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function (ele: any) {
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }


}
