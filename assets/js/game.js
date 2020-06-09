// function to generate a random numeric value
var randomNumber = function(min,max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
  };

var fight = function(enemy) {
    while(enemy.health > 0 && playerInfo.health > 0) {
                // Alert users that they are starting the round.
        //window.alert("Welcome to Robot Gladiators");
        
        // Ask user if they'd like to fight or run
        var promptFight = window.prompt(" Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose. ");

        // If player choses to skip then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
            // Confirm user wants to skip
            var confirmSkip = window.confirm(" Are you sure you'd like to quit? ");

            // If yes (true), leave fight
            if (confirmSkip) {
                window.alert (playerInfo.name + " has decided to skip this fight. Goodbye! ");
                // Subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        
        enemy.health = Math.max(0, enemy.health - damage);
        console.log (
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining. " 
        );

        // Check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died! ");
            
            // Award player money for winning
            playerInfo.money = playerInfo.money + 20;

            // Leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left. ");
        }

        // Remove player's health by subtracting the amount set in the enemy.attack variable.
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log (
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
        );

        // Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // Leave while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left. ");
        }
    } 
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 units.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 units.");
            this.attack +=6;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money!");
        } 
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
       name: "Robo Trumble",
       attack: randomNumber(10,14) 
    }
    
];

// Function to start a new game
var startGame = function() {
    // Reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // Lets user know what round they are in
            window.alert(" Welcome to Robot Gladiators! Round " + ( i + 1 ) );

            // Pick new enemy to fight based on index
            var pickedEnemyObj = enemyInfo[i];

            // Reset enemy.health before starting new fight
            //enemy.health = Math.floor(Math.random() * 21) + 40;
            pickedEnemyObj.health = randomNumber(40,60);
            // Use debugger to pause script
            // debugger;

            // Pass pickedenemy.name variable's value into fight function
            fight(pickedEnemyObj);

           
            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if user wants to use shop
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                    
                 // if yes, take them to store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert(" You have lost your robot in battle! Game Over! ");
            break;
        }
    }   
    // play again
    endGame();
};

// Function to end the entire game
var endGame = function() {
    // if player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert(" Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert(" You've lost your robot in battle.");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    
    if (playAgainConfirm) {
        // restart game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function(){
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt ("would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
            
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

startGame();
fight();