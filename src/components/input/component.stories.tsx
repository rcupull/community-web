import { Input } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: Input,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <Input name="field" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <Input name="field" label="Nombre" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <Input name="field" label="Nombre" />
  </FormikWrapper>
);
