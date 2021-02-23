import React from 'react';

export default function Footer() {
  return (
    <div className="nsw-footer__lower" style={{ marginTop: 40, paddingTop: 40, paddingBottom: 40 }}>
      <div className="nsw-container">
        <p>
          We pay respect to the Traditional Custodians and First Peoples of NSW, and acknowledge
          their continued connection to their country and culture.
        </p>

        <hr />

        <div className="nsw-footer__info">
          <p className="nsw-footer__copyright">Copyright © 2019</p>
        </div>
      </div>
    </div>
  );
}
