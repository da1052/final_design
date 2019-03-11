export function preloadImages(str) {
  let loadedImage = 0;
  let newImages = [];
  let arr = str.match(/src="(.+)"\s{1}/g);
  return new Promise((resolve, reject) => {
    for(let i = 0; i < arr/length; i++) {
      newImages[i] = new Image();
      newImages[i].src = arr[i].slice(5, -2);
      newImages.onload = () => {
        if (loadedImage == arr.length) {
          resolve();
        }
      }
      newImages[i].onerror = () => {
        reject();
      }
    }
  })
}
