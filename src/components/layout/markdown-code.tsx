import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * A reusable code block component that uses `react-syntax-highlighter` to display syntax-highlighted code.
 * This component supports multiple programming languages and includes line numbers for better readability.
 *
 * @summary A syntax-highlighted code block component.
 * @module Code
 * @exports Code
 * @example
 * // Example usage:
 * <Code className="lang-js">
 * {`
 *  function greet(name) {
 *    return 'Hello, ' + name;
 *  }
 * `}
 * </Code>
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - The language class name in the form `lang-[language]`.
 * @param {string} [props.children] - The code content to be highlighted and displayed.
 * @returns {JSX.Element} The syntax-highlighted code block component.
 */

export function Code({ className, children }: any) {
  const language = className?.replace('lang-', '');
  return (
    <div className="codeBlock">
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
