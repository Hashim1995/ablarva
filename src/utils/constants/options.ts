/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
import { selectOption } from '@/models/common';
import { Code } from '@/components/layout/markdown-code';
import { MarkdownToJSX } from 'markdown-to-jsx';
import { dictionary } from './dictionary';

const statusOptions: selectOption[] = [
  {
    value: '1',
    label: dictionary.en.active
  },
  {
    value: '2',
    label: dictionary.en.deactivated
  }
];

const isBlockedOptions: selectOption[] = [
  {
    value: '1',
    label: dictionary.en.blocked
  },
  {
    value: '2',
    label: dictionary.en.unblocked
  }
];

const roleOptions: selectOption[] = [
  {
    value: '1',
    label: dictionary.en.admin
  },
  {
    value: '2',
    label: dictionary.en.moderator
  }
];

const docStatusOptions: selectOption[] = [
  {
    value: 1,
    label: dictionary.en.docStatusAgree
  },
  {
    value: 2,
    label: dictionary.en.docStatusSign
  }
];

const fileTypeOptions: selectOption[] = [
  {
    value: 1,
    label: dictionary.en.fileTypeIsMain
  },
  {
    value: 2,
    label: dictionary.en.fileTypeIsPrivate
  }
];

const genderOptions: selectOption[] = [
  {
    value: '1',
    label: dictionary.az.male
  },
  {
    value: '2',
    label: dictionary.az.female
  }
];

const markdownOptions: MarkdownToJSX.Options = {
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
        className: 'mb-4 text-[14px] text-gray-700'
      }
    },
    span: {
      component: 'span',
      props: {
        className: 'text-[14px]'
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
        className: 'list-disc list-inside space-y-2 p-1   rounded-xl'
      }
    },
    ol: {
      component: 'ol',
      props: {
        className: 'list-decimal list-inside space-y-2 p-1 rounded-xl'
      }
    },
    li: {
      component: 'li',
      props: {
        className: 'mb-2 '
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
        className: 'my-4 mx-auto max-w-full h-auto rounded-lg shadow-lg'
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
};

export {
  genderOptions,
  roleOptions,
  fileTypeOptions,
  docStatusOptions,
  isBlockedOptions,
  statusOptions,
  markdownOptions
};
