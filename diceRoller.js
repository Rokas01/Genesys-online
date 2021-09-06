function rollDifficulty(numberOfTimes) {

    const resultArray = {
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

    const resultArray = {
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


