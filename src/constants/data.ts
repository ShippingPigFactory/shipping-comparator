// src/constants/data.ts

export const SHIPPING_RATES = {
    sagawa: {
        btob: {
            "60": { hokkaido: 510, kita_tohoku: 480, minami_tohoku: 480, kanto: 450, shinetsu: 450, tokai: 410, hokuriku: 410, kansai: 450, chugoku: 450, shikoku: 440, kita_kyushu: 460, minami_kyushu: 460 },
            "80": { hokkaido: 620, kita_tohoku: 570, minami_tohoku: 550, kanto: 490, shinetsu: 490, tokai: 450, hokuriku: 450, kansai: 480, chugoku: 490, shikoku: 470, kita_kyushu: 510, minami_kyushu: 510 },
            "100": { hokkaido: 830, kita_tohoku: 710, minami_tohoku: 680, kanto: 540, shinetsu: 540, tokai: 490, hokuriku: 490, kansai: 540, chugoku: 560, shikoku: 510, kita_kyushu: 580, minami_kyushu: 600 },
            "120": { hokkaido: 1250, kita_tohoku: 1000, minami_tohoku: 900, kanto: 690, shinetsu: 740, tokai: 660, hokuriku: 660, kansai: 640, chugoku: 660, shikoku: 610, kita_kyushu: 680, minami_kyushu: 720 },
            "140": { hokkaido: 1250, kita_tohoku: 1000, minami_tohoku: 900, kanto: 690, shinetsu: 740, tokai: 660, hokuriku: 660, kansai: 640, chugoku: 660, shikoku: 610, kita_kyushu: 680, minami_kyushu: 720 },
            "160": { hokkaido: 1900, kita_tohoku: 1460, minami_tohoku: 1330, kanto: 1050, shinetsu: 1040, tokai: 900, hokuriku: 920, kansai: 770, chugoku: 860, shikoku: 660, kita_kyushu: 940, minami_kyushu: 1010 },
            "170": { hokkaido: 4877, kita_tohoku: 3913, minami_tohoku: 3550, kanto: 3277, shinetsu: 3113, tokai: 2795, hokuriku: 2895, kansai: 2522, chugoku: 2413, shikoku: 2313, kita_kyushu: 2686, minami_kyushu: 3113 },
            "180": { hokkaido: 5522, kita_tohoku: 4350, minami_tohoku: 3913, kanto: 3595, shinetsu: 3431, tokai: 3059, hokuriku: 3168, kansai: 2686, chugoku: 2686, shikoku: 2577, kita_kyushu: 2895, minami_kyushu: 3377 },
            "200": { hokkaido: 7022, kita_tohoku: 5468, minami_tohoku: 4877, kanto: 4395, shinetsu: 4186, tokai: 3704, hokuriku: 3813, kansai: 3222, chugoku: 3222, shikoku: 3113, kita_kyushu: 3486, minami_kyushu: 4131 }
        },
        normal: {
            "60": { hokkaido: 510, kita_tohoku: 480, minami_tohoku: 480, kanto: 450, shinetsu: 450, tokai: 410, hokuriku: 410, kansai: 450, chugoku: 450, shikoku: 440, kita_kyushu: 460, minami_kyushu: 460 },
            "80": { hokkaido: 620, kita_tohoku: 570, minami_tohoku: 550, kanto: 490, shinetsu: 490, tokai: 450, hokuriku: 450, kansai: 480, chugoku: 490, shikoku: 470, kita_kyushu: 510, minami_kyushu: 510 },
            "100": { hokkaido: 830, kita_tohoku: 710, minami_tohoku: 680, kanto: 540, shinetsu: 540, tokai: 490, hokuriku: 490, kansai: 540, chugoku: 560, shikoku: 510, kita_kyushu: 580, minami_kyushu: 600 },
            "120": { hokkaido: 1680, kita_tohoku: 1350, minami_tohoku: 1250, kanto: 1030, shinetsu: 1030, tokai: 940, hokuriku: 940, kansai: 830, chugoku: 890, shikoku: 740, kita_kyushu: 960, minami_kyushu: 1010 },
            "140": { hokkaido: 1680, kita_tohoku: 1350, minami_tohoku: 1250, kanto: 1030, shinetsu: 1030, tokai: 940, hokuriku: 940, kansai: 830, chugoku: 890, shikoku: 740, kita_kyushu: 960, minami_kyushu: 1010 },
            "160": { hokkaido: 2780, kita_tohoku: 2150, minami_tohoku: 1960, kanto: 1560, shinetsu: 1540, tokai: 1380, hokuriku: 1380, kansai: 1160, chugoku: 1290, shikoku: 1000, kita_kyushu: 1410, minami_kyushu: 1510 }
        }
    },
    yamato: {
        default: {
            "60": { hokkaido: 890, kita_tohoku: 590, minami_tohoku: 590, kanto: 450, shinetsu: 450, hokuriku: 410, chubu: 410, kansai: 360, chugoku: 360, shikoku: 360, kyushu: 410, okinawa: 810 },
            "80": { hokkaido: 930, kita_tohoku: 630, minami_tohoku: 630, kanto: 490, shinetsu: 490, hokuriku: 450, chubu: 450, kansai: 400, chugoku: 400, shikoku: 400, kyushu: 450, okinawa: 1310 },
            "100": { hokkaido: 980, kita_tohoku: 670, minami_tohoku: 670, kanto: 540, shinetsu: 540, hokuriku: 490, chubu: 490, kansai: 450, chugoku: 450, shikoku: 450, kyushu: 490, okinawa: 1810 }
        }
    }
} as const;