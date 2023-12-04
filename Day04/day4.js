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
    for (let i = 1; i < 202; i++) {
        for (let j = i+1; j < totalWins[`${i}`]+2; j++) {
            console.log(j, i, totalWins[`${i}`])
            if (numOfCopies[`${j}`] !== undefined) {
                numOfCopies[`${j}`] += 1
            } else {
                numOfCopies[`${j}`] = 1
            }

        }
    }
    console.log(numOfCopies)
});