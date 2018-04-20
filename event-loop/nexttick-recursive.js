// Recursive nextTick() starves I/O, ie, it can compromise event loop

process.nextTick(() => {
  console.log('\nmacro: process.nextTick 1');
  setImmediate(() => console.log('\nmacro: setImmediate 1'));

  process.nextTick(() => {
    console.log('\nmacro: process.nextTick 2');
    setImmediate(() => console.log('\nmacro: setImmediate 2'));

    process.nextTick(() => {
      console.log('\nmacro: process.nextTick 3');
      setImmediate(() => console.log('\nmacro: setImmediate 3'));
    });
  });
});