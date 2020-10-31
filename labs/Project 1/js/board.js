var app = new Vue({
    el: '#app',
    data:
    {
        player1: 1, 
        player2: 1,
        //list for index positions of beginning and end of snakes and ladders.
        snek_heads: [(3, 28), (26, 53), (33, 62)],
        ladder_bottoms: [(7, 11), (18, 35), (55, 59)] 
    },

    methods:
    {
      //This function will be used to control the die 
        roll: function (){
            //checks if player 1 or player 2 is going
            let playerNum = 0; 
            let counter = 0; 
            counter ++; 

            if (counter % 2 == 0)
            {
                //2 indicates player2
                let playerNum = 2; 
            }
            else
            {
                //1 indicates player1
                let playerNum = 1; 
            }
            
            //provides random number 1 - 6
            let dieRoll = Math.floor(Math.random() * 6) + 1; 

            //die roll will be sent to move piece to be able to move the piece
            pieceMove(dieRoll, playerNum); 
        },

        pieceMove: function (dieRoll, playerNum)
        {
          //code grabs the x and y coordinates of each player to be able to move them
            let coord = 0; 
            const play1 = this.$id["player1"].getBoundingClientRect();
            const play2 = this.$id["player2"].getBoundingClientRect();

            //switch case will be used to check index of player position. If in
            //certain row it will need to change x or y-coordinates or both in order 
            //to accommodate to die roll. 
            if (playerNum == 1)
            {
                player1 += dieRoll;
                this.player1 = play1.x;
                this.player1 = play1.y;

                //checks if position of player piece is on a snake or a ladder
                
                for(int i = 0; i < ladder_bottoms.length(); i++)
                {
                  if (player1 == ladder_bottoms[i][0])
                  {
                      player1 = ladder_bottoms[i][1];
                  }
                  else if(player2 == ladder_bottoms[i][0])
                  {
                    player2 = ladder_bottoms[i][1];
                  }
                }
                
                 //checks if position of player piece is on a snake or a ladder
                for(int i = 0; i < snek_heads.length(); i++)
                {
                  if (player1 == snek_heads[i][1])
                  {
                      player1 = snek_heads[i][0];
                  }
                  else if(player2 == snek_heads[i][1])
                  {
                    player2 = snek_heads[i][0];
                  }
                } 

                switch (Math.floor(player1/8)) {
                    case 0:
                      coord = 49.144 * player1; 
                      play1.x = play1.x + coord;   
                      break;
                    case 1:
                      coord =  49.144 * (player1 - 8) 
                      play1.x = play1.x + coord;  
                      play1.y = play1.y + 49.144;   
        
                      break;
                    case 2:
                        coord =  49.144 * (player1 - 16) 
                        play1.x = play1.x + coord;  
                        play1.y = play1.y + (49.144 * 2);   
                      break;
                    case 3:
                        coord =  49.144 * (player1 - 24) 
                        play1.x = play1.x + coord;  
                        play1.y = play1.y + (49.144 * 3);   
                      break;
                    case 4:
                        coord =  49.144 * (player1 - 32) 
                        play1.x = play1.x + coord;  
                        play1.y = play1.y + (49.144 * 4);   
                      break;
                    case 5:
                        coord =  49.144 * (player1 - 40) 
                        play1.x = play1.x + coord;  
                        play1.y = play1.y + (49.144 * 5);   
                      break;
                    case 6:
                        coord =  49.144 * (player1 - 48) 
                        play1.x = play1.x + coord;  
                        play1.y = play1.y + (49.144 * 6);   
                        break;
                  }   
                  
            }

            //switch case will be used to check index of player position. If in
            //certain row it will need to change x or y-coordinates or both in order 
            //to accommodate to die roll. 
            else 
            {
                let coord = 0;
                player2 += dieRoll
                this.player2 = play2.x; 
                this.player2 = play2.y; 

                switch (Math.floor(player2/8)) {
                  case 0:
                    coord = 49.144 * player2; 
                    play2.x = play2.x + coord;   
                    break;
                  case 1:
                    coord =  49.144 * (player2 - 8) 
                    play2.x = play2.x + coord;  
                    play2.y = play2.y + 49.144;   
              
                    break;
                  case 2:
                      coord =  49.144 * (player2 - 16) 
                      play2.x = play2.x + coord;  
                      play2.y = play2.y + (49.144 * 2);   
                    break;
                  case 3:
                      coord =  49.144 * (player2 - 24) 
                      play2.x = play2.x + coord;  
                      play2.y = play2.y + (49.144 * 3);   
                    break;
                  case 4:
                      coord =  49.144 * (player2 - 32) 
                      play2.x = play2.x + coord;  
                      play2.y = play2.y + (49.144 * 4);   
                    break;
                  case 5:
                      coord =  49.144 * (player2 - 40) 
                      play2.x = play2.x + coord;  
                      play2.y = play2.y + (49.144 * 5);   
                    break;
                  case 6:
                      coord =  49.144 * (player2 - 48) 
                      play2.x = play2.x + coord;  
                      play2.y = play2.y + (49.144 * 6);   
                      break;
                }   

                 
        }
    },

    checkWinner: function()
    {
        if(player1 >= 64)
        {
          print("Player 1 has won!");
        }
        else if(player2 >= 64)
        {
          print("Player 2 has won!"); 
        }
        else
        {
          this.roll(); 
        }
    }
  
    }
})
