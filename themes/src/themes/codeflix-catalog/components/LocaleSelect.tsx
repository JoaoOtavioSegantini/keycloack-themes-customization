// @flow
import { Select, SelectProps } from "@mui/material";
import React from "react";

interface LocaleSelectProps extends SelectProps {
  locales: { url: string; label: string }[];
}

const LocaleSelect: React.FunctionComponent<LocaleSelectProps> = (props) => {
  const { locales, ...selectProps } = props;
  return (
    <Select
      native
      {...selectProps}
      onChange={(event) => {
        const locale = locales.find((l) => event.target.value === l.label);
        window.location.href = locale!.url;
      }}
    >
      {locales.map((locale, key) => (
        <option value={locale.label} key={Math.floor(Math.random() * key)}>
          {locale.label}
        </option>
      ))}
    </Select>
  );
};

export default LocaleSelect;
