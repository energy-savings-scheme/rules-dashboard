import React from 'react';
import { ContentBlock as ContentBlockComponent } from './contenBlock';

export default {
  title: 'Content/ContentBlock',
  component: ContentBlockComponent,
};

const Template = (args) => <ContentBlockComponent {...args} />;
const SvgHTML = (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22.248" cy="16.831" r="9.83" stroke="#333" stroke-width="2"></circle>
    <path
      d="M3.121 53.864c.377-5.925 1.682-11.782 4.62-16.133 2.896-4.287 7.426-7.187 14.507-7.187 7.082 0 11.611 2.9 14.507 7.187 2.939 4.35 4.244 10.208 4.62 16.133.101 1.585-1.202 2.934-2.878 2.934H6c-1.676 0-2.98-1.349-2.879-2.934z"
      stroke="#333"
      stroke-width="2"
    ></path>
    <circle cx="48.01" cy="28.552" r="6.483" stroke="#0085B3" stroke-width="2"></circle>
    <path
      d="M60.924 52.86l-.997.073.997-.074zM44.38 55.856a1 1 0 100 2v-2zm-3.297-16.99a1 1 0 10.943 1.764l-.943-1.764zm6.927.41c4.58 0 7.346 1.613 9.076 4.007 1.78 2.461 2.563 5.88 2.841 9.649l1.995-.148c-.288-3.887-1.107-7.758-3.215-10.673-2.157-2.984-5.566-4.834-10.697-4.834v2zm-3.63 18.58h12.678v-2H44.38v2zM42.026 40.63c1.586-.847 3.548-1.353 5.984-1.353v-2c-2.72 0-5.014.567-6.927 1.59l.943 1.763zm17.901 12.302c.116 1.57-1.186 2.924-2.869 2.924v2c2.736 0 5.073-2.235 4.864-5.072l-1.995.148z"
      fill="#0085B3"
    ></path>
  </svg>
);
export const TextBlock = Template.bind({});
TextBlock.args = {
  headline: 'Title',
  copy: 'this is a paragraph',
  links: [
    {
      title: 'link 1',
      href: '#',
    },
    {
      title: 'link 2',
      href: '#',
    },
    {
      title: 'link 3',
      href: '#',
    },
  ],
  viewMore: '#',
};

export const IconBlock = Template.bind({});
IconBlock.args = {
  headline: 'Title',
  links: [
    {
      title: 'link 1',
      href: '#',
    },
    {
      title: 'link 2',
      href: '#',
    },
    {
      title: 'link 3',
      href: '#',
    },
  ],
  copy: 'this is a paragraph',
  icon: SvgHTML,
  viewMore: '#',
};

export const ImageBlock = Template.bind({});
ImageBlock.args = {
  headline: 'Title',
  copy: 'this is a paragraph',
  image: 'https://picsum.photos/id/2/400/200',
  viewMore: '#',
};
