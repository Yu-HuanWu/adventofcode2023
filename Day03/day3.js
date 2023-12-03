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
                    }
                    
                    currNumString = []
                    startIndex = undefined;
                    endIndex = undefined;
                }
            }
        }
    }
    
    // let deduped = [...new Set(numbers)]
    console.log(numbers.reduce((partialSum, a) => partialSum + a, 0))

    // part 2
    let numbers2= []
    for (let i = 0; i < splitData.length; i++) {
        let currNums = []
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
                    if (!!up && up.some(ele => zeroToNine.includes(ele))) {
                        if (up.every(ele=> zeroToNine.includes(ele))) {
                            currNums.push(parseInt(up.join('')))
                        } else if () {
                            
                        }
                    }
                }
            }
        //     if (zeroToNine.includes(currChar)) {
        //         let prevChar = splitData[i][j - 1];
        //         let nextChar = splitData[i][j + 1];
        //         if (j === 0) {
        //             startIndex = j
        //         } else if (prevChar !== undefined && !zeroToNine.includes(prevChar)) {
        //             startIndex = j;
        //         }
        //         if (j === splitData[i].length - 1) {
        //             endIndex = j
        //         } else if (nextChar !== undefined && !zeroToNine.includes(nextChar)) {
        //             endIndex = j;
        //         }
        //         currNumString.push(currChar)

        //         if (startIndex !== undefined && endIndex !== undefined) {
        //             let leftOfStartIndex = startIndex - 1;
        //             let rightOfEndIndex = endIndex + 1;
        //             if (leftOfStartIndex < 0) {
        //                 leftOfStartIndex = 0;
        //             }
        //             const up = (splitData[i - 1] !== undefined) && splitData[i - 1].slice(leftOfStartIndex, rightOfEndIndex + 1).split('')
        //             const left = splitData[i][leftOfStartIndex]
        //             const right = splitData[i][rightOfEndIndex]
        //             const down = (splitData[i + 1] !== undefined) && splitData[i + 1].slice(leftOfStartIndex, rightOfEndIndex + 1).split('')

        //             if ((!!up && up.some(ele => ![...zeroToNine, '.'].includes(ele))) || (!!down && down.some(ele => ![...zeroToNine, '.'].includes(ele))) || (left !== undefined && ![...zeroToNine, '.'].includes(left)) || (right !== undefined && ![...zeroToNine, '.'].includes(right))) {
        //                 let currNumValue = parseInt(currNumString.join(''));
        //                 numbers2.push(currNumValue);
        //             }

        //             currNumString = []
        //             startIndex = undefined;
        //             endIndex = undefined;
        //         }
        //     }
        }
    }
});