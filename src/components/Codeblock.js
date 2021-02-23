import React from 'react';
import { CopyBlock, github } from 'react-code-blocks';

export default function Codeblock(props) {
  const { code, language, showLineNumbers } = props;

  return (
    <CopyBlock
      text={props.code}
      language={props.language}
      showLineNumbers={props.showLineNumbers}
      theme={github}
      wrapLines
      codeBlock
    />
  );
}

Codeblock.defaultProps = {
  showLineNumbers: true,
};
