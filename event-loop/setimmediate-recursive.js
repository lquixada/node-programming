// Recursive setImmediate() can't starves I/O, ie, it can't compromise event loop

setImmediate(() => {
  console.log('\nmacro: setImmediate 1');
  process.nextTick(() => console.log('\nmicro: nextTick 1'));

  setImmediate(() => {
    console.log('\nmacro: setImmediate 2');
    process.nextTick(() => console.log('\nmicro: nextTick 2'));

    setImmediate(() => {
      console.log('\nmacro: setImmediate 3');
      process.nextTick(() => console.log('\nmicro: nextTick 3'));
    });
  });
});