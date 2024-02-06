const replaceAt = (arr, index, newElement) => {
    if (index < 0 || index >= arr.length) {
      return arr;
    }
  
    return [
      ...arr.slice(0, index),
      newElement,           
      ...arr.slice(index + 1)
    ];
  };

const elements = ["lorem", "ipsum", "dolor", "sit", "amet"];
const index = 2;
const newValue = "furor";
const result = replaceAt(elements, index, newValue);
console.log("result", result);