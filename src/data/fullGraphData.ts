
export interface GraphNode {
    id: string;
    group: "center" | "category" | "province";
    name: string;
    img?: string;
    desc?: string;
    val?: number; // Size
}

export interface GraphLink {
    source: string;
    target: string;
}

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

export const fullGraphData: GraphData = {
    nodes: [
        // --- Center ---
        { id: "isan_center", group: "center", name: "The Heart of Isan Wisdom", val: 50, desc: "The source of all wisdom." },

        // --- Wisdom Categories (Cyan) ---
        { id: "cat_mudmee", group: "category", name: "Mudmee", val: 30, desc: "The art of tie-dyeing yarn before weaving." },
        { id: "cat_naga", group: "category", name: "Naga Belief", val: 30, desc: "Patterns inspired by the mythical Naga of the Mekong." },
        { id: "cat_natural_dye", group: "category", name: "Natural Dye", val: 30, desc: "Deep colors derived from nature (Indigo, Volcanic Soil, etc)." },
        { id: "cat_praewa", group: "category", name: "Praewa", val: 30, desc: "The Queen of Silks, intricate diamond patterns." },
        { id: "cat_khit", group: "category", name: "Khit", val: 30, desc: "Continuous supplementary weft weaving technique." },

        // --- Provinces (Gold) ---
        // 1. Khon Kaen -> Mudmee
        { id: "pron_khonkaen", group: "province", name: "Khon Kaen", val: 20, desc: "Famous for intricate Mudmee patterns and the World Ikat City.", img: "/provinces/khonkaen.jpg" },
        // 2. Chaiyaphum -> Mudmee
        { id: "pron_chaiyaphum", group: "province", name: "Chaiyaphum", val: 20, desc: "Known for Mudmee and raw silk production.", img: "/provinces/chaiyaphum.jpg" },
        // 3. Nakhon Ratchasima -> Mudmee
        { id: "pron_korat", group: "province", name: "Nakhon Ratchasima", val: 20, desc: "Home of the famous Pak Thong Chai silk.", img: "/provinces/korat.jpg" },
        // 4. Nong Bua Lamphu -> Mudmee
        { id: "pron_nongbua", group: "province", name: "Nong Bua Lamphu", val: 20, desc: "Expert craftsmanship in traditional Mudmee silk.", img: "/provinces/nongbua.jpg" },
        // 5. Maha Sarakham -> Mudmee
        { id: "pron_mahasarakham", group: "province", name: "Maha Sarakham", val: 20, desc: "The educational center with the 'Sroi Dok Mak' pattern.", img: "/provinces/mahasarakham.jpg" },
        // 6. Surin -> Mudmee / Natural Dye (often Elephant silk is Mudmee based, or distinct) - Putting in Mudmee/Natural Dye based on user request to fit 5 categories. Surin is famous for complex Ikat (Mudmee).
        { id: "pron_surin", group: "province", name: "Surin", val: 20, desc: "World-class silk with ancient Khmer influences and complex Hol/Mudmee patterns.", img: "/provinces/surin.jpg" },

        // 7. Kalasin -> Praewa
        { id: "pron_kalasin", group: "province", name: "Kalasin", val: 20, desc: "The birthplace of Phraewa silk, woven for royalty.", img: "/provinces/kalasin.jpg" },

        // 8. Sakon Nakhon -> Natural Dye (Indigo)
        { id: "pron_sakon", group: "province", name: "Sakon Nakhon", val: 20, desc: "Renowned for its natural Indigo dyed fabrics (Krai).", img: "/provinces/sakon.jpg" },
        // 9. Buriram -> Natural Dye (Volcanic)
        { id: "pron_buriram", group: "province", name: "Buriram", val: 20, desc: "Unique 'Phu Akkhani' fabric dyed with volcanic soil.", img: "/provinces/buriram.jpg" },
        // 10. Sisaket -> Natural Dye (Lava) / Embroidery
        { id: "pron_sisaket", group: "province", name: "Sisaket", val: 20, desc: "Using lava soil and 'Saeo' embroidery techniques.", img: "/provinces/sisaket.jpg" },
        // 11. Mukdahan -> Natural Dye / Mudmee
        { id: "pron_mukdahan", group: "province", name: "Mukdahan", val: 20, desc: "Unique textile arts influenced by Indochina cultures.", img: "/provinces/mukdahan.jpg" },
        // 12. Loei -> Natural Dye (Cotton/Climate) 
        { id: "pron_loei", group: "province", name: "Loei", val: 20, desc: "Known for soft cotton and natural dyes suitable for cold climate.", img: "/provinces/loei.jpg" },

        // 13. Nong Khai -> Naga Belief
        { id: "pron_nongkhai", group: "province", name: "Nong Khai", val: 20, desc: "Heavily influenced by the Naga legend of the Mekong.", img: "/provinces/nongkhai.jpg" },
        // 14. Bueng Kan -> Naga Belief
        { id: "pron_buengkan", group: "province", name: "Bueng Kan", val: 20, desc: "Newer province with distinct Mekong-inspired Naga arts.", img: "/provinces/buengkan.jpg" },
        // 15. Nakhon Phanom -> Naga Belief
        { id: "pron_nakhonphanom", group: "province", name: "Nakhon Phanom", val: 20, desc: "Silk inspired by the Mekong river and Naga beliefs.", img: "/provinces/nakhonphanom.jpg" },

        // 16. Udon Thani -> Khit
        { id: "pron_udon", group: "province", name: "Udon Thani", val: 20, desc: "Famous for Khit patterns and red lotus designs.", img: "/provinces/udon.jpg" },
        // 17. Roi Et -> Khit
        { id: "pron_roiet", group: "province", name: "Roi Et", val: 20, desc: "Exquisite silk weavings and traditional patterns.", img: "/provinces/roiet.jpg" },
        // 18. Yasothon -> Khit
        { id: "pron_yasothon", group: "province", name: "Yasothon", val: 20, desc: "Famous for the Malai Rice style weaving.", img: "/provinces/yasothon.jpg" },
        // 19. Amnat Charoen -> Khit
        { id: "pron_amnat", group: "province", name: "Amnat Charoen", val: 20, desc: "Distinctive checkered patterns and fine silk.", img: "/provinces/amnat.jpg" },
        // 20. Ubon Ratchathani -> Khit (Kap Bua usually mixes Khit)
        { id: "pron_ubon", group: "province", name: "Ubon Ratchathani", val: 20, desc: "The 'Kap Bua' pattern, designated as a national heritage.", img: "/provinces/ubon.jpg" },
    ],
    links: [
        // Center to Categories
        { source: "isan_center", target: "cat_mudmee" },
        { source: "isan_center", target: "cat_naga" },
        { source: "isan_center", target: "cat_natural_dye" },
        { source: "isan_center", target: "cat_praewa" },
        { source: "isan_center", target: "cat_khit" },

        // Categories to Provinces

        // Mudmee
        { source: "cat_mudmee", target: "pron_khonkaen" },
        { source: "cat_mudmee", target: "pron_chaiyaphum" },
        { source: "cat_mudmee", target: "pron_korat" },
        { source: "cat_mudmee", target: "pron_nongbua" },
        { source: "cat_mudmee", target: "pron_mahasarakham" },
        { source: "cat_mudmee", target: "pron_surin" }, // Surin fits here too

        // Naga Belief
        { source: "cat_naga", target: "pron_nongkhai" },
        { source: "cat_naga", target: "pron_buengkan" },
        { source: "cat_naga", target: "pron_nakhonphanom" },

        // Natural Dye
        { source: "cat_natural_dye", target: "pron_sakon" },
        { source: "cat_natural_dye", target: "pron_buriram" },
        { source: "cat_natural_dye", target: "pron_sisaket" }, // Lava soil
        { source: "cat_natural_dye", target: "pron_loei" },
        { source: "cat_natural_dye", target: "pron_mukdahan" }, // River/Indigo

        // Praewa
        { source: "cat_praewa", target: "pron_kalasin" },

        // Khit
        { source: "cat_khit", target: "pron_udon" },
        { source: "cat_khit", target: "pron_roiet" },
        { source: "cat_khit", target: "pron_yasothon" },
        { source: "cat_khit", target: "pron_amnat" },
        { source: "cat_khit", target: "pron_ubon" },
    ],
};
