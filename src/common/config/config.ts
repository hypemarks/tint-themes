import regExp from './reg-exp';

export enum PostMessageActions {
  OPEN_PUBLIC_POST = 'OPEN_PUBLIC_POST',
  OPEN_POPUP = 'OPEN_POPUP',
  THEME_LOADED = 'THEME_LOADED',
  POPUP_LOADED = 'POPUP_LOADED',
  LOAD_OLD_THEME = 'LOAD_OLD_THEME',
  PUBLIC_POST_SUBMITTED = 'PUBLIC_POST_SUBMITTED',
  CLOSE_POPUP = 'CLOSE_POPUP',
  EDITOR_PERSONALIZATION_CHANGED = 'EDITOR_PERSONALIZATION_CHANGED',
  EDITOR_OPENED_PUBLIC_POST = 'EDITOR_OPENED_PUBLIC_POST',
  EDITOR_OPENED_POPUP = 'EDITOR_OPENED_POPUP',
  EDITOR_CLOSED_POPUP = 'EDITOR_CLOSED_POPUP',
  UPDATE_POPUP_DATA = 'UPDATE_POPUP_DATA',
  CHANGE_POST_POPUP = 'CHANGE_POST_POPUP',
  EXPAND_POST_MESSAGE = 'EXPAND_POST_MESSAGE',
  INFINITE_SCROLL_FETCH = 'INFINITE_SCROLL_FETCH',
  POSTS_ARE_FETCHED = 'POSTS_ARE_FETCHED',
}

enum HighlightVideoPlaybackOptions {
  DONT_PLAY = 'dont-autoplay',
  PLAY_ENTIRE = 'play-entire-video',
  PLAY_TO_TRANSITION = 'play-to-transition',
}

export enum ThemeLayoutOptions {
  TEXT = 'text',
  IMAGE = 'image',
  TEXT_ON_HOVER = 'text_on_hover',
}

export const globalConfig = {
  urls: {
    tiktokSDKUrl: 'https://www.tiktok.com/embed.js',
    blankAvatarUrl: 'https://cdn.hypemarks.com/assets/analytics/EmptyProfile.png',
  },
  shareWindow: {
    width: 500,
    height: 300,
  },
  highlightPosts: {
    dontPlay: HighlightVideoPlaybackOptions.DONT_PLAY,
    playEntire: HighlightVideoPlaybackOptions.PLAY_ENTIRE,
    playToTransition: HighlightVideoPlaybackOptions.PLAY_TO_TRANSITION,
  },
  postMessage: {
    actions: {
      openPublicPost: PostMessageActions.OPEN_PUBLIC_POST,
      openPopup: PostMessageActions.OPEN_POPUP,
      themeLoaded: PostMessageActions.THEME_LOADED,
      popupLoaded: PostMessageActions.POPUP_LOADED,
      loadOldTheme: PostMessageActions.LOAD_OLD_THEME,
      publicPostSubmitted: PostMessageActions.PUBLIC_POST_SUBMITTED,
      closePopup: PostMessageActions.CLOSE_POPUP,
      editorPersonlizationChanged: PostMessageActions.EDITOR_PERSONALIZATION_CHANGED,
      editorOpenedPublicPost: PostMessageActions.EDITOR_OPENED_PUBLIC_POST,
      editorOpenedPopup: PostMessageActions.EDITOR_OPENED_POPUP,
      editorClosedPopup: PostMessageActions.EDITOR_CLOSED_POPUP,
      updatePopupData: PostMessageActions.UPDATE_POPUP_DATA,
      changePostPopup: PostMessageActions.CHANGE_POST_POPUP,
      expandPostMessage: PostMessageActions.EXPAND_POST_MESSAGE,
      fetchInfiniteScroll: PostMessageActions.INFINITE_SCROLL_FETCH,
      postsAreFetched: PostMessageActions.POSTS_ARE_FETCHED,
    },
  },
  regExp: regExp,
  icons: {
    common: {
      share: {
        color: '#ccc',
        fontSize: '16px',
      },
      postAction: {
        fontSize: '12px',
      },
      sourceIconAsImage: {
        fontSize: '30px',
      },
    },
    popup: {
      navigation: {
        fontSize: '30px',
      },
      sourceIconAsImage: {
        fontSize: '30px',
      },
    },
    themes: {
      navItem: {
        color: '#fff',
      },
      navSearch: {
        color: '#fff',
      },
    },
  },
  masonry: {
    transitionSpeed: 100,
  },
  tooltip: {
    hideSpeed: 500,
    hideUpdate: 500,
  },
  fileStack: {
    width: {
      default: 300,
      xSmallMediaQuery: 400,
      smallMediaQuery: 500,
      mediumMediaQuery: 500,
    },
  },
  defaultShareOptions: ['fb', 'li', 'pin', 'email', 'tw'],
  defaultPublicPostPlaceholders: {
    authorImageLabel: 'Upload a photo of yourself:',
    customLabel: 'Custom Field',
    customPlaceholder: 'Additional information...',
    descriptionPlaceholder: 'Write a caption...',
    emailLabel: 'Your Email',
    emailPlaceholder: 'example@example.com',
    globalErrorText: 'Check your form for errors.',
    nameLabel: 'Your Name',
    namePlaceholder: 'First & Last Name',
    postImagePlaceholder: 'add an image',
    requiredText: '*Required',
    submitButton: 'share my post now!',
    termsLinkText: 'Terms & Conditions!',
    termsText: 'By submitting my photo and additional information I agree to these',
    title: 'Add a post',
  },
  genericAvatarTextColor: '#FFFFFF',
  genericAvatarBackgroundColor: '#517FA4',
  autoScrollSpeed: {
    slower: 400,
    slow: 200,
    normal: 100,
    fast: 50,
    faster: 25,
  },
  cta: {
    buttonShow: 'both',
    buttonColor: '#000000',
    textColor: '#ffffff',
  },
  hotspot: {
    color: '#ffffff',
    outlineColor: '#79b0da',
    size: '30',
  },
  popup: {
    font: 'Lato',
    fontColorBody: '#000',
    fontColorBodyDisabled: true,

    fontColorAuthor: '#000',
    fontColorAuthorDisabled: true,

    fontColorAuthorUsername: '#CCCCCC',
    fontColorAuthorUsernameDisabled: true,

    fontColorLink: '#4598BA',
    fontColorLinkDisabled: true,

    imageBackgroundColor: '#000000',
    imageBackgroundColorDisabled: true,

    backgroundColor: '#FFFFFF',
    backgroundColorDisabled: true,

    fontColorHashtagHighlight: '#4598BA',
    fontColorHashtagHighlightDisabled: true,

    lightboxColor: '#000000',
    lightboxColorDisabled: true,

    showAuthorName: true,
    showAuthorUsername: true,
    showTimestamp: true,
    size: 'normal',

    postTimeLinkColor: '#e4e4e4',
  },
  defaultQueryCount: 25,
  postTypesWithTitle: ['rss', 'youtube', 'flickr', 'review_trackers', 'google_news'],
  connectedHashtagHighlightColor: '#4598BA',
  fontColorPost: '#000000',
  fontSizeSecondary: 18,
  fontSecondary: 'Lato',
  colorNamebarButtonsBackground: '#4598BA',
  colorNamebarButtonsTextColor: '#3C3C40',
  postHighlightDuration: '15000',
  postTransitionSpeed: '15000',
  inlineVideoPlayback: 'none',
  postWidth: '300',
  postPadding: '10',
  slider: {
    themeLayout: ThemeLayoutOptions.TEXT,
  },
};
