import { cryptoAssets, cryptoData } from './data';

export function fakeFetchCrypto() {
  return new Promise((resolse) => {
    setTimeout(() => {
      resolse(cryptoData);
    }, 1000);
  });
}

export function fakeFetchAssets() {
  return new Promise((resolse) => {
    setTimeout(() => {
      resolse(cryptoAssets);
    }, 1000);
  });
}
