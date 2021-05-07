import { Nullable } from '@tintup/tint-sdk/lib';
import { faFacebookF, faLinkedinIn, faPinterest, faTwitter, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

type GetUrlType = ({
  link,
  title,
  image,
  titleScrubbed,
  body,
}: {
  link?: string;
  title?: string;
  image?: Nullable<string>;
  titleScrubbed?: string;
  body?: string;
}) => string;

interface IShareOption {
  code: string;
  name: string;
  icon: IconDefinition;
  color: string;
  getUrl: GetUrlType;
}

interface IShareOptions {
  [key: string]: IShareOption;
}

const SHARE_OPTIONS: IShareOptions = {
  tw: {
    code: 'tw',
    name: 'Twitter',
    icon: faTwitter,
    color: '#00aced',
    getUrl: ({
      link,
      titleScrubbed,
    }: {
      link?: string;
      title?: string;
      image?: Nullable<string>;
      titleScrubbed?: string;
      body?: string;
    }): string => `https://twitter.com/intent/tweet?url=${link}&text=${titleScrubbed}`,
  },
  fb: {
    code: 'fb',
    name: 'Facebook',
    icon: faFacebookF,
    color: '#3b5998',
    getUrl: ({
      link,
      title,
    }: {
      link?: string;
      title?: string;
      image?: Nullable<string>;
      titleScrubbed?: string;
      body?: string;
    }): string => `http://www.facebook.com/sharer.php?u=${link}&via=tint&t=${title}`,
  },
  li: {
    code: 'li',
    name: 'LinkedIn',
    icon: faLinkedinIn,
    color: '#007bb6',
    getUrl: ({
      link,
      title,
    }: {
      link?: string;
      title?: string;
      image?: Nullable<string>;
      titleScrubbed?: string;
      body?: string;
    }): string => `https://www.linkedin.com/shareArticle?url=${link}&title=${title}&source=TINT`,
  },
  pin: {
    code: 'pin',
    name: 'Pinterest',
    icon: faPinterest,
    color: '#cb2027',
    getUrl: ({
      link,
      title,
      image,
    }: {
      link?: string;
      title?: string;
      image?: Nullable<string>;
      titleScrubbed?: string;
      body?: string;
    }): string => `https://www.pinterest.com/pin/create/button/?url=${link}&description=${title}&media=${image}`,
  },
  email: {
    code: 'email',
    name: 'Email',
    icon: faEnvelope,
    color: '#26E0BD',
    getUrl: ({
      body,
    }: {
      link?: string;
      title?: string;
      image?: Nullable<string>;
      titleScrubbed?: string;
      body?: string;
    }): string => `mailto:?subject=You+are+going+to+love+this&body=${body}`,
  },
};

export default SHARE_OPTIONS;
