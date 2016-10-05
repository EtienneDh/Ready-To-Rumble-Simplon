/*Ready To Rumble*/

/******************************************************************************/
/***************************** DATA FUNCTIONS *********************************/
/******************************************************************************/

// Figther constructor
function Fighter(name, health, damagePerAttack, special, avatar) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.damagePerAttack = damagePerAttack;
    this.special = special;
    this.avatar = avatar;
    this.toString = function() {
        return this.name;
    };
}

// Set fighters
fightersFunctionSet = function() {
    ryan = new Fighter('Ryan', 110, 21, 'Triple Punch', 'img/Ryan.png');
    xavier = new Fighter('Xavier', 100, 14, 'Troll Attack', 'img/Ryan.png');
    aaron = new Fighter('Aaron', 145, 17, 'Black Mamba', 'img/Aaron.png');
    totor = new Fighter('Totor', 90, 14, 'Equarissage', 'img/Totor.png');
    crispy = new Fighter('Crispy', 100, 16, 'Axe Throw', 'img/Crispy.png');
    chuck = new Fighter('Chuck Norris', 9999, 99, 'Round House Kick', 'img/Ryan.png');

    fightersArray = [ryan, aaron, totor, chuck, xavier, crispy];
};

// round global var
roundNum = 0;
// printMsg container
txt = '';

// Sounds
var hit0 = new Audio('sound/hit0.wav');
var hit1 = new Audio('sound/hit1.wav');
var hit2 = new Audio('sound/hit2.wav');

hitEffects = [ hit0, hit1, hit2];

/***************************** /DATA FUNCTIONS ********************************/

/******************************************************************************/
/******************************* DOM ELEMENTS *********************************/
/******************************************************************************/


domElementsFunctionSet = function() {
    /* Player Div's */
    $player1Div = $('<div id="player1-Div"></div>');
    $player2Div = $('<div id="player2-Div"></div>');

    /* Elements for players' Name, HPs & Avatars */
    $player1NameDisplay = $('<h2 id="player1-name"></h2>');
    $player2NameDisplay = $('<h2 id="player2-name"></h2>');

    $player1HpDisplay = $('<p id="player1-hp"></p>');
    $player2HpDisplay = $('<p id="player2-hp"></p>');

    $player1ADisplay = $('<img class="avatar" id="player1-avatar">');
    $player2ADisplay = $('<img class="avatar" id="player2-avatar">');

    /* Misc */
    $outputDiv = $('<div id="outputDiv"></div>'); // Output battle info Div
    $versusDiv = $('<div class="middle"><h3>VS</h3><h4 class="fight" onclick="fight()">FIGHT !</h4>'); // Middle Div
};


/******************************* /DOM ELEMENTS ********************************/


/******************************************************************************/
/****************************** GAME FUNCTIONS ********************************/
/******************************************************************************/

/* Tools functions */

// Print result of rounds
printMsg = function(attacker, defenser, dmg, optionalMsg) {
    optionalMsg = optionalMsg || '';
    if (roundNum % 2 === 0) {
        return "<span class='blue'>" + attacker.name + "</span> hits " + "<span class='red'>" + defenser.name + "</span> for <span id='hitdmg'>" + dmg + "</span> damages!" + optionalMsg;
    } else {
        return "<span class='red'>" + attacker.name + "</span> hits " + "<span class='blue'>" + defenser.name + "</span> for <span id='hitdmg'>" + dmg + "</span> damages!" + optionalMsg;
    }
};

// Keep $outputDiv at bottom
stickToBottom = function() {
    var element = document.getElementById('outputDiv');
    element.scrollTop = element.scrollHeight;
};

// Get a random number from interval
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* /Tools functions */

/* Interface functions */

// Interface builder & refresher
refreshDomElement = function(domElement, modification) {
    return domElement.text(modification);
};

// Generate list of playable fighters
function fightersList(fightersArray) {
    var $select = $('.fighter-list');

    for (var fighter = 0; fighter < fightersArray.length; fighter++) {
        var $option = $('<option></option>');
        $option.attr('value', fightersArray[fighter].name.toLowerCase());
        $option.append(fightersArray[fighter].name);
        $select.append($option);
    }
}

// Window builder
windowBuilder = function() {

    /* Player 1 */
    $player1Div.append(refreshDomElement($player1NameDisplay, 'Player 1'));
    $player1Div.append($player1ADisplay);
    $player1Div.append(refreshDomElement($player1HpDisplay, 'HP: 0'));

    /* Player 2 */
    $player2Div.append(refreshDomElement($player2NameDisplay, 'Player 2'));
    $player2Div.append($player2ADisplay);
    $player2Div.append(refreshDomElement($player2HpDisplay, 'HP: 0'));

    // Display on screen
    $('.game-window').append($player1Div);
    $('.game-window').append($versusDiv);
    $('.game-window').append($player2Div);
    $('.output').append($outputDiv);

    fightersList(fightersArray.sort());
};

/* /Interface functions */


// Compute dmg and trigger printMsg
function attack(attack, defense, domElement) {
    var optionalMsg = '';
    // Define min dmg & get random number between min & max
    var minDmg = Math.floor(attack.damagePerAttack * 0.75);
    var dmg = randomIntFromInterval(minDmg, attack.damagePerAttack);
    // Random crits
    var crit = randomIntFromInterval(1, 10);
    if (crit === 1) {
        dmg *= 3;
        optionalMsg = ' Critical Hit !!';
    }
    defense.health -= dmg;

    refreshDomElement(domElement, 'HP: ' + defense.health);
    var sound = hitEffects[randomIntFromInterval(0, 2)];
    sound.play();
    txt = printMsg(attack, defense, dmg, optionalMsg);
    return txt;
}

// Resolve game
resolve = function(winner, loser) {
    clearTimeout(timer);
    roundNum = 0;
    $finalMsg = $('<h1 style="color:white"></h1>');
    $finalMsgAvatar = $('<img>');
    $finalMsgAvatar.attr('src', winner.avatar);
    $finalMsg.append(winner.name + ' has won !');
    $('.overlay').append($finalMsg);
    $('.overlay').append($finalMsgAvatar);
    $('.overlay').show(1000).delay(3000).hide(1000);
};

/***************************** /GAME FUNCTIONS ********************************/


/******************************************************************************/
/***************************** Main Program ***********************************/
/******************************************************************************/


// The function run loads selected fighters
function run() {
    // Get selected fighter by user
    var player1 = document.getElementById("f-l-1").value;
    var player2 = document.getElementById("f-l-2").value;
    // match value with corresponding objects (fighters) & refresh elements with players' info
    for (var i = 0; i < fightersArray.length; i++) {
        if (fightersArray[i].name.toLowerCase() == player1) {
            refreshDomElement($player1NameDisplay, fightersArray[i].name);
            refreshDomElement($player1HpDisplay, 'HP: ' + fightersArray[i].health);
            $player1ADisplay.attr('src', fightersArray[i].avatar);
            // Clone player 1
            var assignPlayer1 = $.extend(true, {}, fightersArray[i]);
        }
        if (fightersArray[i].name.toLowerCase() == player2) {
            refreshDomElement($player2NameDisplay, fightersArray[i].name);
            refreshDomElement($player2HpDisplay, 'HP: ' + fightersArray[i].health);
            $player2ADisplay.attr('src', fightersArray[i].avatar);
            // Clone player 2
            var assignPlayer2 = $.extend(true, {}, fightersArray[i]);
        }
    }
    // Global array containing fighters
    playersArray = [assignPlayer1, assignPlayer2];
}

// The function Fight initiates the game
function fight() {
    // Update interface with fighters' name and hp's
    refreshDomElement($outputDiv, playersArray[0].name + ' and ' + playersArray[1].name + ' are going to fight !');

    // Choose first attacker and add new property on chosen player
    var first = randomIntFromInterval(1, 2);
    player1 = playersArray[0];
    player2 = playersArray[1];

    if (first === 1) {
        player1.start = 1;
    } else {
        player2.start = 1;
    }

    // Round function
    round();
}

// The function Round() resolves each fighting round, print results and call itself with a delay. Stop when 1 players dies
function round() {
    // Check for players life, if <= 0, fight ends
    if (player1.health <= 0 || player2.health <= 0) {
        var winner;
        var loser;
        if (player1.health <= 0) {
            winner = player2;
            loser = player1;
        } else {
            winner = player1;
            loser = player2;
        }
        resolve(winner, loser);
        return;
    }
    // Display damaged avatar if player health < 50 %
    if (player1.health <= (player1.maxHealth) / 2) {
        var src = player1.avatar.split('.');
        src = src[0] + '-dmg.' + src[1];
        $player1ADisplay.attr('src', src);
    }

    if (player2.health <= (player2.maxHealth) / 2) {
        var src = player2.avatar.split('.');
        src = src[0] + '-dmg.' + src[1];
        $player2ADisplay.attr('src', src);
    }

    var roundFight = function() {
        // Check round number to define attackers/ defenser
        if (roundNum % 2 === 0) {
            if (player1.hasOwnProperty('start')) {
                attack(player1, player2, $player2HpDisplay);
                $('#player2-avatar').fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
            } else {
                attack(player2, player1, $player1HpDisplay);
                $('#player1-avatar').fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
            }
        } else {
            if (player1.hasOwnProperty('start')) {
                attack(player2, player1, $player1HpDisplay);
                $('#player1-avatar').fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
            } else {
                attack(player1, player2, $player2HpDisplay);
                $('#player2-avatar').fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
            }
        }
        $outputDiv.append('<br>' + txt);
        stickToBottom();
        // Indent round
        roundNum++;
        // call round
        round();
    };
    timer = setTimeout(roundFight, 2500);
}

/**************************** /Main Program ***********************************/

// On load
$(document).ready(function() {
    // Load Dom Elements data
    domElementsFunctionSet();
    // Load Fighters data
    fightersFunctionSet();
    // Build Game Interface
    windowBuilder();
    // hide Overlay
    $('.overlay').hide();
});
