/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Markdown from 'markdown-to-jsx';
import { Button } from '@nextui-org/react';

// function CodeBlock({ language, value }: any) {
//   return (
//     <SyntaxHighlighter style={dark} language={language}>
//       {value}
//     </SyntaxHighlighter>
//   );
// }

function Messenger() {
  const [pox, setPox] = useState<any>('');
  const [loading, setLoading] = useState(true);

  function Code({ className, children }: any) {
    const language = className?.replace('lang-', '');
    return (
      <div className="codeBlock ">
        <Button>copy</Button>
        <SyntaxHighlighter
          language={language?.toLowerCase()}
          style={materialDark}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    );
  }

  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
  });

  async function main() {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content:
            'write a medium blog for react and angular js examples and pros cons. add also code examples (mini counter app) and compire tables'
        }
      ],
      model: 'gpt-3.5-turbo'
    });
    console.log(chatCompletion, 'mudahim');
    return chatCompletion;
  }

  const a = async () => {
    try {
      const res = await main();

      setPox(res.choices[0].message.content);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    a();
  }, []);

  return (
    <div className="h-full overflow-y-scroll">
      {loading ? (
        <div className="loading loading03 h-full">
          <div>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
        </div>
      ) : (
        <div className="markdown-table-container">
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: 'h1',
                  props: {
                    className: 'text-4xl font-bold text-gray-900 my-4'
                  }
                },
                h2: {
                  component: 'h2',
                  props: {
                    className: 'text-3xl font-bold text-gray-800 my-4'
                  }
                },
                h3: {
                  component: 'h3',
                  props: {
                    className: 'text-2xl font-bold text-gray-700 my-3'
                  }
                },
                h4: {
                  component: 'h4',
                  props: {
                    className: 'text-xl font-bold text-gray-600 my-3'
                  }
                },
                h5: {
                  component: 'h5',
                  props: {
                    className: 'text-lg font-bold text-gray-600 my-2'
                  }
                },
                h6: {
                  component: 'h6',
                  props: {
                    className: 'text-md font-bold text-gray-600 my-2'
                  }
                },
                p: {
                  component: 'p',
                  props: {
                    className: 'mb-4 text-gray-700'
                  }
                },
                a: {
                  component: 'a',
                  props: {
                    className:
                      'text-blue-600 hover:underline hover:text-blue-800 transition duration-300'
                  }
                },
                ul: {
                  component: 'ul',
                  props: {
                    className:
                      'list-disc list-inside space-y-2 p-5 bg-gray-100   rounded-xl'
                  }
                },
                ol: {
                  component: 'ol',
                  props: {
                    className:
                      'list-decimal list-inside space-y-2 p-5 bg-gray-800  rounded-xl'
                  }
                },
                li: {
                  component: 'li',
                  props: {
                    className: 'mb-2 text-gray-100'
                  }
                },
                blockquote: {
                  component: 'blockquote',
                  props: {
                    className:
                      'p-4 italic border-l-4 bg-neutral-100 text-neutral-600 border-blue-500 quote'
                  }
                },
                strong: {
                  component: 'strong',
                  props: {
                    className: 'font-semibold'
                  }
                },
                em: {
                  component: 'em',
                  props: {
                    className: 'italic'
                  }
                },
                del: {
                  component: 'del',
                  props: {
                    className: 'line-through'
                  }
                },
                img: {
                  component: 'img',
                  props: {
                    className:
                      'my-4 mx-auto max-w-full h-auto rounded-lg shadow-lg'
                  }
                },
                code: {
                  component: Code
                },
                // pre: {
                //   component: 'pre',
                //   props: {
                //     className:
                //       'bg-gray-900 text-white overflow-x-auto p-4 rounded-lg font-mono text-sm my-4 shadow-lg'
                //   }
                // },
                table: {
                  component: 'table',
                  props: {
                    className:
                      'min-w-full divide-y divide-gray-300 shadow-sm border border-gray-200 rounded-lg overflow-hidden'
                  }
                },
                thead: {
                  component: 'thead',
                  props: {
                    className: 'bg-gray-50 text-gray-700 text-left'
                  }
                },
                tbody: {
                  component: 'tbody',
                  props: {
                    className: 'bg-white divide-y divide-gray-300'
                  }
                },
                th: {
                  component: 'th',
                  props: {
                    className: 'px-6 py-3 font-bold text-gray-600'
                  }
                },
                td: {
                  component: 'td',
                  props: {
                    className: 'px-6 py-3 text-gray-700'
                  }
                },
                hr: {
                  component: 'hr',
                  props: {
                    className: 'my-6 border-gray-300'
                  }
                }
              }
            }}
          >
            {pox}
          </Markdown>
        </div>
      )}
    </div>
  );
}

export default Messenger;
