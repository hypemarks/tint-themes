import { IStylePickerProps } from './post-style-picker';

const CSSStyleProp = {
  FONT_SIZE: 'fontSize',
  FONT_COLOR: 'fontColor',
  FONT_FAMILY: 'fontFamily',
  MAIN_COLOR: 'colorNameBarButtons',
  TEXT_COLOR: 'textColor',
  POST_PADDING: 'postPadding',
  POST_WIDTH: 'postWidth',
  POST_BACKGROUND: 'postBackgroundColor',
};

export interface IGetStyleProperties {
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  backgroundColor?: string;
  width?: string;
  margin?: string;
}

export const getStyleProperties = (
  styleProperties: IStylePickerProps,
  config: { [key: string]: string | number }
): IGetStyleProperties => {
  const styles = Object.values(styleProperties)
    .map((value: string) => {
      const configValue = config[value];
      return value && configValue && getStyleValue(value, configValue);
    })
    .filter(Boolean);

  let result = {};

  for (let i = 0; i < styles.length; i++) {
    result = { ...result, ...styles[i] };
  }

  return result;
};

const getStyleValue = (key: string, value: string | number): IGetStyleProperties | undefined => {
  switch (key) {
    case CSSStyleProp.FONT_COLOR:
      return { color: `${value}` };

    case CSSStyleProp.FONT_SIZE:
      return { fontSize: `${value}px` };

    case CSSStyleProp.FONT_FAMILY:
      return { fontFamily: `${value}` };

    case CSSStyleProp.POST_BACKGROUND:
      return { backgroundColor: `${value}` };

    case CSSStyleProp.POST_WIDTH:
      return { width: `${value}px` };

    default:
      return;
  }
};
