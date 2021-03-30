import React from 'react';
import { FooterLinks, FooterLower, FooterSectionGroup, FooterUpper } from './footer';
import Footer from './footer';

export default {
  title: 'Templates/Footer',
  components: Footer,
};

const Template = () => (
  <Footer>
    <FooterUpper>
      <FooterSectionGroup
        heading={{
          url: '#',
          text: 'Section Link',
        }}
        sectionLinks={[
          {
            url: '#',
            text: 'Section Link',
          },
          {
            url: '#',
            text: 'Section Link',
          },
          {
            url: '#',
            text: 'Section Link',
          },
          {
            url: '#',
            text: 'Section Link',
          },
        ]}
      />
      <FooterSectionGroup
        heading={{
          url: '#',
          text: 'Section Link',
        }}
        sectionLinks={[
          {
            url: '#',
            text: 'Section Link',
          },
          {
            url: '#',
            text: 'Section Link',
          },
          {
            url: '#',
            text: 'Section Link',
          },
          {
            url: '#',
            text: 'Section Link',
          },
        ]}
      />
    </FooterUpper>
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
        <p>Copyright © 2021</p>
      </div>
    </FooterLower>
  </Footer>
);

export const FooterTemplate = Template.bind({});
