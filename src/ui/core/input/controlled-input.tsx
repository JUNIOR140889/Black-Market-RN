import * as React from 'react';
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInput } from 'react-native';

import type { NInputProps } from './input';
import { Input } from './input';

type TRule = Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;

export type RuleType<T> = { [name in keyof T]: TRule };

export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

interface ControlledInputProps<T extends FieldValues> extends NInputProps, InputControllerType<T> {}

// only used with react-hook-form
function FControlledInput<T extends FieldValues>(props: ControlledInputProps<T>, ref: any) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });

  return (
    <Input
      ref={value => {
        field.ref(value);
        if (ref) {
          ref.current = value;
        }
      }}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={field.value as string}
      error={fieldState.error?.message}
      {...inputProps}
    />
  );
}

export const ControlledInput = React.forwardRef(FControlledInput) as <T extends FieldValues>(
  props: ControlledInputProps<T> & { ref?: React.ForwardedRef<TextInput> },
) => ReturnType<typeof FControlledInput>;
