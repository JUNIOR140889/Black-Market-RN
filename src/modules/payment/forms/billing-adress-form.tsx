import type { SubmitErrorHandler } from 'react-hook-form';
import { z } from 'zod';

import { withFormHOC } from '../../../core/hoc/with-form-hoc';
import { common } from '../../../translations/en.json';
import { ControlledInput } from '../../../ui/core/input';
import { Text } from '../../../ui/core/text';
import { View } from '../../../ui/core/view';

const _billingSchema = z.object({
  city: z.string({
    required_error: 'City is required',
  }),
  country: z.string({
    required_error: 'Country is required.',
  }),
  adress1: z.string({
    required_error: 'First adress is required',
  }),
  adress2: z
    .string({
      required_error: 'Second adress is required',
    })
    .optional(),
  postalCode: z.string({
    required_error: 'Postal code is required',
  }),
});

const schema = _billingSchema;

export type TBillingAdressFormFields = z.infer<typeof schema>;

export type BillingAdressFormSubmitHandler = (fields: TBillingAdressFormFields) => void;
export type BillingAdressFormSubmitErrorHandler = SubmitErrorHandler<TBillingAdressFormFields>;

const BillingAdressForm = withFormHOC(
  {
    schema,
    config: {
      shouldFocusError: false,
      mode: 'onSubmit',
    },
  },
  ({ formMethods, disabled }) => {
    const { control } = formMethods;

    return (
      <>
        <View className="flex-1">
          <Text variant="h6-bold" className="mb-4 mt-7">
            {common.labels.billingAdresss}
          </Text>
          <Text variant="h6" className="mb-1.5 mt-3">
            {common.labels.city}
            {common.labels.starSign}
          </Text>
          <ControlledInput
            control={control}
            name="city"
            placeholder={common.labels.city}
            editable={!disabled}
          />
        </View>
        <View className="flex-1">
          <Text variant="h6" className="mb-1.5 mt-3">
            {common.labels.country}
            {common.labels.starSign}
          </Text>
          <ControlledInput
            control={control}
            name="country"
            placeholder={common.labels.country}
            editable={!disabled}
          />
        </View>
        <View className="flex-1">
          <Text variant="h6" className="mb-1.5 mt-3">
            {common.labels.adress_1}
            {common.labels.starSign}
          </Text>
          <ControlledInput
            control={control}
            name="adress1"
            placeholder={common.labels.adress_1}
            editable={!disabled}
          />
        </View>
        <View className="flex-1">
          <Text variant="h6" className="mb-1.5 mt-3">
            {common.labels.adress_2}
          </Text>
          <ControlledInput
            control={control}
            name="adress2"
            placeholder={common.labels.adress_2}
            editable={!disabled}
          />
        </View>
        <View className="flex-1">
          <Text variant="h6" className="mb-1.5 mt-3">
            {common.labels.postalCode}
            {common.labels.starSign}
          </Text>
          <ControlledInput
            control={control}
            name="postalCode"
            placeholder={common.labels.postalCode}
            outlineColor="black"
            editable={!disabled}
          />
        </View>
      </>
    );
  },
);

declare type BillingAdressForm = withFormHOC<TBillingAdressFormFields>;

export { BillingAdressForm };
