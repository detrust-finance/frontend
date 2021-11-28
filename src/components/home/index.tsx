import React from 'react'
import styled from 'styled-components'
import {
  // PoppinsSemiBoldDolphin18px,
  PoppinsNormalWhite18px,
  VolkhovBoldTangaroa50px,
  PoppinsMediumMamba16px,
  HelveticaRegularNormalShark17px,
  RobotoMediumManatee14px,
  // RobotoNormalPurpleHeart22px,
  // RobotoNormalMercury22px,
  // PoppinsNormalWhite17px,
  // RobotoNormalPersimmon22px,
  PoppinsMediumDolphin16px,
  PoppinsBoldJellyBean20px,
  HelveticaRegularNormalBunting20px,
  RobotoMediumWhite12px,
  PoppinsMediumCodGray36px,
  RobotoNormalBlueBell14px,
  ValignTextMiddle,
} from "./styledMixins";
import LanguageSelect from '../../theme/ui/common/language-select'
import Account from '../../theme/ui/common/account';

const lauchUrl = '/dashboard/settlor'

///////////////////////////////////////////////
const configDesktop = {
  pageSize: {
    width: 1440,
    height: 4056,
  },
  topLeftLight: {
    width: 480,
    height: 480,
    background: '#E4AED8',
    opacity: 0.3,
    left: -423,
    top: -52,
  },
  heroImage: {
    src: '/images/hero-big.png',
    width: 750,
    height: 800,
    left: 806,
    top: 90,
  },
  heroBg: {
    width: 1490,
    height: 986,
    left: 380,
    top: -195,
  },
  tagLine: {
    left: 150,
    top: 217,
  },
  dataDeco: {
    width: 474,
    height: 12,
    left: 423,
    top: 520,
  },
  dataHeading: {
    width: 633,
    left: 150,
    top: 271,
    children: <>TVL,coin_day,<br />money_has_been_distributed</>,
  },
  dataDesc: {
    width: 539,
    left: 148,
    top: 568,
  },
  heroLaunchApp: {
    left: 148,
    top: 692,
    width: 170,
    height: 60,
  },
  topNav: {
    logo: {
      width: 137,
      height: 25,
      left: 142,
      top: 47,
    },
    item1: {
      left: 478,
      top: 56,
    },
    item2: {
      left: 478+126,
      top: 56,
    },
    item3: {
      left: 478+290,
      top: 56,
    },
    item4: {
      left: 478+443,
      top: 56,
    },
    language: {
      left: 1182,
      top: 51,
    },
    account: {
      size: 40,
      left: 1261,
      top: 46,
    },
  },
  useCases: {
    title: {
      left: 654,
      top: 974,
    },
    desc: {
      width: 629,
      left: 387,
      top: 1011,
    },
    deco: {
      width: 153,
      height: 166,
      left: 1229,
      top: 966,
    },
    case1: {
      image: {
        width: 113,
        height: 113,
        left: 193,
        top: 1169,
      },
      title: {
        left: 204,
        top: 1293,
      },
      desc: {
        left: 159,
        top: 1335,
        width: 181,
        height: 78,
      },
    },
    case2: {
      image: {
        width: 145,
        height: 109,
        left: 647,
        top: 1164,
      },
      title: {
        left: 674,
        top: 1293,
      },
      desc: {
        left: 629,
        top: 1335,
        width: 181,
        height: 78,
      },
      bg1: {
        width: 100,
        height: 100,
        left: 551,
        top: 1391,
        background: '#E9844B',
      } as { width: number; height: number; left: number; top: number; background: string; },
      bg2: {
        width: 267,
        height: 314,
        left: 586,
        top: 1144,
        background: '#FFF',
      } as { width: number; height: number; left: number; top: number; background: string; },
    },
    case3: {
      image: {
        width: 141,
        height: 94,
        left: 1082,
        top: 1181,
      },
      title: {
        left: 1107,
        top: 1293,
      },
      desc: {
        left: 1062,
        top: 1335,
        width: 181,
        height: 78,
      },
    },
  },
  milestone: {
    title: {
      left: 635,
      top: 1631,
    },
    desc: {
      width: 894,
      left: 277,
      top: 1666,
    },
    deco: {
      width: 96,
      height: 252,
      left: 1219,
      top: 1949,     
    },
    image: {
      src: '/images/abstract-big.png',
      width: 1092,
      height: 458,
      left: 174,
      top: 1831,
    },
  },
  links: {
    title: {
      left: 650,
      top: 2429,
    },
    desc: {
      width: 1080,
      left: 186,
      top: 2471,
    },
    link1: {
      group: {
        left: 174,
        top: 2662,
        width: 381,
        height: 425,          
      },
      desc: {
        width: 232,
        height: 60,  
      }
    },
    link2: {
      group: {
        left: 560,
        top: 2662,
        width: 381,
        height: 425,
      },
      desc: {
        width: 232,
        height: 60,  
      }
    },
    link3: {
      group: {
        left: 946,
        top: 2662,
        width: 381,
        height: 425,
      },
      desc: {
        width: 232,
        height: 60,
      }
    },
  },
  launch: {
    deco: {
      width: 153,
      height: 166,
      left: 1251,
      top: 3538,
    },
    bg: {
      width: 1200,
      height: 457,
      left: 104,
      top: 3190,
    },
    bgCircles: [
      {
        width: 285,
        height: 291,
        left: 1000,
        top: -40,
      },
      {
        width: 389,
        height: 397,
        left: -50,
        top: 200,
      },
    ],
    logo: {
      width: 137,
      height: 25,
      left: 657,
      top: 3275,
    },
    desc: {
      width: 947,
      left: 252,
      top: 3325,
    },
    launchApp: {
      left: 595,
      top: 3492,
      width: 250,
      height: 68,
    },
  },
  footer: {
    bg: {
      height: 184,
      background: '#F9F7FE',
    },
    bottomRightLight: {
      width: 480,
      height: 480,
      background: '#D5AEE4',
      opacity: 0.8,
      left: 1361,
      top: 4020,
    },
    item1: {
      left: 165,
      top: 4011,
    },
    item2: {
      left: 253,
      top: 4011,
    },
    item3: {
      left: 369,
      top: 4011,
    },
    item4: {
      left: 481,
      top: 4011,
    },
    link1: {
      width: 50,
      height: 50,
      left: 1126,
      top: 3997,
    },
    link2: {
      width: 50,
      height: 50,
      left: 1179,
      top: 3997,
    },
    link3: {
      width: 50,
      height: 50,
      left: 1232,
      top: 3997,
    },
    splitter: {
      left: 165,
      top: 3989,
      width: 1110,
      height: 1,
      background: '#CDD1D4',
    },
    label: {
      left: 165,
      top: 3929,
    },
    launchApp: {
      width: 107,
      height: 35,
      left: 1167,
      top: 3923,
    },
  },
}

///////////////////////////////////////////////
const configTablet = {
  pageSize: {
    width: 834,
    height: 4876,
  },
  topLeftLight: {
    width: 280,
    height: 280,
    background: '#E4AED8',
    opacity: 0.3,
    left: -192,
    top: -17,
  },
  heroImage: {
    src: '/images/hero-big.png',
    width: 460,
    height: 440,
    left: 417,
    top: 147,
  },
  heroBg: {
    width: 984,
    height: 643,
    left: 100,
    top: -88,
  },
  tagLine: {
    left: 81,
    top: 290,
  },
  dataDeco: {
    width: 474,
    height: 12,
    left: 230,
    top: 739,
  },
  dataHeading: {
    width: 700,
    left: 74,
    top: 396,
    children: <>TVL,<br />coin_day,<br />money_has_been<br />_distributed</>,
  },
  dataDesc: {
    width: 595,
    left: 82,
    top: 796,
  },
  heroLaunchApp: {
    left: 81,
    top: 860,
    width: 182,
    height: 64,
  },
  topNav: {
    logo: {
      width: 137,
      height: 25,
      left: 80,
      top: 65,
    },
    // item1: {
    //   left: 478,
    //   top: 56,
    // },
    // item2: {
    //   left: 478+126,
    //   top: 56,
    // },
    // item3: {
    //   left: 478+290,
    //   top: 56,
    // },
    // item4: {
    //   left: 478+443,
    //   top: 56,
    // },
    language: {
      left: 617,
      top: 60,
    },
    account: {
      size: 40,
      left: 731,
      top: 56,
    },
  },
  useCases: {
    title: {
      left: 362,
      top: 1060,
    },
    desc: {
      width: 641,
      left: 75,
      top: 1115,
    },
    deco: {
      width: 172,
      height: 166,
      left: 640,
      top: 1060,
    },
    case1: {
      image: {
        width: 113,
        height: 113,
        left: 99,
        top: 1220,
      },
      title: {
        left: 109,
        top: 1344,
      },
      desc: {
        left: 63,
        top: 1386,
        width: 181,
        height: 78,
      },
    },
    case2: {
      image: {
        width: 145,
        height: 109,
        left: 348,
        top: 1205,
      },
      title: {
        left: 375,
        top: 1344,
      },
      desc: {
        left: 329,
        top: 1386,
        width: 181,
        height: 78,
      },
      bg1: {
        width: 100,
        height: 100,
        left: 260,
        top: 1450,
        background: '#E9844B',
      } as { width: number; height: number; left: number; top: number; background: string; },
      bg2: {
        width: 267,
        height: 314,
        left: 280,
        top: 1187,
        background: '#FFF',
      } as { width: number; height: number; left: number; top: number; background: string; },
    },
    case3: {
      image: {
        width: 141,
        height: 94,
        left: 572,
        top: 1221,
      },
      title: {
        left: 607,
        top: 1344,
      },
      desc: {
        left: 556,
        top: 1386,
        width: 181,
        height: 78,
      },
    },
  },
  milestone: {
    title: {
      left: 345,
      top: 1670,
    },
    desc: {
      width: 635,
      left: 93,
      top: 1723,
    },
    deco: {
      width: 54,
      height: 171,
      left: 715,
      top: 1977,     
    },
    image: {
      src: '/images/abstract-big.png',
      width: 673,
      height: 291,
      left: 69,
      top: 1918,
    },
  },
  links: {
    title: {
      left: 348,
      top: 2334,
    },
    desc: {
      width: 738,
      left: 58,
      top: 2405,
    },
    link1: {
      group: {
        left: 226,
        top: 2556,
        width: 381,
        height: 425,          
      },
      desc: {
        width: 232,
        height: 60,  
      }
    },
    link2: {
      group: {
        left: 226,
        top: 3013,
        width: 381,
        height: 425,
      },
      desc: {
        width: 232,
        height: 60,  
      }
    },
    link3: {
      group: {
        left: 226,
        top: 3470,
        width: 381,
        height: 425,
      },
      desc: {
        width: 232,
        height: 60,
      }
    },
  },
  launch: {
    deco: {
      width: 153,
      height: 166,
      left: 680,
      top: 4400,
    },
    bg: {
      width: 650,
      height: 473,
      left: 90,
      top: 4049,
    },
    bgCircles: [
      {
        width: 230,
        height: 208,
        left: 404,
        top: 40,
      },
      {
        width: 283,
        height: 283,
        left: -40,
        top: 250,
      },
    ],
    logo: {
      width: 137,
      height: 25,
      left: 318,
      top: 4115,
    },
    desc: {
      width: 588,
      left: 131,
      top: 4173,
    },
    launchApp: {
      left: 270,
      top: 4389,
      width: 276,
      height: 68,
    },
  },
  footer: {
    bg: {
      height: 184,
      background: '#F9F7FE',
    },
    bottomRightLight: {
      width: 480,
      height: 480,
      background: '#D5AEE4',
      opacity: 0.8,
      left: 1361,
      top: 4020,
    },
    item1: {
      left: 44,
      top: 4831,
    },
    item2: {
      left: 132,
      top: 4831,
    },
    item3: {
      left: 248,
      top: 4831,
    },
    item4: {
      left: 360,
      top: 4831,
    },
    link1: {
      width: 50,
      height: 50,
      left: 649,
      top: 4817,
    },
    link2: {
      width: 50,
      height: 50,
      left: 701,
      top: 4817,
    },
    link3: {
      width: 50,
      height: 50,
      left: 754,
      top: 4817,
    },
    splitter: {
      left: 44,
      top: 4809,
      width: 750,
      height: 1,
      background: '#CDD1D4',
    },
    label: {
      left: 44,
      top: 4749,
    },
    launchApp: {
      width: 107,
      height: 35,
      left: 684,
      top: 4743,
    },
  },
}

///////////////////////////////////////////////
const configMobile = {
  pageSize: {
    width: 375,
    height: 4714,
  },
  topLeftLight: {
    width: 480,
    height: 480,
    background: '#E4AED8',
    opacity: 0.3,
    left: -423,
    top: -52,
  },
  heroImage: {
    src: '/images/hero-big.png',
    width: 300,
    height: 284,
    left: 142,
    top: 100,
  },
  heroBg: {
    width: 598,
    height: 396,
    left: 62,
    top: -41,
  },
  tagLine: {
    left: 22,
    top: 248,
    fontSize: 16,
  },
  dataDeco: {
    width: 309,
    height: 8,
    left: 76,
    top: 521,
  },
  dataHeading: {
    width: 316,
    left: 22,
    top: 272,
    children: <>TVL,<br />coin_day,money_has_been_distributed</>,
    fontSize: 30,
    letterSpacing: '-0.04em',
  },
  dataDesc: {
    width: 326,
    left: 29,
    top: 569,
    fontSize: 14,
  },
  heroLaunchApp: {
    left: 20,
    top: 683,
    width: 170,
    height: 60,
  },
  topNav: {
    logo: {
      width: 124,
      height: 23,
      left: 20,
      top: 52,
    },
    // item1: {
    //   left: 478,
    //   top: 56,
    // },
    // item2: {
    //   left: 478+126,
    //   top: 56,
    // },
    // item3: {
    //   left: 478+290,
    //   top: 56,
    // },
    // item4: {
    //   left: 478+443,
    //   top: 56,
    // },
    language: {
      left: 252,
      top: 48,
    },
    account: {
      size: 40,
      left: 315,
      top: 41,
    },
  },
  useCases: {
    title: {
      left: 150,
      top: 866,
      fontSize: 14,
    },
    desc: {
      width: 302,
      left: 36,
      top: 903,
      fontSize: 24,
    },
    deco: {
      width: 153,
      height: 166,
      left: 269,
      top: 858,
    },
    case1: {
      image: {
        width: 113,
        height: 113,
        left: 125,
        top: 1014,
      },
      title: {
        left: 142,
        top: 1138,
        fontSize: 20,
        lineHeight: 23,
      },
      desc: {
        left: 97,
        top: 1180,
        width: 181,
        height: 78,
        fontSize: 16,
      },
    },
    case2: {
      image: {
        width: 145,
        height: 109,
        left: 115,
        top: 1338,
      },
      title: {
        left: 142,
        top: 1467,
        fontSize: 20,
        lineHeight: 23,
      },
      desc: {
        left: 97,
        top: 1509,
        width: 181,
        height: 78,
        fontSize: 16,
      },
      bg1: {
        width: 100,
        height: 100,
        left: 19,
        top: 1565,
        background: '#E9844B',
      } as { width: number; height: number; left: number; top: number; background: string; },
      bg2: {
        width: 267,
        height: 314,
        left: 54,
        top: 1318,
        background: '#FFF',
      } as { width: number; height: number; left: number; top: number; background: string; },
    },
    case3: {
      image: {
        width: 141,
        height: 94,
        left: 117,
        top: 1725,
      },
      title: {
        left: 142,
        top: 1837,
        fontSize: 20,
        lineHeight: 23,
      },
      desc: {
        left: 97,
        top: 1879,
        width: 181,
        height: 78,
        fontSize: 16,
      },
    },
  },
  milestone: {
    title: {
      left: 151,
      top: 2057,
      fontSize: 14,
    },
    desc: {
      width: 392,
      left: -9,
      top: 2094,
      fontSize: 24,
    },
    deco: {
      width: 46,
      height: 122,
      left: 324,
      top: 2198,     
    },
    image: {
      src: '/images/abstract-big.png',
      width: 335,
      height: 139,
      left: 20,
      top: 2179,
    },
  },
  links: {
    title: {
      left: 140,
      top: 2420,
      fontSize: 14,
    },
    desc: {
      width: 326,
      left: 26,
      top: 2462,
      fontSize: 24,
    },
    link1: {
      group: {
        left: 39,
        top: 2547,
        width: 360,
        height: 425,          
      },
      desc: {
        width: 232,
        height: 60,  
      }
    },
    link2: {
      group: {
        left: 39,
        top: 2992,
        width: 360,
        height: 425,
      },
      desc: {
        width: 232,
        height: 60,  
      }
    },
    link3: {
      group: {
        left: 39,
        top: 3437,
        width: 360,
        height: 425,
      },
      desc: {
        width: 232,
        height: 60,
      }
    },
  },
  launch: {
    deco: {
      width: 153,
      height: 166,
      left: 1251,
      top: 3538,
    },
    bg: {
      width: 335,
      height: 407,
      left: 20,
      top: 3983,
    },
    bgCircles: [
      {
        width: 390,
        height: 397,
        left: 30,
        top: 120,
      },
      // {
      //   width: 389,
      //   height: 397,
      //   left: -50,
      //   top: 200,
      // },
    ],
    logo: {
      width: 137,
      height: 25,
      left: 119,
      top: 4031,
    },
    desc: {
      width: 320,
      left: 29,
      top: 4096,
      fontSize: 20,
      lineHeight: 40,
    },
    launchApp: {
      left: 62,
      top: 4271,
      width: 250,
      height: 68,
    },
  },
  footer: {
    bg: {
      height: 184,
      background: '#F9F7FE',
    },
    bottomRightLight: {
      width: 480,
      height: 480,
      background: '#D5AEE4',
      opacity: 0.8,
      left: 296,
      top: 4594,
    },
    // item1: {
    //   left: 165,
    //   top: 4011,
    // },
    // item2: {
    //   left: 253,
    //   top: 4011,
    // },
    // item3: {
    //   left: 369,
    //   top: 4011,
    // },
    // item4: {
    //   left: 481,
    //   top: 4011,
    // },
    link1: {
      width: 40,
      height: 40,
      left: 215,
      top: 3997 + 668,
    },
    link2: {
      width: 40,
      height: 40,
      left: 215 + 53,
      top: 3997 + 668,
    },
    link3: {
      width: 40,
      height: 40,
      left: 215 + 106,
      top: 3997 + 668,
    },
    splitter: {
      left: 0,
      top: 3989 + 658,
      width: 375,
      height: 1,
      background: '#CDD1D4',
    },
    label: {
      left: 20,
      top: 3929 + 658,
    },
    launchApp: {
      width: 107,
      height: 35,
      left: 246,
      top: 3923 + 658,
    },
  },
}

const configByDevice : {[key: string] : any} = {
  mobile: configMobile,
  tablet: configTablet,
  desktop: configDesktop,
}

interface HomeProps {
  device: string;
}

function Home({device}: HomeProps) {
  const c = configByDevice[device]

  return (
    <HorizontalCenterPage {...c.pageSize}>
      {/* Hero */}
      <Ellipse {...c.topLeftLight} />
      <Image src='/images/hero-bg.svg' {...c.heroBg} />
      <Image {...c.heroImage} />
      <Tagline id='hero' {...c.tagLine}>DATA OF THE PROTOCOL:</Tagline>
      <Image src='/images/data-deco.svg' {...c.dataDeco} />
      <Heading {...c.dataHeading} />
      <Desc {...c.dataDesc}>Trust on chain by Smart Contract. Protect your assets and family.</Desc>
      <a href={lauchUrl}>
        <LaunchButton {...c.heroLaunchApp}>Launch App</LaunchButton>
      </a>
      {/* Top Nav */}
      <Logo {...c.topNav.logo} />
      {device === 'desktop' && <>
        <ScrollTopWindowButton>
          <NavItem {...c.topNav.item1}>Home</NavItem>
        </ScrollTopWindowButton>
        <ScrollWindowButton byId='use-cases'>
          <NavItem {...c.topNav.item2}>Use Cases</NavItem>
        </ScrollWindowButton>
        <ScrollWindowButton byId='milestone'>
          <NavItem {...c.topNav.item3}>Milestone</NavItem>
        </ScrollWindowButton>
        <ScrollWindowButton byId='links-to'>
          <NavItem {...c.topNav.item4}>Links To</NavItem>
        </ScrollWindowButton>
      </>}
      {/* <a href={lauchUrl}>
        <HoverImage src='/images/account.svg' {...c.topNav.account} />
      </a> */}
      <LanguageSelect
        sx={{
          position: 'absolute',
          top: c.topNav.language.top,
          left: c.topNav.language.left,
        }}
      />
      <Account
        size={c.topNav.account.size}
        sx={{
          position: 'absolute',
          top: c.topNav.account.top,
          left: c.topNav.account.left
        }}
      />
      {/* Use Cases */}
      <Image src='/images/use-cases-deco.svg' {...c.useCases.deco} />
      <SmallText id='use-cases' {...c.useCases.title}>Use Cases</SmallText>
      <BigText {...c.useCases.desc}>Use Cases Of The Product</BigText>
      {/*   case 1 */}
      <Image src='/images/use-cases-wallet.png' {...c.useCases.case1.image} />
      <UseCasesTitle {...c.useCases.case1.title}>use cases</UseCasesTitle>
      <UseCasesDesc {...c.useCases.case1.desc}>use cases: make 3 use cases of the product</UseCasesDesc>
      {/*   case 2 */}
      <UseCaseBackgroundSmall {...c.useCases.case2.bg1} />
      <UseCaseBackground {...c.useCases.case2.bg2} />
      <Image src='/images/use-cases-trading.png' {...c.useCases.case2.image} />
      <UseCasesTitle {...c.useCases.case2.title}>use cases</UseCasesTitle>
      <UseCasesDesc {...c.useCases.case2.desc}>use cases: make 3 use cases of the product</UseCasesDesc>
      {/*   case 3 */}
      <Image src='/images/use-cases-donation.png' {...c.useCases.case3.image} />
      <UseCasesTitle {...c.useCases.case3.title}>use cases</UseCasesTitle>
      <UseCasesDesc {...c.useCases.case3.desc}>use cases: make 3 use cases of the product</UseCasesDesc>
      {/* Milestone */}
      <SmallText id='milestone' {...c.milestone.title}>Milestone</SmallText>
      <BigText {...c.milestone.desc}>What Would The Protocol Upgrade In The Future</BigText>
      <Image src='/images/abstract-big-deco.svg' {...c.milestone.deco} />
      <Image {...c.milestone.image} />
      {/* Links To */}
      <SmallText id='links-to' {...c.links.title}>Easy and Fast</SmallText>
      <BigText {...c.links.desc}>Learn More About DeTrust, Chat With The Team</BigText>
      {/*   link 1 */}
      <a href="https://twitter.com" target="_blank" rel="noreferrer">
        <ExternalLinkGroup src='/images/twitter-logo.svg' {...c.links.link1.group}>
          <ExternalLinkLabel>Twitter</ExternalLinkLabel>
          <ExternalLinkDesc {...c.links.link1.desc}>Follow @DeTrust for updates and news.</ExternalLinkDesc>
        </ExternalLinkGroup>
      </a>
      {/*   link 2 */}
      <a href="https://github.com" target="_blank" rel="noreferrer">
        <ExternalLinkGroup src='/images/github-logo.svg' {...c.links.link2.group}>
          <ExternalLinkLabel>Github</ExternalLinkLabel>
          <ExternalLinkDesc {...c.links.link2.desc}>Follow @DeTrust for updates and news.</ExternalLinkDesc>
        </ExternalLinkGroup>
      </a>
       {/*   link 3 */}
       <a href="https://telegram.org" target="_blank" rel="noreferrer">
        <ExternalLinkGroup src='/images/telegram-logo.svg' {...c.links.link3.group}>
          <ExternalLinkLabel>Telegram</ExternalLinkLabel>
          <ExternalLinkDesc {...c.links.link3.desc}>Follow @DeTrust for updates and news.</ExternalLinkDesc>
        </ExternalLinkGroup>
      </a>
      {/* Launch */}
      { device !== 'mobile' && <Image src='/images/launch-deco.svg' {...c.launch.deco} /> }
      {/* <Image src='/images/launch-bg.svg' {...c.launch.bg} /> */}
      <LaunchBg {...c.launch.bg}>
        <Image src='/images/circles.svg' {...c.launch.bgCircles[0]} />
        { device !== 'mobile' && <ImageRotated
          src='/images/circles.svg' {...c.launch.bgCircles[1]} /> }
      </LaunchBg>
      <Logo {...c.launch.logo} />
      <BigText2 {...c.launch.desc}>DeTrust Trust on chain by Smart Contract. Protect your assets and family.</BigText2>
      <a href={lauchUrl}>
       <LaunchButton {...c.launch.launchApp}>Launch App</LaunchButton>
      </a>
      {/* Footer */}
      <FooterBg {...c.footer.bg} />
      <Ellipse {...c.footer.bottomRightLight} />
      { device !== 'mobile' && <>
        <ScrollTopWindowButton>
          <SmallNavItem {...c.footer.item1}>Home</SmallNavItem>
        </ScrollTopWindowButton>
        <ScrollWindowButton byId='use-cases'>
          <SmallNavItem {...c.footer.item2}>Use Cases</SmallNavItem>
        </ScrollWindowButton>
        <ScrollWindowButton byId='milestone'>
          <SmallNavItem {...c.footer.item3}>Milestone</SmallNavItem>
        </ScrollWindowButton>
        <ScrollWindowButton byId='links-to'>
          <SmallNavItem {...c.footer.item4}>Links To</SmallNavItem>
        </ScrollWindowButton>
      </>}
      <a href="https://twitter.com" target="_blank" rel="noreferrer">
        <HoverImage src='/images/twitter-logo-round.svg' {...c.footer.link1} />
      </a>
      <a href="https://github.com" target="_blank" rel="noreferrer">
        <HoverImage src='/images/github-logo-round.svg' {...c.footer.link2} />
      </a>
      <a href="https://telegram.org" target="_blank" rel="noreferrer">
        <HoverImage src='/images/telegram-logo-round.svg' {...c.footer.link3} />
      </a>
      <Rectangle {...c.footer.splitter} />
      <TextLabel {...c.footer.label}>@2021 DeTrust</TextLabel>
      <a href={lauchUrl}>
        <SmallLaunchButton {...c.footer.launchApp}>Launch App</SmallLaunchButton>
      </a>
    </HorizontalCenterPage>
  )
}

interface Props {
  width: number;
  height: number;
  children: React.ReactNode;
}

const HorizontalCenterPage = ({children, width, height}: Props) => (
  <div className="container-center-horizontal">
    <Screen width={width} height={height}>{children}</Screen>
  </div>
)

const Screen = styled.div<{width: number, height: number}>`
  position: absolute;
  align-items: flex-end;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
`

const Ellipse = styled.div<{width: number, height: number, left: number, top: number, background: string, opacity: number}>`
  position: absolute;
  background: ${p => p.background};
  opacity: ${p => p.opacity};
  filter: blur(150px);
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
`

const Image = styled.img<{width: number, height: number, left: number, top: number}>`
  position: absolute;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  object-fit: contain;
`

const HoverImage = styled(Image)`
  transition: all 0.2s ease;
  pointer-events: auto;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`

interface Props {
  width: number;
  height: number;
  left: number;
  top: number;
}

const Logo = ({width, height, left, top}: Props) => (
  <Image src='/images/logo.svg' width={width} height={height} left={left} top={top} />
)

interface ScrollWindowProps {
  byId: string;
  children: React.ReactNode;
}

const ScrollWindowButton = ({byId, children}: ScrollWindowProps) => (
  <button className='hide-button'
    onClick = {() => window.scrollBy({
      top: (document.getElementById(byId) as HTMLInputElement).getBoundingClientRect().top - 20,
      behavior: 'smooth',
    })}
  >
    {children}
  </button>
)

interface ScrollTopWindowProps {
  children: React.ReactNode;
}

const ScrollTopWindowButton = ({children}: ScrollTopWindowProps) => (
  <button className='hide-button'
    onClick = {() => window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })}
  >
    {children}
  </button>
)

const NavItem = styled.div<{left: number, top: number}>`
  ${HelveticaRegularNormalShark17px}
  min-height: 20px;
  letter-spacing: 0;

  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;

  transition: all 0.2s ease;
  pointer-events: auto;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const SmallNavItem = styled(NavItem)`
  ${RobotoNormalBlueBell14px}
`

const Tagline = styled.div<{left: number, top: number, fontSize?: number}>`
  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;

  ${PoppinsBoldJellyBean20px}
  min-height: 30px;
  margin-left: 2px;
  letter-spacing: 0;

  ${p => p.fontSize ? `font-size: ${p.fontSize}px;` : ''}
`

const Heading = styled.h1<{width: number, left: number, top: number, fontSize?: number, letterSpacing?: string}>`
  position: absolute;
  width: ${p => p.width}px;
  left: ${p => p.left}px;
  top: ${p => p.top}px;

  font-family: var(--font-family-volkhov);
  color: var(--bunting-2);
  font-size: 82px;
  letter-spacing: -3.28px;
  line-height: 89px;
  word-wrap: break-word;
  /* margin-top: 0px; */

  ${p => p.fontSize ? `font-size: ${p.fontSize}px;` : ''}
  ${p => p.letterSpacing ? `letter-spacing: ${p.letterSpacing};` : ''}
`

const Desc = styled.p<{width: number, left: number, top: number, fontSize?: number, letterSpacing?: string}>`
  ${PoppinsMediumDolphin16px}

  position: absolute;
  width: ${p => p.width}px;
  left: ${p => p.left}px;
  top: ${p => p.top}px;

  letter-spacing: 0;
  line-height: 30px;

  ${p => p.fontSize ? `font-size: ${p.fontSize}px;` : ''}
  ${p => p.letterSpacing ? `letter-spacing: ${p.letterSpacing};` : ''}
`

const SmallText = styled.div<{left: number, top: number, fontSize?: number, letterSpacing?: string}>`
  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;

  ${HelveticaRegularNormalBunting20px}
  text-align: center;
  letter-spacing: 0;
  color: #5E6282;

  ${p => p.fontSize ? `font-size: ${p.fontSize}px;` : ''}
  ${p => p.letterSpacing ? `letter-spacing: ${p.letterSpacing};` : ''}
`

const BigText = styled.div<{width: number, left: number, top: number, fontSize?: number, letterSpacing?: string}>`
  position: absolute;
  width: ${p => p.width}px;
  left: ${p => p.left}px;
  top: ${p => p.top}px;

  ${VolkhovBoldTangaroa50px}
  text-align: center;
  letter-spacing: 0;

  ${p => p.fontSize ? `font-size: ${p.fontSize}px;` : ''}
  ${p => p.letterSpacing ? `letter-spacing: ${p.letterSpacing};` : ''}
`

const BigText2 = styled.div<{width: number, left: number, top: number, fontSize?: number, lineHeight?: number}>`
  position: absolute;
  width: ${p => p.width}px;
  left: ${p => p.left}px;
  top: ${p => p.top}px;

  ${ValignTextMiddle}
  font-family: var(--font-family-poppins);
  font-weight: 600;
  color: var(--dolphin);
  font-size: 33px;
  text-align: center;
  letter-spacing: 0;
  line-height: 54px;

  ${p => p.fontSize ? `font-size: ${p.fontSize}px;` : ''}
  ${p => p.lineHeight ? `line-height: ${p.lineHeight}px;` : ''}`

const Rectangle = styled.div<{width: number, height: number, left: number, top: number, background: string}>`
  position: absolute;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  background: ${p => p.background};
`

const UseCaseBackground = styled.div<{width: number, height: number, left: number, top: number, background: string}>`
  position: absolute;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  background: ${p => p.background};
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481), 0px 20px 13px rgba(0, 0, 0, 0.01), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481);
  border-radius: 36px;
`

const UseCaseBackgroundSmall = styled.div<{width: number, height: number, left: number, top: number, background: string}>`
  position: absolute;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  background: ${p => p.background};
  border-radius: 30px 0px 10px;
`

const UseCasesTitle = styled.div<{left: number, top: number, fontSize?: number, lineHeight?: number}>`
  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  ${HelveticaRegularNormalBunting20px}
  text-align: center;
  letter-spacing: 0;

  ${p => p.fontSize ? `font-size: ${p.fontSize}px;` : ''}
  ${p => p.lineHeight ? `line-height: ${p.lineHeight}px;` : ''}
`

const UseCasesDesc = styled.p<{left: number, top: number, width: number, height: number, fontSize?: number, lineHeight?: number}>`
  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  width: ${p => p.width}px;
  height: ${p => p.height}px;

  ${PoppinsMediumDolphin16px}
  text-align: center;
  letter-spacing: 0;
  line-height: 26px;

  ${p => p.fontSize ? `font-size: ${p.fontSize}px;` : ''}
  ${p => p.lineHeight ? `line-height: ${p.lineHeight}px;` : ''}
`

interface ExternalLinkGroupProps {
  left: number;
  top: number;
  width: number;
  height: number;
  src: string; // source of the image file
  children: React.ReactNode;
}

// twitter, github & telegram
function ExternalLinkGroup({src, left, top, width, height, children}: ExternalLinkGroupProps) {
  return (
    <ExternalLinkGroupContainer left={left} top={top} width={width} height={height}>
      <ExternalLinkGroupBack width={0.85 * width} />
      <ExternalLinkGroupFront width={0.85 * width} height={0.9 * height}>
        <ExternalLinkIcon src={src} width={0.3 * 0.85 * width} margin={0.18 * width} />
        {children}
      </ExternalLinkGroupFront>
    </ExternalLinkGroupContainer>
  )
}

const ExternalLinkGroupContainer = styled.div<{left: number, top: number, width: number, height: number}>`
  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  width: ${p => p.width}px;
  height: ${p => p.height}px;

  transition: all 0.2s ease;
  pointer-events: auto;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`

const ExternalLinkGroupFront = styled.p<{width: number, height: number}>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  background: #FFFFFF;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481), 0px 20px 13px rgba(0, 0, 0, 0.01), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481);
  border-radius: 26px;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-around; */
`

const ExternalLinkGroupBack = styled.p<{width: number}>`
  position: absolute;
  right: 0;
  top: 0;
  width: ${p => p.width}px;
  height: ${p => p.width}px;
  background: #59B1E6;
  opacity: 0.32;
  filter: blur(150px);
`

const ExternalLinkIcon = styled.img<{width: number, margin: number}>`
  width: ${p => p.width}px;
  height: ${p => p.width}px;
  margin: ${p => p.margin}px;
  object-fit: contain;
`

const ExternalLinkLabel = styled.div`
  ${ValignTextMiddle}
  ${PoppinsMediumCodGray36px}
  /* margin-top: 58px; */
  letter-spacing: 0.54px;
  line-height: 44.8px;
  white-space: nowrap;
`

const ExternalLinkDesc = styled.p<{width: number, height: number}>`
  ${PoppinsMediumMamba16px}
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  /* margin-top: 13px; */
  text-align: center;
  letter-spacing: -0.08px;
  line-height: 19.9px;
`

const LaunchBg = styled.div<{left: number, top: number, width: number, height: number}>`
  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  overflow: hidden;

  /* light color */
  background: #DFD7F9;
  opacity: 0.2;
  border-radius: 129px 20px 80px 20px;
`

const ImageRotated = styled(Image)`
  transform: rotate(90deg);
`

const FooterBg = styled.div<{height: number, background: string}>`
  position: absolute;
  height: ${p => p.height}px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${p => p.background};
`

const TextLabel = styled.div<{left: number, top: number}>`
  ${RobotoMediumManatee14px}
  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`

const LaunchButton = styled.div<{left: number, top: number, width: number, height: number, disable?: boolean}>`
  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  transition: all 0.2s ease;
  pointer-events: auto;
  cursor: pointer;

  /* min-width: 170px; */
  width: ${p => p.width}px;
  height: ${p => p.height}px;

  background: linear-gradient(180deg, #${p => p.disable ? 'CDCDCD' : 'FFA666'} 0%, #${p => p.disable ? 'BFBFBF' : 'FF7660'} 100%);
  box-shadow: 2px 17px 44px rgba(${p => p.disable ? '101,101,101' : '255,193,101'},0.4);
  border-radius: 10px;

  ${PoppinsNormalWhite18px}
  text-align: center;
  display: table-cell;
  line-height: ${p => p.height}px;
  letter-spacing: 0;

  &:hover {
    ${p => p.disable ? '' : 'transform: translate(0, -5px);'}
  }
`

const SmallLaunchButton = styled.div<{left: number, top: number, width: number, height: number}>`
  position: absolute;
  left: ${p => p.left}px;
  top: ${p => p.top}px;
  width: ${p => p.width}px;
  height: ${p => p.height}px;

  transition: all 0.2s ease;
  pointer-events: auto;
  cursor: pointer;

  background: #080809;
  border-radius: 17.5px;

  ${RobotoMediumWhite12px}
  text-align: center;
  display: table-cell;
  line-height: ${p => p.height}px;
  letter-spacing: 0;

  &:hover {
    transform: translate(0, -5px);
  }
`

export default Home