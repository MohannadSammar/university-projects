export interface globalColors {
  white: string;
  red: string;
  green: string;
  mainTextColor: string;
  homeBackgroundGradientFrom: string;
  homeBackgroundGradientTo: string;
  reviewContainerBoderColor: string;
  linkColor: string;
  lightGrey: string;
  darkGrey: string;
  grey: string;
}

export interface globalBackgrounds {
  index: string;
  search: string;
  swipe: string;
  profile: string;
  texUploadSucces: string;
  texUploadFailure: string;
  about: string;
  support: string;
  contact: string;
}

export interface globalVariables {
  colors: globalColors;
  backgrounds: globalBackgrounds;
  headerSize: string;
  footerSize: string;
  dropShadowFilter: string;
}

export const TT_VARIABLES: globalVariables = {
  backgrounds: {
    index:
      "linear-gradient(180deg, #000000 0%, rgba(30, 30, 30, 0.73) 60%, rgba(231, 231, 231, 0) 100%)",
    search:
      "linear-gradient(0deg, rgba(196, 196, 196, 0) 0%, rgba(244, 244, 244, 1) 100%)",
    profile:
      "linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 0%, rgba(77, 181, 234, 1) 100%)",
    swipe:
      "linear-gradient(0deg, rgba(231, 231, 231, 0) 0%, rgba(30, 30, 93, 1) 100%)",
    texUploadSucces:
      "linear-gradient(0deg, #ffffff 0%, rgba(231, 231, 231, 0) 0%, rgba(146, 233, 138, 1) 100%)",
    texUploadFailure:
      "linear-gradient(0deg, #ffffff 0%, rgba(231, 231, 231, 0) 0%, rgba(236, 88, 88, 1) 100%)",
    support:
      "linear-gradient(0deg, #ffffff 0%, rgba(231, 231, 231, 0) 0%, rgba(8, 198, 171, 1) 100%)",
    about:
      "linear-gradient(0deg, rgba(231, 231, 231, 0) 0%, rgba(35, 65, 224, 1) 100%)",
    contact:
      "linear-gradient(0deg, rgba(231, 231, 231, 0) 0%, rgba(67, 144, 147, 1) 100%)",
  },
  colors: {
    grey: "#828e99",
    lightGrey: "#dae3ed",
    darkGrey: "#445b75",
    green: "#0FC62C",
    mainTextColor: "#606060",
    linkColor: "#ffae00",
    reviewContainerBoderColor: "rgba(96, 96, 96, 0.1)",
    red: "#EC4343",
    white: "#ffffff",
    homeBackgroundGradientFrom: "rgba(30, 30, 30, 0.73)",
    homeBackgroundGradientTo: "rgba(231, 231, 231, 0)",
  },
  dropShadowFilter:
    "drop-shadow(0.25rem 0.25rem 0.15rem rgba(96, 96, 96, 0.8))",
  headerSize: "100px",
  footerSize: "60px",
};
