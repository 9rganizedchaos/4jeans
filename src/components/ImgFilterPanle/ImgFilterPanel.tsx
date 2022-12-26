import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Download, Loader } from 'react-feather';
import styles from './ImgFilterPanel.module.scss';
import FilterTag, { FilterType } from '../FilterTag/FilterTag';
import { Photo } from '../../types/photo';

const CANVAS_WIDTH = 674;
const CANVAS_HEIGHT = 450;
const FILTER_TYPES: FilterType[] = ['contrast', 'grayscale', 'sepia', 'brightness'];

interface ImageFilterPanelProps {
  selectedPhoto: Photo;
}

function ImgFilterPanel({ selectedPhoto }: ImageFilterPanelProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [image, setImage] = useState<HTMLImageElement>();
  const [brightnessValue, setBrightnessValue] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.download = `${selectedPhoto.altText || '4jeans'}.png`;
    if (canvasRef.current) {
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const applyReversalFilter = (pixels: ImageData) => {
    const d = pixels.data;
    for (let i = 0; i < pixels.data.length; i += 4) {
      d[i] = 255 - d[i];
      d[i + 1] = 255 - d[i + 1];
      d[i + 2] = 255 - d[i + 2];
      d[i + 3] = 255;
    }
    return pixels;
  };
  const applyBrightnessFilter = (pixels: ImageData, value: number) => {
    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] += value / 3;
      d[i + 1] += value / 3;
      d[i + 2] += value / 3;
    }
    return pixels;
  };
  const applyGrayScaleFilter = (pixels: ImageData) => {
    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];

      const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      // eslint-disable-next-line no-multi-assign
      d[i] = d[i + 1] = d[i + 2] = v;
    }
    return pixels;
  };
  const applySepiaFilter = (pixels: ImageData) => {
    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];

      d[i] = r * 0.3588 + g * 0.7044 + b * 0.1368;
      d[i + 1] = r * 0.299 + g * 0.587 + b * 0.114;
      d[i + 2] = r * 0.2392 + g * 0.4696 + b * 0.0912;
    }
    return pixels;
  };
  const handleFilterTagClick = (filterType: FilterType, value?: number) => {
    if (activeFilter === filterType) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterType);
    }

    if (!context || !canvasRef.current) return;
    const pixels = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    let filteredData: ImageData;

    switch (filterType) {
      case 'contrast':
        filteredData = applyReversalFilter(pixels);
        break;
      case 'grayscale':
        filteredData = applyGrayScaleFilter(pixels);
        break;
      case 'sepia':
        filteredData = applySepiaFilter(pixels);
        break;
      case 'brightness':
        filteredData = applyBrightnessFilter(pixels, value || 0);
        break;
      default:
        filteredData = pixels;
        break;
    }

    context.putImageData(filteredData, 0, 0);
  };

  const handleRangeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrightnessValue(Number(e.target.value));
  };

  useEffect(() => {
    if (canvasRef.current) {
      const initialContext = canvasRef.current.getContext('2d');
      if (initialContext) {
        setContext(initialContext);
      }
    }
  }, []);

  useEffect(() => {
    if (!context) return;

    const initialImage = new Image();
    initialImage.src = selectedPhoto.imgUrl;
    initialImage.crossOrigin = 'anonymous';
    initialImage.onload = () => {
      if (!canvasRef.current) return;

      const adjustedWidth = Math.floor((CANVAS_HEIGHT * initialImage.width) / initialImage.height);

      if (adjustedWidth > CANVAS_WIDTH) {
        setCanvasSize({
          width: CANVAS_WIDTH,
          height: Math.floor((initialImage.height * CANVAS_WIDTH) / initialImage.width),
        });
      } else {
        setCanvasSize({
          width: Math.floor((initialImage.width * CANVAS_HEIGHT) / initialImage.height),
          height: CANVAS_HEIGHT,
        });
      }
    };
    setImage(initialImage);
  }, [context]);

  useEffect(() => {
    if (!canvasSize.width || !canvasSize.height || !image) return;
    context?.drawImage(image, 0, 0, canvasSize.width, canvasSize.height);
  }, [canvasSize, image]);

  return (
    <div className={styles['panel-wrapper']}>
      <div className={styles['canvas-wrapper']}>
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
      </div>
      <div className={styles['control-panel']}>
        <div className={styles['filter-part']}>
          <Loader />
          <p>
            You can apply filters
            <br />
            by clicking on a tag below
          </p>
          <ul className={styles['filter-tag-list']}>
            {FILTER_TYPES.map((filter) => (
              <li key={filter} className={styles['filter-tag']}>
                <FilterTag
                  filterName={filter}
                  isActive={activeFilter === filter}
                  brightnessValue={brightnessValue}
                  handleFilterTagClick={handleFilterTagClick}
                />
              </li>
            ))}
          </ul>
          {activeFilter === 'brightness' && (
            <div className={styles['brightness-range']}>
              <input type="range" min={0} max={100} onChange={(e) => handleRangeInputChange(e)} />
            </div>
          )}
        </div>
        <div className={styles['download-btn-part']}>
          <button type="button" onClick={handleDownloadClick}>
            <Download />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImgFilterPanel;
