const compact = (arg) => {
    if (Array.isArray(arg)) {
      return arg.filter(Boolean);
    } else if (typeof arg === 'object' && arg !== null) {
      return Object.fromEntries(
        Object.entries(arg).filter(([_, value]) => Boolean(value))
      );
    } else {
      return arg;
    }
  };

const elements = [0, 1, false, 2, "", 3];
console.log("test1", compact(123)); // 123
console.log("test2", compact(null)); // null
console.log("test3", compact([0, 1, false, 2, "", 3])); // [1, 2, 3]
console.log("test4", compact({})); // {}
console.log("test5", compact({ price: 0, name: "cloud", altitude: NaN, taste: undefined, isAlive: false })); // {name: "cloud"}