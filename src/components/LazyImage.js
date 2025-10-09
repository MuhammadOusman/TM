import React, { useEffect, useRef, useState } from 'react';

/**
 * LazyImage: IntersectionObserver-based image loader with blur-up effect.
 */
const LazyImage = ({ src, alt = '', style = {}, className, aspectRatio, ...rest }) => {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: style.borderRadius || undefined,
        aspectRatio: aspectRatio || undefined,
        ...style,
      }}
      className={className}
    >
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: loaded ? 'none' : 'blur(20px)',
            transform: loaded ? 'scale(1)' : 'scale(1.05)',
            transition: 'filter 0.6s ease, transform 0.8s ease',
          }}
          loading="lazy"
          {...rest}
        />
      )}
    </div>
  );
};

export default LazyImage;
