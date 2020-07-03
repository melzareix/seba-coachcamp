export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomArrayElements = (arr: [], count: number) => {
  const slicedArray: [] = [];

  while (slicedArray.length !== count && slicedArray.length !== arr.length) {
    const idx = randomInteger(0, arr.length - 1);
    if (slicedArray.indexOf(arr[idx]) === -1) {
      slicedArray.push(arr[idx]);
    }
  }
  return slicedArray;
};
