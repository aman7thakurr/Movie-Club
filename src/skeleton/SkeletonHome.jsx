import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import styles from '../Styles/skeleton.module.css'; 

const SkeletonHome = () => {
  return (
    <>
      <div className={styles.skeletonWrapper}>
        <Skeleton height={40} width={200} style={{ marginBottom: 20 }} />
        
        <div className={styles.carouselWrapper}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className={styles.carouselItem}>
              <Skeleton height={200} width={300} style={{ marginBottom: 10 }} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={150} />
            </div>
          ))}
        </div>

        <Skeleton height={40} width={200} style={{ marginBottom: 20 }} />
        
        <div className={styles.carouselWrapper}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className={styles.carouselItem}>
              <Skeleton height={200} width={300} style={{ marginBottom: 10 }} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={150} />
            </div>
          ))}
        </div>
        
        <Skeleton height={40} width={200} style={{ marginBottom: 20 }} />
        
        <div className={styles.carouselWrapper}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className={styles.carouselItem}>
              <Skeleton height={200} width={300} style={{ marginBottom: 10 }} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={150} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkeletonHome;
