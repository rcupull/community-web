import { FieldInputImage } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldInputImage,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <FieldInputImage name="field" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <FieldInputImage name="field" label="Nombre" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <FieldInputImage name="field" label="Nombre" />
  </FormikWrapper>
);