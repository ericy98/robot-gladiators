var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = "50";
var enemyAttack = "12";

// Function to start a new game
var startGame = function() {
    // Reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // Lets user know what round they are in
            window.alert(" Welcome to Robot Gladiators! Round " + ( i + 1 ) );

            // Pick new enemy to fight based on index
            var pickedEnemyName = enemyNames[i];

            // Reset enemyHealth before starting new fight
            enemyHealth = 50;
            // Use debugger to pause script
            // debugger;

            // Pass pickedEnemyName variable's value into fight function
            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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

var fight = function(enemyName) {
    while(enemyHealth > 0 && playerHealth > 0) {
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
                window.alert (playerName + " has decided to skip this fight. Goodbye! ");
                // Subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        // Remove enemy's health by subtracting the amount set in the playerAttack variable.
        enemyHealth = enemyHealth - playerAttack;
        console.log (
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining. " 
        );

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died! ");
            
            // Award player money for winning
            playerMoney = playerMoney + 20;

            // Leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left. ");
        }

        // Remove player's health by subtracting the amount set in the enemyAttack variable.
        playerHealth = playerHealth - enemyAttack;
        console.log (
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. "
        );

        // Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // Leave while() loop if player is dead
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left. ");
        }
    } 
};

// Function to end the entire game
var endGame = function() {
    // if player is still alive, player wins
    if (playerHealth > 0) {
        window.alert(" Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 units.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            
            break;

        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 units.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            
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