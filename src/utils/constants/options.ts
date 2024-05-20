/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
import { selectOption } from '@/models/common';
import { Code } from '@/components/layout/markdown-code';
import i18next from 'i18next';
import { MarkdownToJSX } from 'markdown-to-jsx';

/**
 * Gender options for selection.
 */
const genderOptions: selectOption[] = [
  {
    value: 1,
    label: i18next.t('male')
  },
  {
    value: 2,
    label: i18next.t('female')
  }
];

const markdownOptions: MarkdownToJSX.Options = {
  disableParsingRawHTML: true,

  overrides: {
    code: {
      component: Code
    },
    h1: {
      component: 'h1',
      props: {
        className: 'text-4xl text-default-900 dark:text-white font-bold  my-4'
      }
    },
    h2: {
      component: 'h2',
      props: {
        className: 'text-3xl text-default-900 dark:text-white font-bold  my-4'
      }
    },
    h3: {
      component: 'h3',
      props: {
        className: 'text-2xl text-default-900 dark:text-white font-bold  my-3'
      }
    },
    h4: {
      component: 'h4',
      props: {
        className: 'text-xl text-default-900 dark:text-white font-bold  my-3'
      }
    },
    h5: {
      component: 'h5',
      props: {
        className: 'text-lg text-default-900 dark:text-white font-bold  my-2'
      }
    },
    h6: {
      component: 'h6',
      props: {
        className: 'text-md text-default-900 dark:text-white font-bold  my-2'
      }
    },
    p: {
      component: 'p',
      props: {
        className: 'mb-4 text-default-900 dark:text-white text-[14px] '
      }
    },
    span: {
      component: 'span',
      props: {
        className: ' text-default-900 dark:text-white text-[14px]'
      }
    },
    a: {
      component: 'a',
      props: {
        className:
          ' text-default-900 dark:text-white hover:underline hover:text-blue-800 transition duration-300'
      }
    },
    ul: {
      component: 'ul',
      props: {
        className:
          'list-disc text-default-900 dark:text-white list-inside space-y-2 p-1   rounded-xl'
      }
    },
    ol: {
      component: 'ol',
      props: {
        className:
          'list-decimal text-default-900 dark:text-white list-inside space-y-2 p-1 rounded-xl'
      }
    },
    li: {
      component: 'li',
      props: {
        className: 'mb-2 text-default-900 dark:text-white'
      }
    },
    blockquote: {
      component: 'blockquote',
      props: {
        className:
          'p-4 italic border-l-4 text-default-900 dark:text-white bg-neutral-100 text-neutral-600 border-blue-500 quote'
      }
    },
    strong: {
      component: 'strong',
      props: {
        className: 'font-semibold text-default-900 dark:text-white'
      }
    },
    em: {
      component: 'em',
      props: {
        className: 'italic text-default-900 dark:text-white'
      }
    },
    del: {
      component: 'del',
      props: {
        className: 'line-through text-default-900 dark:text-white'
      }
    },
    img: {
      component: 'img',
      props: {
        className: 'my-4 mx-auto max-w-full  h-auto rounded-lg shadow-lg'
      }
    },
    table: {
      component: 'table',
      props: {
        className:
          'min-w-full divide-y divide-gray-300 text-default-900 dark:text-white shadow-sm border border-gray-200 rounded-lg overflow-hidden'
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
    // pre: {
    //   component: 'pre',
    //   props: {
    //     className:
    //       'bg-gray-900 text-default-900 dark:text-white overflow-x-auto p-4 rounded-lg font-mono text-sm my-4 shadow-lg'
    //   }
    // },
  }
};

const industriesOptions: selectOption[] = [
  { value: '1', label: 'Tech' },
  { value: '2', label: 'Marketing' },
  { value: '3', label: 'Machine learning' },
  { value: '4', label: 'Biotechnology' },
  { value: '5', label: 'Healthcare' },
  { value: '6', label: 'Education' },
  { value: '7', label: 'Finance' },
  { value: '8', label: 'Insurance' },
  { value: '9', label: 'Real Estate' },
  { value: '10', label: 'Retail' },
  { value: '11', label: 'Manufacturing' },
  { value: '12', label: 'Transportation' },
  { value: '13', label: 'Construction' },
  { value: '14', label: 'Energy' },
  { value: '15', label: 'Agriculture' },
  { value: '16', label: 'Mining' },
  { value: '17', label: 'Legal' },
  { value: '18', label: 'Art & Design' },
  { value: '19', label: 'Entertainment' },
  { value: '20', label: 'Hospitality' },
  { value: '21', label: 'Nonprofit' },
  { value: '22', label: 'Government' },
  { value: '23', label: 'Consulting' },
  { value: '24', label: 'Food & Beverages' },
  { value: '25', label: 'Telecommunications' },
  { value: '26', label: 'Sports' },
  { value: '27', label: 'Publishing' },
  { value: '28', label: 'Fashion' },
  { value: '29', label: 'Media' },
  { value: '30', label: 'Advertising' },
  { value: '31', label: 'Automotive' },
  { value: '32', label: 'Aerospace' },
  { value: '33', label: 'Chemicals' },
  { value: '34', label: 'Computers' },
  { value: '35', label: 'Electronics' },
  { value: '36', label: 'Security' },
  { value: '37', label: 'Maritime' },
  { value: '38', label: 'Pharmaceuticals' },
  { value: '39', label: 'Recreational' },
  { value: '40', label: 'Utilities' },
  { value: '41', label: 'Logistics' },
  { value: '42', label: 'Crafts' },
  { value: '43', label: 'Human Resources' },
  { value: '44', label: 'Public Relations' },
  { value: '45', label: 'Environment' },
  { value: '46', label: 'Veterinary' },
  { value: '47', label: 'Space' },
  { value: '48', label: 'Archaeology' },
  { value: '49', label: 'Meteorology' },
  { value: '50', label: 'Oceanography' }

];

const companySizeOptions: selectOption[] = [
  {
    value: 1,
    label: '1-10'
  },
  {
    value: 2,
    label: '20-50'
  },
  {
    value: 3,
    label: '50-150'
  },
  {
    value: 4,
    label: '1500-500'
  },
  {
    value: 5,
    label: '500-1000'
  }
];
const jobtitleOptions: selectOption[] = [
  {
    value: 1,
    label: 'Developer'
  },
  {
    value: 2,
    label: 'CEO'
  },
  {
    value: 3,
    label: 'CTO'
  },
  {
    value: 4,
    label: 'Marketing manager'
  },
  {
    value: 5,
    label: 'Human resource'
  }
];

/**
 * Creates an array of objects representing days of the month.
 * Each object contains a value and label representing the day.
 * @returns {Array<{ value: string, label: string }>} The array of days.
 */
function createDaysArray(): Array<{ value: string; label: string }> {
  const daysArray = [];
  for (let day = 1; day <= 31; day++) {
    daysArray.push({ value: day?.toString(), label: day.toString() });
  }
  return daysArray;
}

/**
 * Creates an array of years between the specified start and end years.
 * @param startYear The start year of the array. Default is 1940.
 * @param endYear The end year of the array. Default is 2023.
 * @returns {Array<{ value: string, label: string }>} The array of days.
 */
function createYearsArray(
  startYear = 1940,
  endYear = 2023
): Array<{ value: string; label: string }> {
  const yearsArray = [];
  for (let year = startYear; year <= endYear; year++) {
    yearsArray.push({ value: year?.toString(), label: `${year}` });
  }
  return yearsArray;
}

/**
 * Retrieves an array of months with their corresponding values.
 * @returns {Array<{ value: string, label: string }>} The array of days.
 */
function getMonthsArray(): Array<{ value: string; label: string }> {
  const months: string[] = i18next.t('months', { returnObjects: true });

  return months.map((month, index) => ({
    value: (index + 1)?.toString(),
    label: month
  }));
}

const monthsList = getMonthsArray();
const daysList = createDaysArray();
const yearsList = createYearsArray();

export {
  genderOptions,
  daysList,
  yearsList,
  monthsList,
  markdownOptions,
  industriesOptions,
  companySizeOptions,
  jobtitleOptions
};
