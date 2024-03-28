import type { SubmitErrorHandler } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { withFormHOC } from '../../../core/hoc/with-form-hoc';
import { common } from '../../../translations/en.json';
import { ControlledInput } from '../../../ui/core/input';
import { MonthYearPicker, schema as MonthYearSchema } from '../../../ui/core/month-year-picker';
import { Text } from '../../../ui/core/text';
import { View } from '../../../ui/core/view';

export const _adressSchema = z.object({
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

const _cardSchema = z.object({
  cardNumber: z.string({
    required_error: 'Card number is required',
  }),
  cvcCode: z.string({
    required_error: 'CVC is required',
  }),
});

const schema = _adressSchema.and(MonthYearSchema).and(_cardSchema);

export type TBuyFormFields = z.infer<typeof schema>;

export type BuyFormSubmitHandler = (fields: TBuyFormFields) => void;
export type BuyFormSubmitErrorHandler = SubmitErrorHandler<TBuyFormFields>;

const BuyForm = withFormHOC(
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
          <Text variant="h6-bold" className="my-4">
            {common.labels.shippingAdress}
          </Text>
          <Text variant="h6" className="mb-1.5">
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
        <View>
          <Text variant="h6-bold" className="mb-4 mt-7">
            {common.labels.paymentInformation}
          </Text>
        </View>
        <View className="flex-1">
          <Text variant="h6" className="mb-1.5 mt-3">
            {common.labels.cardNumber}
            {common.labels.starSign}
          </Text>
          <ControlledInput
            control={control}
            name="cardNumber"
            placeholder={common.labels.cardNumber}
            outlineColor="black"
            editable={!disabled}
          />
        </View>
        <View>
          <Text variant="h6" className="mb-1.5 mt-3">
            {common.labels.expirationDate}
            {common.labels.starSign}
          </Text>
          <FormProvider {...formMethods}>
            <MonthYearPicker editable={!disabled} />
          </FormProvider>
        </View>
        <View>
          <Text variant="h6" className="mb-1.5 mt-3">
            {common.labels.cvcCode}
            {common.labels.starSign}
          </Text>
          <ControlledInput
            control={control}
            name="cvcCode"
            placeholder={common.labels.cvcCode}
            editable={!disabled}
          />
        </View>
      </>
    );
  },
);

declare type BuyForm = withFormHOC<TBuyFormFields>;

export { BuyForm };
