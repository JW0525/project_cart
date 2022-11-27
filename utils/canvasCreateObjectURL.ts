export const canvasCreateObjectURL = (
  thumbnailCanvas: HTMLCanvasElement
): Promise<string> => {
  return new Promise(async (resolve) => {
    thumbnailCanvas.toBlob((blob: any) => {
      const url = window.URL.createObjectURL(blob);
      resolve(url);
    });
  });
};

export const canvasBlob = (
  thumbnailCanvas: HTMLCanvasElement
): Promise<Blob|null> => {
  return new Promise(async (resolve) => {
    thumbnailCanvas.toBlob((blob) => {
      resolve(blob);
    });
  });
};

