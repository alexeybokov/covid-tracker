import React from 'react';

import styles from './ErrorIndicator.module.css';

const ErrorIndicator = () => {
  return (
    <div className={styles.errorIndicator}>
      <span>
        Something has gone terribly wrong
      </span>
    </div>
  );
};

export default ErrorIndicator;
