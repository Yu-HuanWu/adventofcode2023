const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // part 1
    let numbers = []
    data.split("\n").forEach((datum) => {
        let id = datum.split(':')[0].split(' ')[1];
        let possible = true

        datum.split(': ')[1].split('; ').forEach(set => {
            set.split(', ').forEach(dice => {
                let amount = dice.split(' ')[0];
                let color = dice.split(' ')[1];
                if ((color === 'red' && amount > 12) || (color === 'blue' && amount > 14) || (color === 'green' && amount > 13)) {
                    possible = false;
                }
            })
        })

        if (possible) {
            numbers.push(parseInt(id))
        }
    });

    console.log(numbers, numbers.reduce((partialSum, a) => partialSum + a, 0))

    // part 2
    let sum = 0
    data.split("\n").forEach((datum) => {

        let minRed = 0
        let minBlue = 0
        let minGreen = 0
        datum.split(': ')[1].split('; ').forEach(set => {
            set.split(', ').forEach(dice => {
                let amount = parseInt(dice.split(' ')[0]);
                let color = dice.split(' ')[1];
                if (color === 'red' && amount > minRed) {
                    minRed = amount;
                } else if (color === 'blue' && amount > minBlue) {
                    minBlue = amount;
                } else if (color === 'green' && amount > minGreen) {
                    minGreen = amount
                }
            })
        })
        let power = minRed * minBlue * minGreen
        sum = sum + power
    });

    console.log('sum = ', sum)
    // console.log(numbers2.reduce((partialSum, a) => partialSum + a, 0))
});