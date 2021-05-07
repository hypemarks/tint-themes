import { PostType } from '@tintup/tint-sdk/lib/';
import {
  faFacebookSquare,
  faFlickr,
  faInstagram,
  faLinkedin,
  faSlackHash,
  faTumblrSquare,
  faTwitter,
  faYoutube,
  IconName,
  IconPrefix,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBullhorn,
  faComments,
  faHome,
  faMobile,
  faNewspaper,
  faPencilAlt,
  faPuzzlePiece,
  faRss,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

interface IconDefinition {
  prefix: IconPrefix;
  iconName: IconName;
}

interface ISourceType {
  [key: string]: {
    name: string;
    color: string;
    code: string;
    component: IconDefinition;
  };
}

export type CommonSocialType = 'home' | 'externally_sourced_posts_account';

export type IconType = PostType | 'search' | CommonSocialType;

const SOURCE_TYPES: ISourceType = {
  youtube: {
    name: 'fab fa-youtube',
    color: '#FF0000',
    code: '\uf167',
    component: faYoutube,
  },
  twitter: {
    name: 'fab fa-twitter',
    color: '#00aced',
    code: '\uf099',
    component: faTwitter,
  },
  home: {
    name: 'fas fa-home',
    color: '#fff',
    code: '\uf015',
    component: faHome,
  },
  public_post: {
    name: 'fas fa-pencil-alt',
    color: '#17c267',
    code: '\uf303',
    component: faPencilAlt,
  },
  tumblr: {
    name: 'fab fa-tumblr-square',
    color: '#32506d',
    code: '\uf174',
    component: faTumblrSquare,
  },
  google_news: {
    name: 'far fa-newspaper',
    color: '#dd4b39',
    code: '\uf1ea',
    component: faNewspaper,
  },
  search: {
    name: 'fas fa-search',
    color: '#fff',
    code: '\uf002',
    component: faSearch,
  },
  custom: {
    name: 'fas fa-user',
    color: '#fff',
    code: '\uf007',
    component: faUser,
  },
  rss: {
    name: 'fas fa-rss',
    color: '#4287f5',
    code: '\uf09e',
    component: faRss,
  },
  instagram_business: {
    name: 'fab fa-instagram',
    color: '#4287f5',
    code: '\uf16d',
    component: faInstagram,
  },
  facebook: {
    name: 'fab fa-facebook-square',
    color: '#4287f5',
    code: '\uf082',
    component: faFacebookSquare,
  },
  linkedin: {
    name: 'fab fa-linkedin',
    color: '#4287f5',
    code: '\uf08c',
    component: faLinkedin,
  },
  sms: {
    name: 'far fa-mobile',
    color: '#4287f5',
    code: '\uf10b',
    component: faMobile,
  },
  flickr: {
    name: 'fab fa-flickr',
    color: '#4287f5',
    code: '\uf16e',
    component: faFlickr,
  },
  externally_sourced_posts_account: {
    name: 'fas fa-puzzle-piece',
    color: '#fff',
    code: '\uf12e',
    component: faPuzzlePiece,
  },
  externally_sourced_posts: {
    name: 'fas fa-puzzle-piece',
    color: '#fff',
    code: '\uf12e',
    component: faPuzzlePiece,
  },
  slack: {
    name: 'fab fa-slack-hash',
    color: '#4598ba',
    code: '\uf198',
    component: faSlackHash,
  },
  review_trackers: {
    name: 'fas fa-comments',
    color: '#4598ba',
    code: '\uf086',
    component: faComments,
  },
  exb_form: {
    name: 'fas fa-megaphone',
    color: '#fff',
    code: '\uf0a1',
    component: faBullhorn,
  },
  form_submission: {
    name: 'fas fa-megaphone',
    color: '#fff',
    code: '\uf0a1',
    component: faBullhorn,
  },
};

export const getIcon = (
  type: IconType
):
  | {
      name: string;
      color: string;
      code: string;
      component: IconDefinition;
    }
  | undefined => SOURCE_TYPES[type];
