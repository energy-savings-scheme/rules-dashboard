import React from 'react';

import FooterNSW, { FooterLinks, FooterLower } from 'nsw-ds-react/footer/footer';

export default function Footer() {
  return (
    <FooterNSW>
      <FooterLower>
        <div className="nsw-container">
          <p>
            We pay respect to the Traditional Custodians and First Peoples of NSW, and acknowledge
            their continued connection to their country and culture.
          </p>
          <hr />
          <FooterLinks
            footerLinks={[
              {
                url: '#',
                text: 'Tertiary',
              },
              {
                url: '#',
                text: 'Tertiary',
              },
              {
                url: '#',
                text: 'Tertiary',
              },
              {
                url: '#',
                text: 'Tertiary',
              },
            ]}
          />
          <p>Copyright © 2019</p>
        </div>
      </FooterLower>
    </FooterNSW>
  );
}
