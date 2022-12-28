import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Check, Download } from 'react-feather';
import styles from './ImgFilterPanel.module.scss';
import FilterTag, { FilterType } from '../FilterTag/FilterTag';
import { Photo } from '../../types/photo';
import RangeSlider from '../RangeSlider/RangeSlider';

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
  const [originalImageData, setOriginalImageData] = useState<ImageData>();
  const [brightnessValue, setBrightnessValue] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.download = `${selectedPhoto.altText || '4jeans'}.png`;
    if (canvasRef.current) {
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const applyReversalFilter = (imageData: ImageData) => {
    const pixels = new Uint8ClampedArray(imageData.data);
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = 255 - pixels[i];
      pixels[i + 1] = 255 - pixels[i + 1];
      pixels[i + 2] = 255 - pixels[i + 2];
      pixels[i + 3] = 255;
    }
    return new ImageData(pixels, imageData.width, imageData.height);
  };
  const applyBrightnessFilter = (imageData: ImageData, value: number) => {
    const pixels = new Uint8ClampedArray(imageData.data);
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] += value;
      pixels[i + 1] += value;
      pixels[i + 2] += value;
    }
    return new ImageData(pixels, imageData.width, imageData.height);
  };
  const applyGrayScaleFilter = (imageData: ImageData) => {
    const pixels = new Uint8ClampedArray(imageData.data);
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      const grayScaledValue = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      pixels[i] = grayScaledValue;
      pixels[i + 1] = grayScaledValue;
      pixels[i + 2] = grayScaledValue;
    }
    return new ImageData(pixels, imageData.width, imageData.height);
  };
  const applySepiaFilter = (imageData: ImageData) => {
    const pixels = new Uint8ClampedArray(imageData.data);
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      pixels[i] = r * 0.3588 + g * 0.7044 + b * 0.1368;
      pixels[i + 1] = r * 0.299 + g * 0.587 + b * 0.114;
      pixels[i + 2] = r * 0.2392 + g * 0.4696 + b * 0.0912;
    }
    return new ImageData(pixels, imageData.width, imageData.height);
  };
  const handleFilterTagClick = (filterType: FilterType, value?: number) => {
    if (!originalImageData || !context) return;
    let processedData: ImageData;

    if (activeFilter === filterType) {
      setActiveFilter(null);
      processedData = originalImageData;
      if (filterType === 'brightness') {
        setBrightnessValue(0);
      }
    } else {
      setActiveFilter(filterType);
      switch (filterType) {
        case 'contrast':
          processedData = applyReversalFilter(originalImageData);
          break;
        case 'grayscale':
          processedData = applyGrayScaleFilter(originalImageData);
          break;
        case 'sepia':
          processedData = applySepiaFilter(originalImageData);
          break;
        case 'brightness':
          processedData = applyBrightnessFilter(originalImageData, value || 0);
          break;
        default:
          processedData = originalImageData;
          break;
      }
    }
    context.putImageData(processedData, 0, 0);
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

    if (!canvasRef.current || !context) return;
    const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    setOriginalImageData(imageData);
  }, [canvasSize, image]);

  useEffect(() => {
    if (!originalImageData || !context) return;
    const processedData = applyBrightnessFilter(originalImageData, brightnessValue || 0);
    context.putImageData(processedData, 0, 0);
  }, [brightnessValue]);

  return (
    <div className={styles['panel-wrapper']}>
      <div className={styles['canvas-wrapper']}>
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
      </div>
      <div className={styles['control-panel']}>
        <div className={styles['filter-part']}>
          <Check />
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
              <RangeSlider
                defaultValue={brightnessValue}
                min={-50}
                max={50}
                step={10}
                handleChangeSlider={(e) => handleRangeInputChange(e)}
              />
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
