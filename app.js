var express_init = require('express');
const Express = express_init();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http); //--- old version
//const Socketio = require("socket.io")(Express.listen(8080))
var path = require('path');

const static_angular_files = path.join(__dirname, '/public')

Express.use(express_init.static(static_angular_files));

express_init.get('/', function(req, res) {
    res.sendFile('public/index.html', { root: './' });
});

var Player1 = {
    name: "P1",
    x_coord: 200,
    y_coord: 200,
    link: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/32/sign-check-icon.png",
    hp: 100,
    brawn: 1,
    agility: 1,
    intellect: 1,
    cunning: 1,
    willpower: 1,
    presence: 1,

};

var Player2 = {
    name: "P2",
    x_coord: 300,
    y_coord: 200,
    link: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/32/sign-check-icon.png",
    hp: 200,
    brawn: 2,
    agility: 2,
    intellect: 2,
    cunning: 2,
    willpower: 2,
    presence: 2,
};
var Player3 = {
    name: "P3",
    x_coord: 400,
    y_coord: 200,
    link: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/32/sign-check-icon.png",
    hp: 300,
    brawn: 3,
    agility: 3,
    intellect: 3,
    cunning: 3,
    willpower: 3,
    presence: 3,
};
var Player4 = {
    name: "P4",
    x_coord: 500,
    y_coord: 200,
    link: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/32/sign-check-icon.png",
    hp: 400,
    brawn: 4,
    agility: 4,
    intellect: 4,
    cunning: 4,
    willpower: 4,
    presence: 4,
};
const Background = {name: "MainMap", link: "https://link.com"}
const today = new Date();

var arrayOfPlayers = new Array();
var arrayOfLogEntries = new Array();

arrayOfPlayers[0] = Player1
arrayOfPlayers[1] = Player2
arrayOfPlayers[2] = Player3
arrayOfPlayers[3] = Player4




Socketio.on("connection", socket => {

    console.log("Connected!");

    var time = "[" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "]"
    arrayOfLogEntries[0] = [time, " Game started!"]

    socket.emit("initDrawRequest", [arrayOfPlayers, arrayOfLogEntries]);

    /*
    socket.on("move", data => {
        switch (data) {
            case "left":
                position.x -= 5;
                Socketio.emit("position", position);
                break;
            case "right":
                position.x += 5;
                Socketio.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                Socketio.emit("position", position);
                break;
            case "down":
                position.y += 5;
                Socketio.emit("position", position);
                break;
        }
    });
*/

    socket.on("movePlayer", data => {

        var playerToMove = data[0];
        var new_x_coord = data[1];
        var new_y_coord = data[2];

        console.log("Moving player: " + playerToMove.toString() + new_x_coord.toString());

        arrayOfPlayers[playerToMove].x_coord = new_x_coord
        arrayOfPlayers[playerToMove].y_coord = new_y_coord

        console.log("Updated")

        Socketio.emit("callRedraw", arrayOfPlayers);

    });

    socket.on("updatePlayerStatsOnServer", data => {

        var playerToUpdate = data[0]
        var brawn = data[1]
        var agility = data[2]
        var intellect = data[3]
        var cunning = data[4]
        var willpower = data[5]
        var presence = data[6]

        var logText = ""

        console.log("Player "+playerToUpdate+" stats updated "+ brawn + " "+ arrayOfPlayers[playerToUpdate].brawn)

        arrayOfPlayers[playerToUpdate].brawn = brawn
        arrayOfPlayers[playerToUpdate].agility = agility
        arrayOfPlayers[playerToUpdate].intellect = intellect
        arrayOfPlayers[playerToUpdate].cunning = cunning
        arrayOfPlayers[playerToUpdate].willpower = willpower
        arrayOfPlayers[playerToUpdate].presence = presence

        logText = "Player "+playerToUpdate+" stats updated!"

        console.log("Player "+(playerToUpdate+1)+" stats updated "+ brawn + " "+ arrayOfPlayers[playerToUpdate].brawn)
        console.log(time+logText)
        arrayOfLogEntries.push([time, logText])

        Socketio.emit("callUpdateLog", arrayOfLogEntries);
        Socketio.emit("callRedraw", arrayOfPlayers);


    });


    socket.on("rollTheDice", data => {

        var typeofDice = data[0];
        var howManyTimes = data[1];

        var time = "[" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "]"

        console.log("Rolling dice: " + typeofDice + " " + howManyTimes);

        if (typeofDice == "A") {

            diceResult = rollAbility(howManyTimes)
            result = [time, " Successes: " + diceResult.successes + "; Advantages: " + diceResult.advantages];


        } else if (typeofDice == "D") {

            diceResult = rollDifficulty(howManyTimes)
            result = [time, " Threats: " + diceResult.threats + "; Failures: " + diceResult.failures];


        }

        arrayOfLogEntries.push(result)

        Socketio.emit("diceResult", result);
        Socketio.emit("callUpdateLog", arrayOfLogEntries);

        console.log(arrayOfLogEntries)

    });


});

Http.listen(process.env.PORT || 8080, () => {
    console.log("Upd: Listening at 8080...");
});


function rollDifficulty(numberOfTimes) {

    let resultArray = {
        "failures": 0,
        "threats": 0
    };

    for (let i = 0; i < numberOfTimes; i++) {

        var roll1 = Math.floor(Math.random() * 10);


        if (roll1 == 1) {
            break
        } else if (roll1 == 2) {
            resultArray.failures += 1;
        } else if (roll1 == 3) {
            resultArray.failures += 2;
        } else if (roll1 == 4) {
            resultArray.threats += 1;
        } else if (roll1 == 5) {
            resultArray.threats += 1;
        } else if (roll1 == 6) {
            resultArray.threats += 1;
        } else if (roll1 == 7) {
            resultArray.threats += 2;
        } else if (roll1 == 8) {
            resultArray.threats += 1;
            resultArray.failures += 1;
        }
    }


    console.log("you've rolled: " + resultArray.failures.toString() + " failures and " + resultArray.threats.toString() + " threats")

    return resultArray

}




function rollAbility(numberOfTimes) {

    let resultArray = {
        "successes": 0,
        "advantages": 0
    };

    for (let i = 0; i < numberOfTimes; i++) {

        var roll1 = Math.floor(Math.random() * 10);


        if (roll1 == 1) {
            break
        } else if (roll1 == 2) {
            resultArray.successes += 1;
        } else if (roll1 == 3) {
            resultArray.successes += 1;
        } else if (roll1 == 4) {
            resultArray.successes += 2;
        } else if (roll1 == 5) {
            resultArray.advantages += 1;
        } else if (roll1 == 6) {
            resultArray.advantages += 1;
        } else if (roll1 == 7) {
            resultArray.successes += 1;
            resultArray.advantages += 1;
        } else if (roll1 == 8) {
            resultArray.advantages += 2;
        }
    }


    console.log("you've rolled: " + resultArray.successes.toString() + " successes and " + resultArray.advantages.toString() + " advantages")

    return resultArray

}

