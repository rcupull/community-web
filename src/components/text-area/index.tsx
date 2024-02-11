import { forwardRef } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { useFormikField } from 'hooks/useFormikField';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    FormFieldWrapperProps {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, label, ...omittedProps } = props;

  const { field, error } = useFormikField(props);

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <textarea
        ref={ref}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...omittedProps}
        {...field}
      />
    </FormFieldWrapper>
  );
});