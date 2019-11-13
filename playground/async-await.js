const add = (a, b) => new Promise((res, rej) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return rej(new Error('Numbers must be positive'));
      }
      res(a + b);
    }, 2000);
  });

const doWork = async () => {
  const sum = await add(1, 99);
  const sum2 = await add(sum, 200);
  const sum3 = await add(sum2, -300);
  return sum3;
};

doWork().then(sum => console.log(sum)).catch(e => console.log(e));
