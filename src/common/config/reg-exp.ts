/* eslint-disable */
export interface IRegExp {
  url: RegExp;
  mobile: RegExp;
  youtubeUrl: RegExp;
  facebookUrl: RegExp;
  vimeoUrl: RegExp;
  vineUrl: RegExp;
  youtubeId: RegExp;
  vimeoId: RegExp;
  vineId: RegExp;
  tikTokClass: RegExp;
  questionMark: RegExp;
}

const regExp: IRegExp = {
  url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-]*)?\??(?:[-+=&;%@.\w]*)#?(?:[.!/\\\w]*))?)/,
  mobile: /Mobi/,
  youtubeUrl: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
  facebookUrl: /^https:\/\/www\.facebook\.com\/([^\/?].+\/)?video(s|\.php)[\/?].*$/,
  vimeoUrl: /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/,
  vineUrl: /(http|https)?:\/\/(www\.)?vine.co\//,
  youtubeId: /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
  vimeoId: /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/,
  vineId: /https:\/\/vine\.co\/v\/([a-zA-Z0-9]*)\/?/,
  tikTokClass: /tiktok-embed/,
  questionMark: /[?]/,
};

export default regExp;
