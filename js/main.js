/* Ready To Rumble */

$(document).ready(function() {

    // Fighter object constructor
    function Fighter(name, health, damagePerAttack, special, avatar) {
        this.name = name;
        this.health = health;
        this.damagePerAttack = damagePerAttack;
        this.special = special;
        this.avatar = avatar;
        this.toString = function() {
            return this.name;
        }
    }

    // Create fighters
    var ryan = new Fighter('Ryan', 110, 24, 'Triple Punch', 'img/Ryan.png');
    var xavier = new Fighter('Xavier', 100, 14, 'Troll Attack', 'img/Ryan.png');
    var aaron = new Fighter('Aaron', 145, 17, 'Black Mamba', 'img/Aaron.png');
    var totor = new Fighter('Totor', 90, 14, 'Equarissage', 'img/Ryan.png');
    var crispy = new Fighter('Crispy', 100, 16, 'Axe Throw', 'img/Crispy.png');
    var chuck = new Fighter('Chuck Norris', 9999, 99, 'Round House Kick', 'img/Ryan.png');

    //Global variable
    fightersArray = [ryan, aaron, totor, chuck, xavier, crispy];

    // Create the list of fighters for user to select
    function fightersList(fightersArray) {
        var $select = $('.fighter-list');
        for (var fighter = 0; fighter < fightersArray.length; fighter++) {
            $option = $('<option></option>');
            $option.attr('value', fightersArray[fighter].name.toLowerCase());
            $option.append(fightersArray[fighter].name);
            $select.append($option);
        }
    }
    // End document ready

    // Draw Game Window Function
    function drawWindow() {
        var $player1Div = $('<div id="player1-Div"><h2 id="player1-name">Player 1</h2><p id="player1-hp">0 HP</div>');
        var $player2Div = $('<div id="player2-Div"><h2 id="player2-name">Player 2</h2><p id="player2-hp">0 HP</div>');
        var $outputDiv = $('<div id="outputDiv"></div>')
            //Display
        $('.game-window').append($player1Div);
        $('.game-window').append('<div class="middle"><h3>VS</h3><h4>FIGHT !</h4>');
        $('.game-window').append($player2Div);
        $('.output').append($outputDiv);
    }

    fightersList(fightersArray.sort());
    drawWindow();

});

// Get the selected players and refresh window with their information

function run() {
    // Get the value of selected elements (fighters)
    var player1 = document.getElementById("f-l-1").value;
    var player2 = document.getElementById("f-l-2").value;

    // match value with corresponding objects
    for (var i = 0; i < fightersArray.length; i++) {
        if (fightersArray[i].name.toLowerCase() == player1) {
            var assignPlayer1 = fightersArray[i];
        }
        if (fightersArray[i].name.toLowerCase() == player2) {
            var assignPlayer2 = fightersArray[i];
        }
    }
    // Global Variable
    playersArray = [assignPlayer1, assignPlayer2];

    refreshWindow(assignPlayer1, assignPlayer2);
}

// Return array of selected players
function getPlayers() {
    return playersArray;
}

// Get a random number from interval
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*Refresh window*/

function refreshWindow(player1, player2) {

    // Remove every children of game window to refresh displayed data
    $('.game-window').empty();

    // Create 1 div per player
    var $player1Div = $('<div id="player1-Div"></div>');
    var $player2Div = $('<div id="player2-Div"></div>');

    // Create html elements to display players' info

    /*name*/
    var $player1NameDisplay = $('<h2 id="player1-name"></h2>');
    var $player2NameDisplay = $('<h2 id="player2-name"></h2>');
    /*hp*/
    var $player1HpDisplay = $('<p id="player1-hp"></p>');
    var $player2HpDisplay = $('<p id="player2-hp"></p>');
    /*Avatar*/
    var $player1ADisplay = $('<img class="avatar" id="player1-avatar">');
    var $player2ADisplay = $('<img class="avatar" id="player2-avatar">');

    // Add content

    /*name*/
    $player1NameDisplay.append(player1.name);
    $player2NameDisplay.append(player2.name);

    /*hp*/
    $player1HpDisplay.append(player1.health + ' hp');
    $player2HpDisplay.append(player2.health + ' hp');

    /*Avatar*/
    $player1ADisplay.attr('src', player1.avatar);
    $player2ADisplay.attr('src', player2.avatar);

    // append

    /*Player 1*/
    $player1Div.append($player1NameDisplay);
    $player1Div.append($player1ADisplay)
    $player1Div.append($player1HpDisplay);
    /*Player 2*/
    $player2Div.append($player2NameDisplay);
    $player2Div.append($player2ADisplay)
    $player2Div.append($player2HpDisplay);

    //Display
    $('.game-window').append($player1Div);
    $('.game-window').append('<div class="middle"><h3>VS</h3><h4 class="fight" onclick="fight()">FIGHT !</h4>');
    $('.game-window').append($player2Div);

}

function fight() {
    getPlayers();
    player1 = playersArray[0];
    player2 = playersArray[1];

    // Define variables
    var roundFighter;
    var roundDefencer;
    var round = 0;
    var first = randomIntFromInterval(1, 2);

    // Choose first attacker
    if (first === 1) {
        roundFighter = player1;
    } else {
        roundFighter = player2;
    }

    // Display Intro
    $('#outputDiv').empty();
    var $intro = $('<p class="intro"></p>');
    var introTxt = 'Welcome To Ready To Rumble Simplon Edition ! ' + player1.name + ' and ' + player2.name + ' are gonna fight to death!';
    $intro.append(introTxt);
    $('#outputDiv').append(introTxt);

    //Battle Round
    setInterval(function() {
            while (player1.health > 0 && player2.health > 0) {
                if(round % 2 === 0 && round !== 0) {
                  roundFighter = player1;
                  roundDefencer = player2;
                  alert('test1');
                } else if (round % 2 !== 0) {
                  roundFighter = player2;
                  roundFighter = player1;
                  alert('test2');
                } else {
                  roundDefencer = player2;
                  alert('test1');
                }
                player1.health -= 35;
                round++;
            }
    }, 4000);



}
