import * as React from 'react';
import Select from 'react-select';
import {Props} from "react-select/lib/Select";
import {darkBlue, grayBorder, lightYellow, yellow} from "../../colors";
import {StylesConfig} from "react-select/lib/styles";

export const TransparentStyle = (width: string): StylesConfig => ({
  singleValue: (base) => ({
    ...base,
    color: "#fff",
    fontSize: "1.25rem",
  }),
  container: (base) => ({
    ...base,
    width: width
  }),
  control: (base) => ({
    ...base,
    border: "unset",
    backgroundColor: "transparent",
  }),
  option: (base) => ({
    ...base,
    color: darkBlue,
    fontSize: "1.25rem",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none'
  }),
});

export const DefaultStyle: StylesConfig = ({
  singleValue: (base) => ({
    ...base,
    color: darkBlue,
    fontSize: "1.25rem",
  }),
  control: (base) => ({
    ...base,
    border: `1px solid ${grayBorder}`,
    backgroundColor: "white",
  }),
  option: (base) => ({
    ...base,
    color: darkBlue,
    fontSize: "1.25rem",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none'
  }),
});

export const StyledSelect = (props: Props) => (
  <Select
    styles={DefaultStyle}
    {...props}
    theme={(theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: yellow,
        primary75: yellow,
        primary50: lightYellow,
        primary25: lightYellow,
      },
    })}
  />
);