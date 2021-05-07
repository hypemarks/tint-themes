/* eslint-disable */
const buildFormatter = require('react-timeago/lib/formatters/buildFormatter').default;
const enStrings = require('react-timeago/lib/language-strings/en').default;
const enShortStrings = require('react-timeago/lib/language-strings/en-short').default;
const arStrings = require('react-timeago/lib/language-strings/ar').default;
const zhCnStrings = require('react-timeago/lib/language-strings/zh-CN').default;
const zhTwStrings = require('react-timeago/lib/language-strings/zh-TW').default;
const daStrings = require('react-timeago/lib/language-strings/da').default;
const nlStrings = require('react-timeago/lib/language-strings/nl').default;
const deStrings = require('react-timeago/lib/language-strings/de').default;
const deShortStrings = require('react-timeago/lib/language-strings/de-short').default;
const fiStrings = require('react-timeago/lib/language-strings/fi').default;
const frStrings = require('react-timeago/lib/language-strings/fr').default;
const frShortStrings = require('react-timeago/lib/language-strings/fr-short').default;
const jaStrings = require('react-timeago/lib/language-strings/ja').default;
const noStrings = require('react-timeago/lib/language-strings/no').default;
const plStrings = require('react-timeago/lib/language-strings/pl').default;
const ptStrings = require('react-timeago/lib/language-strings/pt').default;
const ptShortStrings = require('react-timeago/lib/language-strings/pt-short').default;
const svStrings = require('react-timeago/lib/language-strings/sv').default;
const esStrings = require('react-timeago/lib/language-strings/es').default;
const esShortStrings = require('react-timeago/lib/language-strings/es-short').default;

export default (language?: string) => {
  switch (language) {
    case 'en':
      return buildFormatter(enStrings);
    case 'en-short':
      return buildFormatter(enShortStrings);
    case 'ar':
      return buildFormatter(arStrings);
    case 'zh-CN':
      return buildFormatter(zhCnStrings);
    case 'zh-TW':
      return buildFormatter(zhTwStrings);
    case 'da':
      return buildFormatter(daStrings);
    case 'nl':
      return buildFormatter(nlStrings);
    case 'de':
      return buildFormatter(deStrings);
    case 'de-short':
      return buildFormatter(deShortStrings);
    case 'fi':
      return buildFormatter(fiStrings);
    case 'fr':
      return buildFormatter(frStrings);
    case 'fr-short':
      return buildFormatter(frShortStrings);
    case 'ja':
      return buildFormatter(jaStrings);
    case 'no':
      return buildFormatter(noStrings);
    case 'pl':
      return buildFormatter(plStrings);
    case 'pt':
      return buildFormatter(ptStrings);
    case 'pt-short':
      return buildFormatter(ptShortStrings);
    case 'sv':
      return buildFormatter(svStrings);
    case 'es':
      return buildFormatter(esStrings);
    case 'es-short':
      return buildFormatter(esShortStrings);
    default:
      return buildFormatter(enStrings);
  }
};
