/* Ready To Rumble */


$(document).ready(function() {

    // Create the list of fighters for user to select
    function fightersList(fightersArray) {
      var $select = $('.fighter-list');
      for(var fighter = 0; fighter < fightersArray.length; fighter++) {
        $option = $('<option></option>');
        $option.attr('value', fightersArray[fighter].name.toLowerCase());
        $option.append(fightersArray[fighter].name);
        $select.append($option);
      }
    }

    // Draw Game Window Function
    function drawWindow(player1, player2) {

        // Remove every children of game window to refresh displayed data
        $('.game-window').empty();

        // Create 1 div per player
        var $player1Div = $('<div id="player1-Div"></div>');
        var $player2Div = $('<div id="player2-Div"></div>');

        // Create output div
        var $outputDiv = $('<div id="outputDiv"></div>');

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
        if (player1 != null && player2 != null) {
            /*name*/
            $player1NameDisplay.append(player1.name);
            $player2NameDisplay.append(player2.name);

            /*hp*/
            $player1HpDisplay.append(player1.health + ' hp');
            $player2HpDisplay.append(player2.health + ' hp');

            /*Avatar*/
            $player1ADisplay.attr('src', player1.avatar);
            $player2ADisplay.attr('src', player2.avatar);
        } else {
            /*name*/
            $player1NameDisplay.append('Player 1');
            $player2NameDisplay.append('Player 2');

            /*hp*/
            $player1HpDisplay.append('0 hp');
            $player2HpDisplay.append('0 hp');
        }

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
        $('.game-window').append('<div class="middle"><h3>VS</h3><h4>FIGHT !</h4>');
        $('.game-window').append($player2Div);
        $('.output').append($outputDiv);
    }

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



    //  Call fightersList to add fighters list to select elements
    fightersList(fightersArray.sort());

    //Draw Window
    drawWindow();

})

// function Run
function run() {
  // Get the value of selected elements (fighters)
  var player1 = document.getElementById("f-l-1").value;
  var player2 = document.getElementById("f-l-2").value;

    // match value with corresponding objects
    for(var i = 0; i < fightersArray.length; i++) {
      if(fightersArray[i].name.toLowerCase() == player1) {
        var assignPlayer1 = fightersArray[i];
      }
      if(fightersArray[i].name.toLowerCase() == player2) {
        var assignPlayer2 = fightersArray[i];
      }
    }
    drawWindow(assignPlayer1, assignPlayer2);
  }



  // Draw Game Window Function
  function drawWindow(player1, player2) {

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
      if (player1 != null && player2 != null) {
          /*name*/
          $player1NameDisplay.append(player1.name);
          $player2NameDisplay.append(player2.name);

          /*hp*/
          $player1HpDisplay.append(player1.health + ' hp');
          $player2HpDisplay.append(player2.health + ' hp');

          /*Avatar*/
          $player1ADisplay.attr('src', player1.avatar);
          $player2ADisplay.attr('src', player2.avatar);
      } else {
          /*name*/
          $player1NameDisplay.append('Player 1');
          $player2NameDisplay.append('Player 2');

          /*hp*/
          $player1HpDisplay.append('0 hp');
          $player2HpDisplay.append('0 hp');
      }

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
      $('.game-window').append('<div class="middle"><h3>VS</h3><h4>FIGHT !</h4>');
      $('.game-window').append($player2Div);
  }
