import { Typography } from 'antd';
import {
  FontWeightType,
  IntentType,
  SysFontFamilyType,
  fontColorType,
  fontSizeDesktop,
  fontSizeMobile,
  fontSizeTab,
  fontWeightType,
} from './text-local-const';
import { CSSProperties } from 'react';
import useGetResponsiveness from '../../hook/useGetResponsiveness';

type SystemTextProps = {
  variant?: IntentType;
  fontWeight?: FontWeightType;
  fontFamily?: SysFontFamilyType;
  fontColor?:
  | 'light'
  | 'dark'
  | 'sys_gray'
  | 'sys_golden'
  | 'sys_success'
  | 'sys_danger';
  children?: React.ReactElement | React.ReactElement[] | React.ReactNode | React.ReactNode[],
  style?: CSSProperties
};
export const SystemText =
  ({
    variant = 'h1',
    fontWeight = 'normal',
    fontFamily = 'Playfair Display',
    fontColor = 'dark',
    children,
    ...rest
  }: SystemTextProps) => {
    const { isMobile, isTab } = useGetResponsiveness()
    return <Typography style={{
      margin: '0px',
      padding: '0px',
      fontSize: isMobile ? fontSizeMobile[variant] : isTab ? fontSizeTab[variant] : fontSizeDesktop[variant],
      fontWeight: fontWeightType[fontWeight],
      fontFamily: fontFamily,
      color: fontColorType[fontColor],
      // [theme.breakpoints.down('md')]: {
      //   fontSize: fontSizeTab[variant],
      // },
      // [theme.breakpoints.down('sm')]: {
      //   fontSize: fontSizeMobile[variant],
      // },
    }} {...rest}>{children} </Typography>
  }

