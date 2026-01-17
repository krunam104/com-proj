export const graphData = {
    nodes: [
        // Group 1: Core
        { id: "Isan Wisdom", group: 1, val: 20, label: "Isan Wisdom" },

        // Group 2: Categories
        { id: "Mudmee", group: 2, val: 10, label: "Mudmee (Ikat)" },
        { id: "Naga Belief", group: 2, val: 10, label: "Naga Belief" },
        { id: "Natural Dye", group: 2, val: 10, label: "Natural Dye" },
        { id: "Praewa", group: 2, val: 10, label: "Praewa Silk" },
        { id: "Khit", group: 2, val: 10, label: "Khit Pattern" },

        // Group 3: Provinces
        // Connected to Mudmee
        { id: "Khon Kaen", group: 3, val: 5, label: "Khon Kaen" },
        { id: "Chaiyaphum", group: 3, val: 5, label: "Chaiyaphum" },
        { id: "Maha Sarakham", group: 3, val: 5, label: "Maha Sarakham" },

        // Connected to Naga Belief
        { id: "Nong Khai", group: 3, val: 5, label: "Nong Khai" },
        { id: "Bueng Kan", group: 3, val: 5, label: "Bueng Kan" },
        { id: "Mukdahan", group: 3, val: 5, label: "Mukdahan" },

        // Connected to Natural Dye
        { id: "Sakon Nakhon", group: 3, val: 5, label: "Sakon Nakhon" },
        { id: "Buriram", group: 3, val: 5, label: "Buriram" },
        { id: "Si Sa Ket", group: 3, val: 5, label: "Si Sa Ket" },

        // Extras for other categories (filling the map slightly)
        { id: "Kalasin", group: 3, val: 5, label: "Kalasin" }, // Home of Praewa
        { id: "Yasothon", group: 3, val: 5, label: "Yasothon" }, // Famous for Khit
    ],
    links: [
        // Core to Categories
        { source: "Isan Wisdom", target: "Mudmee" },
        { source: "Isan Wisdom", target: "Naga Belief" },
        { source: "Isan Wisdom", target: "Natural Dye" },
        { source: "Isan Wisdom", target: "Praewa" },
        { source: "Isan Wisdom", target: "Khit" },

        // Mudmee Connections
        { source: "Mudmee", target: "Khon Kaen" },
        { source: "Mudmee", target: "Chaiyaphum" },
        { source: "Mudmee", target: "Maha Sarakham" },

        // Naga Belief Connections
        { source: "Naga Belief", target: "Nong Khai" },
        { source: "Naga Belief", target: "Bueng Kan" },
        { source: "Naga Belief", target: "Mukdahan" },

        // Natural Dye Connections
        { source: "Natural Dye", target: "Sakon Nakhon" },
        { source: "Natural Dye", target: "Buriram" },
        { source: "Natural Dye", target: "Si Sa Ket" },

        // Praewa Connection
        { source: "Praewa", target: "Kalasin" },

        // Khit Connection
        { source: "Khit", target: "Yasothon" },
    ]
};
