const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // part 1
    let answer = 0;

    let totalWins = {};

    data.split("\n\n").forEach((datum, idx) => {

        let mapSource = datum.split(':')[1];
        console.log(mapSource)
    });

    console.log(answer)

});