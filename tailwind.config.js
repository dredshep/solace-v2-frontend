const colors = {
  white: '#FFFFFF',
  white50: '#FAFAFA',
  black: '#000000',
  gray: '#323942',
  gray50: '#F5F6FC',
  gray100: '#E8ECFB',
  gray150: '#D2D9EE',
  gray200: '#B8C0DC',
  gray250: '#A6AFCA',
  gray300: '#98A1C0',
  gray350: '#888FAB',
  gray400: '#7780A0',
  gray450: '#6B7594',
  gray500: '#5D6785',
  gray550: '#505A78',
  gray600: '#404A67',
  gray650: '#333D59',
  gray700: '#293249',
  gray750: '#1B2236',
  gray800: '#131A2A',
  gray850: '#0E1524',
  gray900: '#0D111C',
  gray950: '#080B11',
  pink50: '#F9ECF1',
  pink100: '#FFD9E4',
  pink200: '#FBA4C0',
  pink300: '#FF6FA3',
  pink400: '#FB118E',
  pink500: '#C41969',
  pink600: '#8C0F49',
  pink700: '#55072A',
  pink800: '#350318',
  pink900: '#2B000B',
  pinkVibrant: '#F51A70',
  red50: '#FAECEA',
  red100: '#FED5CF',
  red200: '#FEA79B',
  red300: '#FD766B',
  red400: '#FA2B39',
  red500: '#C4292F',
  red600: '#891E20',
  red700: '#530F0F',
  red800: '#380A03',
  red900: '#240800',
  redVibrant: '#F14544',
  yellow50: '#F6F2D5',
  yellow100: '#DBBC19',
  yellow200: '#DBBC19',
  yellow300: '#BB9F13',
  yellow400: '#A08116',
  yellow500: '#866311',
  yellow600: '#5D4204',
  yellow700: '#3E2B04',
  yellow800: '#231902',
  yellow900: '#180F02',
  yellowVibrant: '#FAF40A',
  gold200: '#EEB317',
  goldVibrant: '#FEB239',
  green50: '#E3F3E6',
  green100: '#BFEECA',
  green200: '#76D191',
  green300: '#40B66B',
  green400: '#209853',
  green500: '#0B783E',
  green600: '#0C522A',
  green700: '#053117',
  green800: '#091F10',
  green900: '#09130B',
  greenVibrant: '#5CFE9D',
  blue50: '#EDEFF8',
  blue100: '#DEE1FF',
  blue200: '#ADBCFF',
  blue300: '#869EFF',
  blue400: '#4C82FB',
  blue500: '#1267D6',
  blue600: '#1D4294',
  blue700: '#09265E',
  blue800: '#0B193F',
  blue900: '#040E34',
  blueVibrant: '#587BFF',
  magentaVibrant: '#FC72FF',
  purple100: '#e8bcf0',
  purple200: '#da8ee7',
  purple300: '#ca5cdd',
  purple400: '#be2ed6',
  purple500: '#b100cd',
  purple600: '#a000c8',
  purple700: '#8a00c2',
  purple800: '#7600bc',
  purple900: '#4c00b0',
  indigo50: '#d1d1fd',
  indigo100: '#babafc',
  indigo200: '#a4a2fc',
  indigo300: '#8d8bfb',
  indigo400: '#7674fa',
  indigo500: '#5F5DF9',
  indigo600: '#4947f8',
  indigo700: '#3431f7',
  indigo800: '#1e1bf7',
  indigo900: '#0c09f2',
}

function opacify(amount, hexColor) {
  if (!hexColor.startsWith('#')) {
    return hexColor
  }

  if (hexColor.length !== 7) {
    throw new Error(
      `opacify: provided color ${hexColor} was not in hexadecimal format (e.g. #000000)`
    )
  }

  if (amount < 0 || amount > 100) {
    throw new Error('opacify: provided amount should be between 0 and 100')
  }

  const opacityHex = Math.round((amount / 100) * 255).toString(16)
  const opacifySuffix = opacityHex.length < 2 ? `0${opacityHex}` : opacityHex

  return `${hexColor.slice(0, 7)}${opacifySuffix}`
}

const sharedTheme = {
  white: colors.white,
  gray: '#8D8F92',
  black: colors.black,
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...sharedTheme,
      background: '#20242A',
      backgroundSurface: '#25292F',
      backgroundBackdrop: '#333942',
      backgroundInteractive: '#323942',
      backgroundMoreInteractive: '#454d59',

      textPrimary: colors.white50,
      textSecondary: '#cfcfcf',
      textTertiary: '#8D8F92',

      accent: '#F2CB44',
      contrastWithAccent: '#3c3c3c',
      secondary: '#b9babc',

      accentAction: '#42A0FF',
      accentActive: colors.blue400,
      accentSuccess: colors.green300,
      accentWarning: colors.yellow300,
    },
    extend: {
      height: {
        15: '3.75rem',
      },
    },
  },
  plugins: [],
}
