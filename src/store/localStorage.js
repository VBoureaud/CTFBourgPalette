export const storageData = (key='auth', value) => {
  try {
    const jsonObj = JSON.stringify(value);
    localStorage.setItem(key, jsonObj);
  } catch(e) {
    // saving error
    console.log({ fail: e });
  }
}

export const getStorage = (key='auth') => {
  try {
    const localStorageAuth = localStorage.getItem(key)
    let storage = null;
    if (localStorageAuth) {
      storage = JSON.parse(localStorageAuth)
    }
    return storage;
  } catch(e) {
    // error reading value
  	console.log({ fail: e });
  }
}

export const rmStorage = (key='auth') => {
  try {
    const localStorageAuth = localStorage.getItem(key)
    if (localStorageAuth) {
      localStorage.removeItem(key);
    }
    return true;
  } catch(e) {
    // error reading value
    console.log({ fail: e });
  }
}