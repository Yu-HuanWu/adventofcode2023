const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const zeroToNine = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    // part 1
    let numbers = []
    const splitData = data.split("\n")

    // needed for part 2
    let gearPos = {}
    for ( let i=0; i<splitData.length; i++) {

        for (let j = 0; j < splitData[i].length; j++) {
            let currChar = splitData[i][j]
            if (currChar === '*') {
                let leftOfStartIndex = j - 1;
                let rightOfEndIndex = j + 1;
                if (leftOfStartIndex < 0) {
                    leftOfStartIndex = 0;
                }
                const up = (splitData[i - 1] !== undefined) && splitData[i - 1].slice(leftOfStartIndex, rightOfEndIndex + 1).split('')
                const left = splitData[i][leftOfStartIndex]
                const right = splitData[i][rightOfEndIndex]
                const down = (splitData[i + 1] !== undefined) && splitData[i + 1].slice(leftOfStartIndex, rightOfEndIndex + 1).split('')
                if ((!!up && up.some(ele => zeroToNine.includes(ele))) || (!!down && down.some(ele => zeroToNine.includes(ele))) || (left !== undefined && zeroToNine.includes(left)) || (right !== undefined && zeroToNine.includes(right))) {
                    let currPos = `${i},${j}`
                    gearPos[currPos] = []
                }
            }
        }
    }

    // back to part 1 and 2
    for ( let i=0; i< splitData.length; i++) {
        let currNumString = [];
        let startIndex = undefined;
        let endIndex = undefined;

        for ( let j=0; j< splitData[i].length; j++) {
            let currChar = splitData[i][j]
            if (zeroToNine.includes(currChar)) {
                let prevChar = splitData[i][j - 1];
                let nextChar = splitData[i][j + 1];
                if (j === 0) {
                    startIndex = j
                } else if (prevChar !== undefined && !zeroToNine.includes(prevChar)) {
                    startIndex = j;
                }
                if (j === splitData[i].length-1) {
                    endIndex = j
                } else if (nextChar !== undefined && !zeroToNine.includes(nextChar)) {
                    endIndex = j;
                }
                currNumString.push(currChar)

                if (startIndex !== undefined && endIndex !== undefined) {
                    let leftOfStartIndex = startIndex - 1;
                    let rightOfEndIndex = endIndex + 1;
                    if (leftOfStartIndex < 0) {
                        leftOfStartIndex = 0;
                    }
                    const up = (splitData[i - 1] !== undefined) && splitData[i - 1].slice(leftOfStartIndex, rightOfEndIndex +1).split('')
                    const left = splitData[i][leftOfStartIndex]
                    const right = splitData[i][rightOfEndIndex]
                    const down = (splitData[i + 1] !== undefined) && splitData[i + 1].slice(leftOfStartIndex, rightOfEndIndex +1).split('')

                    if ((!!up && up.some(ele => ![...zeroToNine, '.'].includes(ele))) || (!!down && down.some(ele => ![...zeroToNine, '.'].includes(ele))) || (left !== undefined && ![...zeroToNine, '.'].includes(left)) || (right !== undefined && ![...zeroToNine, '.'].includes(right))) {
                        let currNumValue = parseInt(currNumString.join(''));
                        numbers.push(currNumValue);
                        
                        let adjGearPos = '';
                        if (!!up && up.indexOf('*') != -1) {
                            adjGearPos = `${i - 1},${up.indexOf('*') + leftOfStartIndex}`
                        }
                        if (!!down && down.indexOf('*') != -1) {
                            adjGearPos = `${i + 1},${down.indexOf('*') + leftOfStartIndex}`
                        }
                        if (left === '*') {
                            adjGearPos = `${i},${leftOfStartIndex}`
                        }
                        if (right === '*') {
                            adjGearPos = `${i},${rightOfEndIndex}`
                        }
                        
                        if (adjGearPos !== '') {
                            gearPos[adjGearPos].push(currNumValue)
                        }
                    }
                    
                    currNumString = []
                    startIndex = undefined;
                    endIndex = undefined;
                }
            }
        }
    }
    
    console.log(numbers.reduce((partialSum, a) => partialSum + a, 0))

    // part 2 
    let ratio = [];
    Object.values(gearPos).forEach(arr => {
        if (arr.length > 1) {
            ratio.push(arr[0]*arr[1])
        }
    })
    console.log(ratio.reduce((partialSum, a) => partialSum + a, 0))
});