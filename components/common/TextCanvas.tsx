import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { newCanvas } from "../../utils/newCanvas";
import { canvasCreateObjectURL } from "../../utils/canvasCreateObjectURL";

const TextCanvasLayout = styled.div`
  z-index: 100;
`

const TextCanvas = () => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const imgWidth = 1000;
    const imgHeight = 1000;

    (async () => {
      if (src !== '') window.URL.revokeObjectURL(src);

      const {canvas, ctx} = newCanvas(imgWidth, imgHeight);

      const fontSize = 40;
      ctx.font = `normal 900 ${fontSize}px NotoSansKR`;
      ctx.fillStyle = '#555';
      ctx.textBaseline = 'alphabetic';
      ctx.globalAlpha = 0.4;
      const text = 'inputText'.replace(/@.+/,'');
      const measureText = ctx.measureText(text);

      const x = (imgWidth - measureText.width) / 2;
      const y = (imgHeight - fontSize) / 2 + fontSize;
      ctx.fillText(text, x, y);

      const newSrc = await canvasCreateObjectURL(canvas);
      setSrc(newSrc);
    })();
    /* eslint-disable */
  }, []);


  return (
    <TextCanvasLayout style={{backgroundImage: `url(${src})`}} />
  )
}

export default TextCanvas;