const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // part 1
    let numbers = []
    data.split("\n").forEach((datum) => {
        console.log(datum)
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
    // let newData = []
    // data.split("\n").forEach((datum) => {
    //     let newDatum = datum
    //     let newNumber = []
    //     for (let i = 0; i < newDatum.length; i++) {
    //         if (oneToNine.includes(newDatum[i])) {
    //             newNumber.push(newDatum[i])
    //         } else {
    //             let currSub = newDatum.substring(i, i + 5)
    //             alphaOneToNine.forEach(num => {
    //                 if (currSub[0] === num[0] && currSub.includes(num)) {
    //                     // newDatum = newDatum.replace(num, (alphaOneToNine.indexOf(num)+1))
    //                     newNumber.push((alphaOneToNine.indexOf(num) + 1).toString())
    //                 }
    //             })
    //         }
    //     }
    //     newData.push(newNumber)
    // })

    // const numbers2 = []
    // newData.forEach((datum) => {
    //     const currNum = []
    //     datum.forEach(char => {
    //         if (oneToNine.includes(char)) {
    //             if (char === '0') { console.log(datum) }
    //             currNum.push(char)
    //         }
    //     })
    //     if (currNum.length === 1) {
    //         const temp = [currNum[0], currNum[0]]
    //         numbers2.push(parseInt(temp.join('')))
    //     } else {
    //         const temp = [currNum[0], currNum[currNum.length - 1]]
    //         numbers2.push(parseInt(temp.join('')))
    //     }
    // });

    // console.log(numbers2.reduce((partialSum, a) => partialSum + a, 0))
});