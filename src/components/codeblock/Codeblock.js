import React from 'react';
import { CopyBlock, a11yLight } from 'react-code-blocks';

export default function Codeblock(props) {
  const { code, language, showLineNumbers } = props;

  return (
    <CopyBlock
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      theme={a11yLight}
      wrapLines
      codeBlock
      codeContainerStyle={{ lineHeight: '2.2rem' }}
    />
  );
}

Codeblock.defaultProps = {
  showLineNumbers: true,
};
