import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function Code({ className, children }: any) {
  const language = className?.replace('lang-', '');
  return (
    <div className="codeBlock ">
      <SyntaxHighlighter
        language={language?.toLowerCase()}
        style={materialDark}
        showLineNumbers
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
