// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
export const hashValue = (key: string | number | object): number => {
  let hash = 0;

  if (typeof key === 'string') {
    for (let i = 0; i < key.length; i++) {
      const chr = key.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
  } else if (typeof key === 'number') {
    hash = key | 0; // Convert to 32bit integer
  } else {
    const strKey = JSON.stringify(key);
    for (let i = 0; i < strKey.length; i++) {
      const chr = strKey.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
  }

  return hash;
};
