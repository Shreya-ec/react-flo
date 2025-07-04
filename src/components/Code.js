
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Highlight, { Prism } from 'prism-react-renderer';

import themeStyle from "assets/syntax-themes/ghcolors.json";

export default (props) => {
  const { code = "", language = "jsx" } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const CodeStyling = ({ className, style, tokens, getLineProps, getTokenProps }) => (
    <Card className="position-relative pe-8 mb-3">
      <Card.Body className='code-bg'>
        <pre className={`${className} mb-0`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
            </div>
          ))}
        </pre>

        {copied ? <span className="text-success copy-code-text">Copied</span> : null}

        <OverlayTrigger placement="top" overlay={<Tooltip className="m-0">Copy to clipboard</Tooltip>}>
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <Button size="sm" variant="primary" className="copy-code-button">Copy</Button>
          </CopyToClipboard>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );

  return (
    <Highlight Prism={Prism} code={code} language={language} theme={themeStyle}>
      {CodeStyling}
    </Highlight>
  );
};

