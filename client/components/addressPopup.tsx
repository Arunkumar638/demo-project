import React from 'react';
import styles from './styles.module.css';

const AddressPopupForm = (props: any) => {
  return props.trigger ? (
    <div className={styles.popup}>
      <div className={styles.popupInner}>{props.children}</div>
    </div>
  ) : (
    ''
  );
};

export default AddressPopupForm;