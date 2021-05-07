import { IPost } from '@tintup/tint-sdk/lib';
import { IPostWithCTA } from '../src';

interface IRelationships {
  cta_associations: {
    data: ReadonlyArray<{
      type: 'cta_association';
      id: string;
    }>;
  };
  product_tags: {
    data: ReadonlyArray<{
      id: string;
      type: string;
    }>;
  };
}

const buildMetaData = (overrides = {}): { sentiment: string; language: string } => {
  return {
    sentiment: 'randomword',
    language: 'randomword',
    ...overrides,
  };
};

const buildAuthor = (
  overrides = {}
): {
  image_url: string;
  name: string;
  url: string;
  username: string;
} => {
  return {
    image_url: 'https://i.picsum.photos/id/230/200/300.jpg?hmac=pyhlpgJN2oBeEzhJbnJYrCsLoJM6MKd_NUQGIQhVx5k',
    name: 'randomword',
    url: 'https://i.picsum.photos/id/230/200/300.jpg?hmac=pyhlpgJN2oBeEzhJbnJYrCsLoJM6MKd_NUQGIQhVx5k',
    username: 'randomword',
    ...overrides,
  };
};

const buildRelationships = (overrides = {}): IRelationships => {
  return {
    cta_associations: {
      data: [{ type: 'cta_association', id: 'randomword' }],
    },
    product_tags: {
      data: [
        {
          id: 'string',
          type: '',
        },
      ],
    },
    ...overrides,
  };
};

const buildPost = (overrides = {}): IPost | IPostWithCTA => {
  return {
    attributes: {
      author: buildAuthor(),
      external_id: '123',
      alternative_text: 'alt',
      highlighted: true,
      image_url: 'https://i.picsum.photos/id/230/200/300.jpg?hmac=pyhlpgJN2oBeEzhJbnJYrCsLoJM6MKd_NUQGIQhVx5k',
      video_url: null,
      pinned: true,
      published_at: new Date().toString(),
      tags: ['randomword', 'randomword'],
      text: 'randomword',
      title: 'randomword',
      type: 'youtube',
      url: 'randomword',
      metadata: buildMetaData(),
    },
    id: '123',
    type: 'randomword',
    relationships: buildRelationships(),
    cta: [],
    ...overrides,
  };
};

const buildPosts = (objs: ReadonlyArray<any> = []) => {
  return objs.map(overrides => buildPost(overrides));
};

const buildShareButtonOptions = (overrides = []) => {
  return ['li', 'pin', 'email', ...overrides];
};

const buildUTM = (overrides = {}) => {
  return {
    campaign: 'campaign',
    source: 'source',
    medium: 'medium',
    content: 'content',
    term: 'term',
    ...overrides,
  };
};

const buildCTAConfig = (overrides = {}) => {
  return {
    ctaButtonColor: '',
    ctaButtonShow: 'both',
    ctaButtonTextColor: '',
    appendUtmToCta: buildUTM(),
    ...overrides,
  };
};

const buildHotspotConfig = (overrides = {}) => {
  return {
    hotspotColor: null,
    hotspotOutlineColor: null,
    hotspotSize: null,
    ...overrides,
  };
};

const buildSliderConfig = (overrides = {}) => {
  return {
    columns: 1,
    postPadding: '10',
    postWidth: '300',
    ctaConfig: buildCTAConfig(),
    noPopup: true,
    fontColor: '#55ee77',
    fontFamily: 'Lato',
    fontSize: 16,
    timeLanguage: 'en-short',
    showAuthor: 1,
    backgroundColor: '#123eee',
    textColor: '#a2a2a2',
    imageEffect: null,
    shareButtons: 1,
    shareButtonOptions: buildShareButtonOptions(),
    noImages: false,
    noImagesScaling: false,
    hotspotConfig: buildHotspotConfig(),
    isPopupLoaded: false,
    themeLayout: 'text',
    postBackgroundColor: '#fff',
    postDuration: 1000,
    colorNameBarButtons: '#67eaea',
    ...overrides,
  };
};

export { buildMetaData, buildAuthor, buildRelationships, buildPost, buildPosts, buildSliderConfig };
