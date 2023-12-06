const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // part 1

    let seeds= {};

    data.split("\n\n").forEach((datum, idx) => {
        if (idx === 0) {
            let seed = datum.split(': ')[1]
            seed.split(' ').forEach(ele => {
                seeds[parseInt(ele)] = [parseInt(ele), false];
            })
        } else {
            let mapSource = datum.split(':')[1];
            
            mapSource.split("\n").forEach((ele, index) => {
                if (index === 0) {
                    return
                }
                let destination = parseInt(ele.split(' ')[0]);
                let source = parseInt(ele.split(' ')[1]);
                let range = parseInt(ele.split(' ')[2]);

                let seed = Object.keys(seeds);
                seed.forEach(ele => {
                    // if (ele === '14') {
                    //     console.log(seeds[ele], destination, source, range)
                    // }
                    if (((seeds[ele][0] - source) >= 0) && (((source + range) - seeds[ele][0]) >= 0)) {
                        let changed = seeds[ele][1];
                        if (!changed) {
                            let temp = (seeds[ele][0] + destination - source)
                            seeds[ele][0] = temp;
                            seeds[ele][1] = true
                        }
                    } 
                })
            })
        }
        let seed = Object.keys(seeds);
        seed.forEach(ele => {
            seeds[ele][1]= false
        })
    });
    let locations = []
    Object.values(seeds).forEach(ele => {
        locations.push(ele[0])
    })
    console.log(Math.min(...locations))

    // part 2

});