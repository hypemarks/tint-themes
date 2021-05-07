// Temporary disable
// import React, { FC, ReactNodeArray, useEffect, useRef, useState } from 'react';
// import { globalConfig } from '../../../common/config/config';
// import Bricks from 'bricks.js';
// import { Nullable } from '@tintup/tint-sdk/lib/';
// import { debounce } from '../../../utils/function-utils';
//
// export interface IMasonryLayoutProps {
//   children: ReactNodeArray;
//   postPadding?: string;
//   configColumns?: number;
//   postWidth?: string;
// }
//
// export const MasonryLayout: FC<IMasonryLayoutProps> = ({ children, postPadding, configColumns, postWidth }) => {
//   const masonryContainer = useRef<HTMLDivElement>(null);
//   const [instance, setInstance] = useState<Nullable<Bricks.Instance>>(null);
//
//   useEffect(() => {
//     const debounceResize = debounce(onResize, 200);
//     window.addEventListener('resize', debounceResize);
//     return () => window.removeEventListener('resize', debounceResize);
//   }, []);
//
//   const getMargin = () => {
//     const half = 2;
//     return !isNaN(Number(postPadding) / half) ? Number(postPadding) / half : Number(globalConfig.postPadding) / half;
//   };
//
//   const getColumns = () => {
//     const margin = getMargin();
//     if (configColumns !== undefined && !isNaN(configColumns) && configColumns > 0) {
//       return Math.floor(window.innerWidth / configColumns) - margin * 2;
//     }
//     const singlePostWidth = postWidth ? Number(postWidth) : Number(globalConfig.postWidth);
//     return Math.floor(window.innerWidth / (singlePostWidth + margin * 2));
//   };
//
//   const getElementWidth = () => {
//     return Math.floor(window.innerWidth / getColumns());
//   };
//
//   const onResize = () => {
//     createBrickInstance();
//   };
//
//   useEffect(() => {
//     if (instance === null) {
//       createBrickInstance();
//     }
//   }, [masonryContainer]);
//
//   useEffect(() => {
//     const defaultConfig = {
//       root: null,
//       rootMargin: '100px',
//       threshold: 1,
//     };
//     const images = document.querySelectorAll(`img[src]`);
//     const observer = new IntersectionObserver(onChange, defaultConfig);
//     images.forEach(img => {
//       observer.observe(img);
//     });
//     instance && instance.pack();
//   }, [children]);
//
//   const onChange = (changes: IntersectionObserverEntry[], observer: IntersectionObserver) => {
//     changes.forEach((change: IntersectionObserverEntry) => {
//       if (change.intersectionRatio && change.target instanceof HTMLElement && instance) {
//         instance.pack();
//         observer.unobserve(change.target);
//       }
//     });
//   };
//
//   const createBrickInstance = () => {
//     if (masonryContainer.current) {
//       const tempInstance = Bricks({
//         container: masonryContainer.current,
//         sizes: [{ columns: getColumns(), gutter: 0 }],
//         packed: 'data-packed',
//         position: false,
//       });
//       setInstance(tempInstance);
//       tempInstance.pack();
//     }
//   };
//
//   return (
//     <div ref={masonryContainer}>
//       {children.map((child, i) => (
//         <div key={i} style={{ width: `${getElementWidth()}px` }}>
//           {child}
//         </div>
//       ))}
//     </div>
//   );
// };
//
// export default MasonryLayout;
