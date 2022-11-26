import React, {ReactElement, useEffect, useMemo, useState} from "react"
import styles from "./Masonry.module.scss"
import {useWindowWidth} from "../../hooks/useWindowWidth";

interface MasonryProps {
  children: React.ReactElement[],
  columnsCount?: number,
  gutter?: string,
  className?: string,
  style?: object,
  columnsCountBreakPoints?: {[key: string]: number};
};

const DEFAULT_COLUMNS_COUNT = 3;
const DEFAULT_COLUMNS_COUNT_BREAKPOINT = {
  350: 1,
  767: 2,
  1279: 3,
}

const Masonry = ({ children, gutter = "0", className, style = {}, columnsCountBreakPoints = DEFAULT_COLUMNS_COUNT_BREAKPOINT}: MasonryProps) => {
  const windowWidth = useWindowWidth();
  const columnsCount = useMemo(() => {
    const breakPoints = Object.keys(columnsCountBreakPoints).sort(
      (a, b) => Number(a) - Number(b)
    )
    let count =
      breakPoints.length > 0
        ? columnsCountBreakPoints[breakPoints[0]]
        : DEFAULT_COLUMNS_COUNT

    breakPoints.forEach((breakPoint) => {
      if (Number(breakPoint) < windowWidth) {
        count = columnsCountBreakPoints[breakPoint]
      }
    })

    return count
  }, [windowWidth, columnsCountBreakPoints]);
  const [columns, setColumns] = useState(makeMasonryColumns(children, columnsCount || 3));

  useEffect(() => {
    console.log(makeMasonryColumns(children, columnsCount));
    setColumns(makeMasonryColumns(children, columnsCount))
  }, [columnsCount])

  return (
    <div className={className} style={style}>
      <div
        className={`${styles.masonry_wrapper} ${className}`}
        style={{ gap: gutter, ...style }}
      >
        {columns.map((column, i) => (
          <div
            className={styles.masonry_column}
            key={i}
            style={{ gap: gutter }}
          >
            {column.map((item) => item)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Masonry;

const makeMasonryColumns = (children: ReactElement[], columnsCount: number) => {
  const columns: ReactElement[][] = Array.from({length: columnsCount}, () => [])

  React.Children.forEach(children, (child, index) => {
    if (child && React.isValidElement(child)) {
      columns[index % columnsCount].push(child)
    }
  })

  return columns;
}
