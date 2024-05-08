// import { DatePicker } from '@nextui-org/react';
// import { ReactElement } from 'react';
// import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';

// interface IAppHandledSelect {
//   name: string;
//   control: any;
//   rules?: Omit<
//     RegisterOptions<FieldValues>,
//     'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
//   >;
//   required?: boolean;
//   isInvalid?: boolean;
//   variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
//   placeholder?: string;
//   onChangeApp?: any;
//   label?: string;
//   IsDynamic?: boolean;
//   className?: string;
//   errors?: any;
//   selectProps?: any;
//   size?: 'sm' | 'md' | 'lg';
//   IconElement?: any;
// }

// /**
//  * A custom handled date component.
//  *
//  * @param {Object} props - The component props.
//  * @param {string} props.name - The name of the select input.
//  * @param {Object} props.control - The control object from react-hook-form.
//  * @param {Object} props.rules - The validation rules for the select input.
//  * @param {boolean} props.isInvalid - Indicates if the select input is invalid.
//  * @param {Function} props.onChangeApp - The callback function to handle select input change.
//  * @param {boolean} [props.required=false] - Indicates if the select input is required.
//  * @param {string} [props.className] - The CSS class name for the select input.
//  * @param {Object} [props.selectProps] - Additional props to be passed to the Select component.
//  * @param {string} props.size - The size of the select input.
//  * @param {string} props.label - The label for the select input.
//  * @returns {JSX.Element} The rendered handled select component.
//  */
// function AppHandledSelect({
//   name,
//   control,
//   rules,
//   isInvalid,
//   onChangeApp,
//   required = false,
//   className,
//   selectProps,
//   size,
//   label
// }: IAppHandledSelect): ReactElement {
//   const { t } = useTranslation();
//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       render={({ field: { onChange, value } }) => (
//         <DatePicker
//           required={required}
//           label={label}
//           size={size}
//           isInvalid={isInvalid}
//           classNames={{
//             trigger: `border-1 border-divider ${
//               selectProps?.isDisabled ? 'bg-[#d7d7d7] dark:bg-[#27272A]' : ''
//             }`
//           }}
//           onChange={e => {
//             onChange(e);
//             onChangeApp && onChangeApp(e);
//           }}
//           // onSelectionChange={onChange}
//           // selectedKeys={value}
//           className={className}
//           errorMessage={isInvalid && t('thisFieldMustEntered')}
//           {...selectProps}
//           variant={selectProps?.isDisabled ? 'flat' : 'bordered'}
//         />
//       )}
//     />
//   );
// }

// export default AppHandledSelect;

import React from 'react';

export default function AS() {
  return <div>AS</div>;
}
