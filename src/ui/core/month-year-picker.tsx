import { type ComponentProps, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { common } from '../../translations/en.json';
import { Dropdown } from './dropdown';
import type { Input } from './input';
import { View } from './view';

const monthOptions = Array.from({ length: 12 }, (_, index) => ({
  label: (index + 1).toString(),
  value: (index + 1).toString(),
}));

const yearOptions = [
  {
    label: '2024',
    value: 2024,
  },
  {
    label: '2025',
    value: 2025,
  },
  {
    label: '2026',
    value: 2026,
  },
  {
    label: '2027',
    value: 2027,
  },
  {
    label: '2028',
    value: 2028,
  },
  {
    label: '2029',
    value: 2029,
  },
];

export const schema = z.object({
  expirationMonth: z.number({
    required_error: 'Expiration month required',
  }),
  expirationYear: z.number({
    required_error: 'Year is required',
  }),
});

export type TInput = z.infer<typeof schema>;

export type Props = Pick<ComponentProps<typeof Input>, 'editable'>;

export const MonthYearPicker = ({ editable }: Props) => {
  const context = useFormContext<TInput>();
  if (!context) throw new Error('Month and Year must be used within a FormProvider');

  const { watch, setValue, control, resetField } = context;
  const month = watch('expirationMonth') || '';
  const year = watch('expirationYear') || '';

  const [showMonthDropDown, setShowMonthDropDown] = useState(false);
  const [showYearDropDown, setShowYearDropDown] = useState(false);

  return (
    <>
      <View className="mb-2">
        <Dropdown
          dropDownPlaceholder={common.place_holders.month_picker}
          name="expirationMonth"
          list={monthOptions}
          control={control}
          visible={showMonthDropDown}
          showDropDown={() => {
            if (editable !== false) setShowMonthDropDown(true);
          }}
          onDismiss={() => setShowMonthDropDown(false)}
          setValue={value => {
            resetField('expirationMonth');
            setValue('expirationMonth', value, { shouldDirty: true });
          }}
          value={month}
        />
      </View>
      <View>
        <Dropdown
          dropDownPlaceholder={common.place_holders.year_picker}
          name="expirationYear"
          list={yearOptions}
          control={control}
          visible={showYearDropDown}
          showDropDown={() => {
            if (editable !== false) setShowYearDropDown(true);
          }}
          onDismiss={() => setShowYearDropDown(false)}
          setValue={value => {
            resetField('expirationYear');
            setValue('expirationYear', value, { shouldDirty: true });
          }}
          value={year}
        />
      </View>
    </>
  );
};
