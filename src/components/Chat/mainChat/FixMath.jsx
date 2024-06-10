import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const KaTeXComponent = ({ mathExpression }) => {
  const renderedMath = katex.renderToString(mathExpression, {
    throwOnError: false
  });

  return <span dangerouslySetInnerHTML={{ __html: renderedMath }} />;
};

export default KaTeXComponent;
