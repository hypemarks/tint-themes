import { getStyleProperties, IGetStyleProperties } from './pick-style-properties';
import { globalConfig } from '../common/config/config';

export interface IStylePickerProps {
  FONT_SIZE: 'fontSize';
  FONT_COLOR: 'fontColor';
  FONT_FAMILY: 'fontFamily';
  MAIN_COLOR: 'colorNameBarButtons';
  POST_PADDING: 'postPadding';
  POST_WIDTH: 'postWidth';
}

export interface IUseStylePicker {
  style: IGetStyleProperties;
  postDimensions?: IUseStylePickerPostDimensions;
}

export interface IUseStylePickerPostDimensions {
  postWidth: number;
  highlightPostWidth: number;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
const postStylePicker = (
  outputStyleProps: IStylePickerProps,
  config: { [key: string]: any },
  containerWidth?: number
): IUseStylePicker => {
  const { columns, postPadding, postWidth } = config;

  const getMargin = () => {
    const half = 2;
    return !isNaN(Number(postPadding) / half) ? Number(postPadding) / half : Number(globalConfig.postPadding) / half;
  };

  const getWidth = (): IUseStylePickerPostDimensions | undefined => {
    if (!containerWidth) return;

    const margin = getMargin();
    if (columns !== undefined && !isNaN(columns) && columns > 0) {
      const widthIfColumnsSet = Math.floor(containerWidth / columns) - margin * 2;
      return {
        postWidth: widthIfColumnsSet,
        highlightPostWidth: 2 * widthIfColumnsSet + margin * 2,
      };
    }

    const singlePostWidth = postWidth ? Number(postWidth) : Number(globalConfig.postWidth);
    const possibleNoOfColumns = Math.floor(containerWidth / (singlePostWidth + margin * 2));
    const totalWidthForPossibleColumns = possibleNoOfColumns * (singlePostWidth + margin * 2);
    const widthLeft = containerWidth - totalWidthForPossibleColumns;
    const widthPerColumn = widthLeft / possibleNoOfColumns;
    const widthIfNoColumns = singlePostWidth + widthPerColumn;

    return {
      postWidth: widthIfNoColumns,
      highlightPostWidth: 2 * widthIfNoColumns + margin * 2,
    };
  };

  const squarePostStyles = getStyleProperties(outputStyleProps, config);

  return {
    style: {
      ...squarePostStyles,
      margin: `${getMargin()}px`,
    },
    postDimensions: containerWidth ? getWidth() : undefined,
  };
};

export default postStylePicker;
