
export interface SilkItem {
    id: string;
    name: string;
    position: [number, number, number];
    textureUrl: string;
    infographicUrl: string;
    videoUrl: string;
    description?: string;
}

export const MUSEUM_DATA: SilkItem[] = [
    {
        id: 'kalasin',
        name: 'Kalasin (Praewa Silk)',
        position: [10, 0, 0],
        textureUrl: '/images/silk/Kalasin1.png',
        infographicUrl: '/images/infographic/5.Kalasin.png',
        videoUrl: 'https://youtu.be/Slkvhcom9Lc?si=QQXbUZhtozcPa3H2',
        description: "Queen of Silk, known for its intricate brocade patterns."
    },
    {
        id: 'khon-kaen',
        name: 'Khon Kaen (Mudmee)',
        position: [9.5, 0, 3.1],
        textureUrl: '/images/silk/khonkaen1.png',
        infographicUrl: '/images/infographic/6.Khaen Kaen.png',
        videoUrl: 'https://youtu.be/6kMoARK_PUw?si=8yNBC-_BAndN-Cgu',
        description: "Famous for tie-dye Mudmee techniques passed down through generations."
    },
    {
        id: 'amnat-charoen',
        name: 'Amnat Charoen',
        position: [8.1, 0, 5.9],
        textureUrl: '/images/silk/Amnat Charoen1.png',
        infographicUrl: '/images/infographic/1.Amnat Charoen.png',
        videoUrl: 'https://youtu.be/wA3agOaKxjY?si=8Qe5XvamFB2Co4KH'
    },
    {
        id: 'chaiyaphum',
        name: 'Chaiyaphum',
        position: [5.9, 0, 8.1],
        textureUrl: '/images/silk/Chaiyaphum1.png',
        infographicUrl: '/images/infographic/4.Chaiyaphum.png',
        videoUrl: 'https://youtu.be/sKyqAN2xD3U?si=UMdUVHAzMh4myn_Y'
    },
    {
        id: 'nakhon-phanom',
        name: 'Nakhon Phanom',
        position: [3.1, 0, 9.5],
        textureUrl: '/images/silk/Nakhon Phanom1.png',
        infographicUrl: '/images/infographic/10.Nakhon Phanom.png',
        videoUrl: 'https://youtu.be/4fB-2cvRzd0?si=3gcxZeiyqrgFlC6l'
    },
    {
        id: 'korat',
        name: 'Nakhon Ratchasima',
        position: [0, 0, 10],
        textureUrl: '/images/silk/korat1.png',
        infographicUrl: '/images/infographic/11.Nakhon Ratchasima.png',
        videoUrl: 'https://youtu.be/U0-ZK9QnU20?si=JZvtlrZLuG4_7ZQd'
    },
    {
        id: 'bueng-kan',
        name: 'Bueng Kan',
        position: [-3.1, 0, 9.5],
        textureUrl: '/images/silk/Bueng Kan1.png',
        infographicUrl: '/images/infographic/2.Bueng Kan.png',
        videoUrl: 'https://youtu.be/JEWjm3_bL10?si=I_702YbBphzwe8X_'
    },
    {
        id: 'maha-sarakham',
        name: 'Maha Sarakham',
        position: [-5.9, 0, 8.1],
        textureUrl: '/images/silk/MahaSarakham1.png',
        infographicUrl: '/images/infographic/8.Maha Sarakham.png',
        videoUrl: 'https://youtu.be/0w25my4Irt8?si=9RP1r9wJH23wdUBg'
    },
    {
        id: 'yasothon',
        name: 'Yasothon',
        position: [-8.1, 0, 5.9],
        textureUrl: '/images/silk/Yasothon1.png',
        infographicUrl: '/images/infographic/20.Yasothon.png',
        videoUrl: 'https://youtu.be/v_8fa0AQ8VU?si=cXezKj7F4zwkQnnM'
    },
    {
        id: 'loei',
        name: 'Loei',
        position: [-9.5, 0, 3.1],
        textureUrl: '/images/silk/Loei1.png',
        infographicUrl: '/images/infographic/7.Loei.png',
        videoUrl: 'https://youtu.be/6l8T8eKS0jk?si=99L8hhAf4gXErotK'
    },
    // --- Approximated Data for rest to complete the circle ---
    {
        id: 'mukdahan',
        name: 'Mukdahan',
        position: [-10, 0, 0],
        textureUrl: '/images/silk/Mukdahan1.png',
        infographicUrl: '/images/infographic/9.Mukdahan.png',
        videoUrl: 'https://youtu.be/4rDvVr6zREM?si=fdkvAhClOX-F71gO'
    },
    {
        id: 'roi-et',
        name: 'Roi Et',
        position: [-9.5, 0, -3.1],
        textureUrl: '/images/silk/Roi Et1.png',
        infographicUrl: '/images/infographic/14.Roi Et.png',
        videoUrl: 'https://youtu.be/_7p6aQrusn8?si=0Smnh5LzxeM-_DEH'
    },
    {
        id: 'sakon-nakhon',
        name: 'Sakon Nakhon',
        position: [-8.1, 0, -5.9],
        textureUrl: '/images/silk/Sakon Nakhon1.png',
        infographicUrl: '/images/infographic/15.Sakon Nakhon.png',
        videoUrl: 'https://youtu.be/aRKHwwgEeFM?si=jlvA2EhOoSIhWsNo'
    },
    {
        id: 'surin',
        name: 'Surin',
        position: [-5.9, 0, -8.1],
        textureUrl: '/images/silk/Surin1.png',
        infographicUrl: '/images/infographic/17.Surin.png',
        videoUrl: 'https://youtu.be/4lQ-8PKRmpg?si=kiSAZG8XM2ZnjZaC'
    },
    {
        id: 'ubon',
        name: 'Ubon Ratchathani',
        position: [-3.1, 0, -9.5],
        textureUrl: '/images/silk/Ubon1.png',
        infographicUrl: '/images/infographic/18.Ubon Ratchathani.png',
        videoUrl: '/video/18.Ubon Ratchathani.mp4'
    },
    {
        id: 'udon-thani',
        name: 'Udon Thani',
        position: [0, 0, -10],
        textureUrl: '/images/silk/Udon Thani1.png',
        infographicUrl: '/images/infographic/19.Udon Thani.png',
        videoUrl: 'https://youtu.be/qX9FXhbtNs8?si=j6X1-la9BdUdQqg-'
    },
    {
        id: 'nong-bua-lam-phu',
        name: 'Nong Bua Lam Phu',
        position: [3.1, 0, -9.5],
        textureUrl: '/images/silk/Nong Bua Lam Phu1.png',
        infographicUrl: '/images/infographic/12.Nong Bua Lamphu.png',
        videoUrl: 'https://youtu.be/TIR4i6jP7XA?si=juCdqnUXLo9w2E1v'
    },
    {
        id: 'nong-khai',
        name: 'Nong Khai',
        position: [5.9, 0, -8.1],
        textureUrl: '/images/silk/Nong Khai1.png',
        infographicUrl: '/images/infographic/13.Nong Khai.png',
        videoUrl: 'https://youtu.be/LLaHWm2vsPY?si=wSGpCWWdaPFwB9Xo'
    },
    {
        id: 'buriram',
        name: 'Buriram',
        position: [8.1, 0, -5.9],
        textureUrl: '/images/silk/burirum1.png',
        infographicUrl: '/images/infographic/3.Buriram.png',
        videoUrl: 'https://youtu.be/lZXzWyWtS24?si=SMyKcmaXqApSBMB7'
    },
    {
        id: 'sisaket',
        name: 'Sisaket',
        position: [9.5, 0, -3.1],
        textureUrl: '/images/silk/sisaket1.png',
        infographicUrl: '/images/infographic/16.Si Sa Ket.png',
        videoUrl: 'https://youtu.be/2ZrQJbVFK7c?si=49c6iGeWdU36sG9m'
    }
];
