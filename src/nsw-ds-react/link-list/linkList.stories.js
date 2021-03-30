import React from 'react';
import { StyledLinkList as StyledLinkListComp } from './linkList';

const Preamble = `
### Full documentation

For usage, UX guidelines, and a library of usability testing visit the NSW Design System docs.

### Installing

Our design system react kit comes with all components

\`\`\`bash
npm install nsw-design-system-react
\`\`\`

### Importing

To import this component

\`\`\`javascript
import {StyledLinkList} from "nsw-design-system-react/components/link-list";
\`\`\`

`;

export default {
  title: 'Content/Styled Link List',
  component: StyledLinkListComp,
  parameters: {
    docs: {
      description: {
        component: Preamble,
      },
    },
  },
};

const Template = (args) => <StyledLinkListComp {...args} />;

export const StyledLinkList = Template.bind({});
StyledLinkList.args = {
  items: [
    {
      link: '#',
      text: 'Link 1',
    },
    {
      link: '#',
      text: 'Link 2',
    },
    {
      link: '#',
      text: 'Link 3',
    },
    {
      link: '#',
      text: 'Link 4',
    },
    {
      link: '#',
      text: 'Link 5',
    },
  ],
};
