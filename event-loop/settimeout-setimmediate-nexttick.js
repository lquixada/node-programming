function micros() {
    process.nextTick(() => console.log('\nmicro: process.nextTick 1'));
    
    Promise.resolve().then(() => {
        console.log('micro: Promise.resolve()');
        process.nextTick(() => console.log('micro: process.nextTick 3 added inside Promise.resolve()'));
    });
    
    process.nextTick(() => console.log('micro: process.nextTick 2'));
}

function macros() {
    // Add to the setImmediate queue (check macro phase)
    setImmediate(() => console.log('\nmacro: setImmediate 1'));
    setImmediate(() => {
        console.log('macro: setImmediate 2');
        micros();
    });
    setImmediate(() => console.log('macro: setImmediate 3'));
    
    // Add to the setTimeout queue (timer macro phase)
    setTimeout(() => console.log('\nmacro: setTimeout 1'), 0);
    setTimeout(() => {
        console.log('macro: setTimeout 2');
        micros();
    }, 0);
    setTimeout(() => console.log('macro: setTimeout 3'), 0);
    
    micros();
}

// Here timer phase is reached first, check phase second
macros();

const fs = require('fs');
fs.readFile(__filename, () => {
    console.log('\nmacro: fs.readFile');

    // Here check phase is reached first, timer phase second
    macros();
});

console.log('initial execution');