const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const zeroToNine= ['0','1','2','3','4','5','6','7','8','9']

    // part 1
    let numbers = []
    data.split("\n").forEach((datum) => {
        const currNum = []
        datum.split('').forEach(char => {
            if (zeroToNine.includes(char)) {
                currNum.push(char)
            }
        })
        if (currNum.length === 1) {
            const temp = [currNum[0], currNum[0]]
            numbers.push(parseInt(temp.join('')))
        } else {
            const temp = [currNum[0], currNum[currNum.length - 1]]
            numbers.push(parseInt(temp.join('')))
        }
    });

    console.log(numbers.reduce((partialSum, a) => partialSum + a, 0))

    // part 2
    const alphaZeroToNine = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero']
    let newData = []
    data.split("\n").forEach((datum) => {
        let newDatum = datum
        let newNumber = []
        for (let i = 0; i < newDatum.length; i++) {
            if (zeroToNine.includes(newDatum[i])) {
                newNumber.push(newDatum[i])
            } else {
                let currSub = newDatum.substring(i, i+5)
                alphaZeroToNine.forEach(num => {
                    if (currSub[0] === num[0] && currSub.includes(num)) {
                        // newDatum = newDatum.replace(num, (alphaZeroToNine.indexOf(num)+1))
                        newNumber.push((alphaZeroToNine.indexOf(num) + 1).toString())
                    }
                })
            }
        }
        newData.push(newNumber)
    })
    
    const numbers2 = []
    newData.forEach((datum) => {
        const currNum = []
        datum.forEach(char => {
            if (zeroToNine.includes(char)) {
                if (char === '0') {console.log(datum)}
                currNum.push(char)
            }
        })
        if (currNum.length === 1) {
            const temp = [currNum[0], currNum[0]]
            numbers2.push(parseInt(temp.join('')))
        } else {
            const temp = [currNum[0], currNum[currNum.length - 1]]
            numbers2.push(parseInt(temp.join('')))
        }
    });
    // for (let i = 0; i < 1000; i++) {
    //     console.log(data.split("\n")[i], newData[i], numbers2[i])
    // }

    // 51615 52844 52590 52840
    console.log(numbers2.reduce((partialSum, a) => partialSum + a, 0))
});