const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // part 1
    let answer = 0;

    let totalWins = {};

    data.split("\n").forEach((datum, idx) => {
        let winningNum = datum.split(': ')[1].split('| ')[0].split(' ').filter(ele => ele.length !== 0)
        let numYouHave = datum.split(': ')[1].split('| ')[1].split(' ').filter(ele => ele.length !== 0)
        let matching = winningNum.filter(ele => numYouHave.includes(ele)).length

        let points = 0
        for (let i = 0; i< matching; i++) {
            if (i !== 0) {
                points = points*2
            } else if (i === 0) {
                points = 1
            }
        }

        answer = answer + points

        // part 2
        totalWins[`${idx + 1}`] = matching
    });

    console.log(answer)

    // part 2 cont
    let numOfCopies = {'1': 1}
    for (let i = 1; i < data.split("\n").length + 1; i++) {
        let belowWinningCard = totalWins[`${i}`] + 1 +i
        if (totalWins[`${i}`] === 0) {
            if (numOfCopies[`${i + 1}`] === undefined && i < data.split("\n").length) {
                numOfCopies[`${i+1}`] = 1
            }             
        }
        for (let j = (i + 1); j < belowWinningCard; j++) {
            if (numOfCopies[`${j}`] !== undefined) {
                numOfCopies[`${j}`] += (numOfCopies[`${i}`])
            } else {
                numOfCopies[`${j}`] = 1+ (numOfCopies[`${i}`])
            }
        }
    }
    console.log(Object.values(numOfCopies).reduce((partialSum, a) => partialSum + a, 0))
});