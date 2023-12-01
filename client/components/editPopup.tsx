import React from 'react';
import styles from './styles.module.css';

const EditPopupForm = (props: any) => {
  return props.trigger ? (
    <div className={styles.popup}>
      <div className={styles.popupInner}>{props.children}</div>
    </div>
  ) : (
    ''
  );
};

export default EditPopupForm;