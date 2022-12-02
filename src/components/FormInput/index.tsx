import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
  control: Control<any, any>;
  name: string;
  label: string;
}

const FormInput = ({ control, name, label }: IProps) => {
  return (
    <Controller
      render={({
        field: { value, onChange },
        fieldState: { invalid, error },
      }) => (
        <FormControl>
          <TextField
            variant="filled" 
            label={label}
            value={value}
            onChange={onChange}
            error={invalid}
            helperText={error?.message}
          />
        </FormControl>
      )}
      name={name}
      control={control}
    />
  );
};

export default FormInput;
