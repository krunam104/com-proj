
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
        videoUrl: '/video/5.Kalasin.mp4',
        description: "Queen of Silk, known for its intricate brocade patterns."
    },
    {
        id: 'khon-kaen',
        name: 'Khon Kaen (Mudmee)',
        position: [9.5, 0, 3.1],
        textureUrl: '/images/silk/khonkaen1.png',
        infographicUrl: '/images/infographic/6.Khaen Kaen.png',
        videoUrl: '/video/6.Khon Kaen.mp4',
        description: "Famous for tie-dye Mudmee techniques passed down through generations."
    },
    {
        id: 'amnat-charoen',
        name: 'Amnat Charoen',
        position: [8.1, 0, 5.9],
        textureUrl: '/images/silk/Amnat Charoen1.png',
        infographicUrl: '/images/infographic/1.Amnat Charoen.png',
        videoUrl: '/video/1.Amnat Charoen.mp4'
    },
    {
        id: 'chaiyaphum',
        name: 'Chaiyaphum',
        position: [5.9, 0, 8.1],
        textureUrl: '/images/silk/Chaiyaphum1.png',
        infographicUrl: '/images/infographic/4.Chaiyaphum.png',
        videoUrl: '/video/4.Chaiyaphum.mp4'
    },
    {
        id: 'nakhon-phanom',
        name: 'Nakhon Phanom',
        position: [3.1, 0, 9.5],
        textureUrl: '/images/silk/Nakhon Phanom1.png',
        infographicUrl: '/images/infographic/10.Nakhon Phanom.png',
        videoUrl: '/video/10.Nakhon Phanom.mp4'
    },
    {
        id: 'korat',
        name: 'Nakhon Ratchasima',
        position: [0, 0, 10],
        textureUrl: '/images/silk/korat1.png',
        infographicUrl: '/images/infographic/11.Nakhon Ratchasima.png',
        videoUrl: '/video/11.Nakhon Ratchasima.mp4'
    },
    {
        id: 'bueng-kan',
        name: 'Bueng Kan',
        position: [-3.1, 0, 9.5],
        textureUrl: '/images/silk/Bueng Kan1.png',
        infographicUrl: '/images/infographic/2.Bueng Kan.png',
        videoUrl: '/video/2.Bueng Kan.mp4'
    },
    {
        id: 'maha-sarakham',
        name: 'Maha Sarakham',
        position: [-5.9, 0, 8.1],
        textureUrl: '/images/silk/MahaSarakham1.png',
        infographicUrl: '/images/infographic/8.Maha Sarakham.png',
        videoUrl: '/video/8.Maha Sarakham.mp4'
    },
    {
        id: 'yasothon',
        name: 'Yasothon',
        position: [-8.1, 0, 5.9],
        textureUrl: '/images/silk/Yasothon1.png',
        infographicUrl: '/images/infographic/20.Yasothon.png',
        videoUrl: '/video/20.Yasothon.mp4'
    },
    {
        id: 'loei',
        name: 'Loei',
        position: [-9.5, 0, 3.1],
        textureUrl: '/images/silk/Loei1.png',
        infographicUrl: '/images/infographic/7.Loei.png',
        videoUrl: '/video/7.Loei.mp4'
    },
    // --- Approximated Data for rest to complete the circle ---
    {
        id: 'mukdahan',
        name: 'Mukdahan',
        position: [-10, 0, 0],
        textureUrl: '/images/silk/Mukdahan1.png',
        infographicUrl: '/images/infographic/9.Mukdahan.png',
        videoUrl: '/video/9.Mukdahan.mp4'
    },
    {
        id: 'roi-et',
        name: 'Roi Et',
        position: [-9.5, 0, -3.1],
        textureUrl: '/images/silk/Roi Et1.png',
        infographicUrl: '/images/infographic/14.Roi Et.png',
        videoUrl: '/video/14.Roi Et.mp4'
    },
    {
        id: 'sakon-nakhon',
        name: 'Sakon Nakhon',
        position: [-8.1, 0, -5.9],
        textureUrl: '/images/silk/Sakon Nakhon1.png',
        infographicUrl: '/images/infographic/15.Sakon Nakhon.png',
        videoUrl: '/video/15.Sakon Nakhon.mp4'
    },
    {
        id: 'surin',
        name: 'Surin',
        position: [-5.9, 0, -8.1],
        textureUrl: '/images/silk/Surin1.png',
        infographicUrl: '/images/infographic/17.Surin.png',
        videoUrl: '/video/17.Surin.mp4'
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
        videoUrl: '/video/19.Udon Thani.mp4'
    },
    {
        id: 'nong-bua-lam-phu',
        name: 'Nong Bua Lam Phu',
        position: [3.1, 0, -9.5],
        textureUrl: '/images/silk/Nong Bua Lam Phu1.png',
        infographicUrl: '/images/infographic/12.Nong Bua Lamphu.png',
        videoUrl: '/video/12.Nong Bua Lamphu.mp4'
    },
    {
        id: 'nong-khai',
        name: 'Nong Khai',
        position: [5.9, 0, -8.1],
        textureUrl: '/images/silk/Nong Khai1.png',
        infographicUrl: '/images/infographic/13.Nong Khai.png',
        videoUrl: '/video/13.Nong Khai.mp4'
    },
    {
        id: 'buriram',
        name: 'Buriram',
        position: [8.1, 0, -5.9],
        textureUrl: '/images/silk/burirum1.png',
        infographicUrl: '/images/infographic/3.Buriram.png',
        videoUrl: '/video/3.Buriram.mp4'
    },
    {
        id: 'sisaket',
        name: 'Sisaket',
        position: [9.5, 0, -3.1],
        textureUrl: '/images/silk/sisaket1.png',
        infographicUrl: '/images/infographic/16.Si Sa Ket.png',
        videoUrl: '/video/16.Si Sa Ket.mp4'
    }
];
