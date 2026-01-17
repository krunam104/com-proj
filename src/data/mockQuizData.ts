import { QuizData } from '@/types/gameTypes';

export const fullQuizData: QuizData[] = [
    // 📍 CENTRAL ISAN
    {
        id: 'kalasin',
        region: 'Central Isan',
        nameEn: 'Kalasin',
        nameTh: 'กาฬสินธุ์',
        question: 'Kalasin is known as the "Queen of Silk." What is special about their famous "Praewa Silk" technique?',
        options: [
            { id: 'A', text: 'It uses mud for dyeing.' },
            { id: 'B', text: 'It looks like intricate embroidery (Chok).' },
            { id: 'C', text: 'It is woven with cotton only.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Kalasin',
            description: 'Her Majesty recognized the complex beauty of the Phu Tai people\'s weaving. She encouraged them to preserve this difficult technique and famously wore Praewa silk herself to show its value to the world.',
            imageUrl: '/images/insights/kalasin-placeholder.jpg'
        }
    },
    {
        id: 'khon_kaen',
        region: 'Central Isan',
        nameEn: 'Khon Kaen',
        nameTh: 'ขอนแก่น',
        question: 'Khon Kaen is the "Capital of Mudmee." What are the two main symbols in their signature pattern, "Kaen Kaen Koon"?',
        options: [
            { id: 'A', text: 'A musical instrument (Kaen) and a flower (Koon).' },
            { id: 'B', text: 'An elephant and a horse.' },
            { id: 'C', text: 'A river and a mountain.' }
        ],
        correctOptionId: 'A',
        royalInsight: {
            title: 'Royal Insight: Khon Kaen',
            description: 'Her Majesty aimed to create supplementary income for farmers after the harvest season. Supporting Mudmee weaving centers in Khon Kaen gave villagers sustainable jobs near their homes.',
            imageUrl: '/images/insights/khon_kaen-placeholder.jpg'
        }
    },
    {
        id: 'maha_sarakham',
        region: 'Central Isan',
        nameEn: 'Maha Sarakham',
        nameTh: 'มหาสารคาม',
        question: 'This province is called the "Navel of Isan" (Center of Isan). Their famous pattern, "Soi Dok Mak," is known for being:',
        options: [
            { id: 'A', text: 'Very big and simple.' },
            { id: 'B', text: 'Very detailed and requires high skill.' },
            { id: 'C', text: 'Very colorful using neon colors.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Maha Sarakham',
            description: 'Her Majesty established the SUPPORT Foundation to value skilled craftsmanship. She encouraged master weavers (Khru Chang) in Maha Sarakham to teach these highly detailed techniques to the younger generation.',
            imageUrl: '/images/insights/maha_sarakham-placeholder.jpg'
        }
    },
    {
        id: 'roi_et',
        region: 'Central Isan',
        nameEn: 'Roi Et',
        nameTh: 'ร้อยเอ็ด',
        question: 'The signature "Saket Pattern" of Roi Et is unique because:',
        options: [
            { id: 'A', text: 'It is always only one color.' },
            { id: 'B', text: 'It combines 5 different sub-patterns in one piece.' },
            { id: 'C', text: 'It is made from imported silk threads.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Roi Et',
            description: 'Queen Sirikit admired the creativity of local weavers. She encouraged combining traditional patterns into new, unique designs, showing that Thai wisdom can adapt and evolve beautifully.',
            imageUrl: '/images/insights/roi_et-placeholder.jpg'
        }
    },
    {
        id: 'chaiyaphum',
        region: 'Central Isan',
        nameEn: 'Chaiyaphum',
        nameTh: 'ชัยภูมิ',
        question: 'Silk from Ban Khwao district in Chaiyaphum is famous for which quality?',
        options: [
            { id: 'A', text: 'Being very stiff and hard.' },
            { id: 'B', text: 'Being soft and flowing beautifully (draping well).' },
            { id: 'C', text: 'Being waterproof.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Chaiyaphum',
            description: 'The Queen emphasized quality. She knew that for Thai silk to be accepted internationally, it needed not just beautiful patterns, but also high-quality texture that is comfortable to wear.',
            imageUrl: '/images/insights/chaiyaphum-placeholder.jpg'
        }
    },

    // 📍 LOWER ISAN
    {
        id: 'nakhon_ratchasima',
        region: 'Lower Isan',
        nameEn: 'Nakhon Ratchasima (Korat)',
        nameTh: 'นครราชสีมา',
        question: 'What is the special technique called "Hang Karok" used in Korat silk?',
        options: [
            { id: 'A', text: 'Painting the fabric after weaving.' },
            { id: 'B', text: 'Twisted two-colored threads creating a shimmering effect.' },
            { id: 'C', text: 'Using gold threads only.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Nakhon Ratchasima (Korat)',
            description: 'Her Majesty saw value in every local technique. She promoted unique textures like "Hang Karok" because they give Thai silk a special character that machines cannot copy.',
            imageUrl: '/images/insights/nakhon_ratchasima-placeholder.jpg'
        }
    },
    {
        id: 'buriram',
        region: 'Lower Isan',
        nameEn: 'Buriram',
        nameTh: 'บุรีรัมย์',
        question: 'Buriram is the "Land of Volcanoes." What unique local material do they use to dye their "Phu Akkani" silk?',
        options: [
            { id: 'A', text: 'Volcanic soil.' },
            { id: 'B', text: 'River sand.' },
            { id: 'C', text: 'Chemical dyes.' }
        ],
        correctOptionId: 'A',
        royalInsight: {
            title: 'Royal Insight: Buriram',
            description: 'Her Majesty encouraged using natural resources found in the local area for dyeing. This not only reduces costs for farmers but also creates a unique identity tied to the land.',
            imageUrl: '/images/insights/buriram-placeholder.jpg'
        }
    },
    {
        id: 'surin',
        region: 'Lower Isan',
        nameEn: 'Surin',
        nameTh: 'สุรินทร์',
        question: 'Surin silk is famous for high-class techniques influenced by ancient Khmer culture. Which famous village weaves silk with gold threads for the Royal Court?',
        options: [
            { id: 'A', text: 'Ban Na Kha.' },
            { id: 'B', text: 'Ban Tha Sawang.' },
            { id: 'C', text: 'Ban Khwao.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Surin',
            description: 'Queen Sirikit selected the finest weavers, like those in Surin, to create costumes for royal ceremonies. This elevated Thai silk from everyday wear to a symbol of national high art.',
            imageUrl: '/images/insights/surin-placeholder.jpg'
        }
    },
    {
        id: 'si_sa_ket',
        region: 'Lower Isan',
        nameEn: 'Si Sa Ket',
        nameTh: 'ศรีสะเกษ',
        question: 'Si Sa Ket is famous for "Pha Saew" and silk dyed with "Makleua" (Ebony fruit). What color does the Ebony fruit produce?',
        options: [
            { id: 'A', text: 'Bright Red.' },
            { id: 'B', text: 'Deep Black.' },
            { id: 'C', text: 'Golden Yellow.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Si Sa Ket',
            description: 'Her Majesty promoted the return to natural dyes. She knew that natural colors, like the deep black from Makleua, have a classic beauty and are safer for both weavers and the environment.',
            imageUrl: '/images/insights/si_sa_ket-placeholder.jpg'
        }
    },
    {
        id: 'ubon_ratchathani',
        region: 'Lower Isan',
        nameEn: 'Ubon Ratchathani',
        nameTh: 'อุบลราชธานี',
        question: 'The "Kab Bua" (Lotus Petal) pattern is the signature of Ubon Ratchathani. Why is it special?',
        options: [
            { id: 'A', text: 'It is the oldest pattern in Thailand.' },
            { id: 'B', text: 'It combines 4 different weaving techniques in one piece.' },
            { id: 'C', text: 'It is only used for monks\' robes.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Ubon Ratchathani',
            description: 'The Queen encouraged innovation based on tradition. The "Kab Bua" pattern is a great example of combining various ancient techniques to create something new and magnificent for the modern era.',
            imageUrl: '/images/insights/ubon_ratchathani-placeholder.jpg'
        }
    },
    {
        id: 'yasothon',
        region: 'Lower Isan',
        nameEn: 'Yasothon',
        nameTh: 'ยโสธร',
        question: 'Yasothon\'s signature pattern is "Look Wai." What nature item inspired this pattern?',
        options: [
            { id: 'A', text: 'Rattan fruit (a type of forest fruit).' },
            { id: 'B', text: 'Jasmine flower.' },
            { id: 'C', text: 'Rice grains.' }
        ],
        correctOptionId: 'A',
        royalInsight: {
            title: 'Royal Insight: Yasothon',
            description: 'Her Majesty always taught weavers to look at nature around them for inspiration. She believed that patterns derived from local nature reflect the true soul of the community.',
            imageUrl: '/images/insights/yasothon-placeholder.jpg'
        }
    },
    {
        id: 'amnat_charoen',
        region: 'Lower Isan',
        nameEn: 'Amnat Charoen',
        nameTh: 'อำนาจเจริญ',
        question: 'Amnat Charoen focuses on preserving ancient patterns. What is their signature province pattern?',
        options: [
            { id: 'A', text: 'The Kho Khing pattern.' },
            { id: 'B', text: 'The Elephant pattern.' },
            { id: 'C', text: 'The Naga pattern.' }
        ],
        correctOptionId: 'A',
        royalInsight: {
            title: 'Royal Insight: Amnat Charoen',
            description: 'The Queen feared that ancient patterns would be lost to time. She ordered the collection and documentation of old patterns like "Kho Khing" so future generations could learn from them.',
            imageUrl: '/images/insights/amnat_charoen-placeholder.jpg'
        }
    },

    // 📍 UPPER ISAN
    {
        id: 'udon_thani',
        region: 'Upper Isan',
        nameEn: 'Udon Thani',
        nameTh: 'อุดรธานี',
        question: 'Udon Thani is famous for the "Khit" technique. What does Khit silk look like?',
        options: [
            { id: 'A', text: 'The pattern is smooth and flat.' },
            { id: 'B', text: 'The pattern is raised and embossed (looks 3D).' },
            { id: 'C', text: 'The fabric is transparent.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Udon Thani',
            description: 'Her Majesty saw the potential in various weaving styles. She promoted "Khit" weaving because its raised texture creates a unique, luxurious look suitable for decoration and formal wear.',
            imageUrl: '/images/insights/udon_thani-placeholder.jpg'
        }
    },
    {
        id: 'nong_khai',
        region: 'Upper Isan',
        nameEn: 'Nong Khai',
        nameTh: 'หนองคาย',
        question: 'Located next to the Mekong River, what mythical creature is the most common inspiration for Nong Khai\'s silk patterns?',
        options: [
            { id: 'A', text: 'The Garuda.' },
            { id: 'B', text: 'The Naga (Great Serpent).' },
            { id: 'C', text: 'The Tiger.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Nong Khai',
            description: 'Queen Sirikit respected local beliefs and culture. She encouraged weavers to express their faith and stories, like the Naga legend of the Mekong, through their beautiful woven art.',
            imageUrl: '/images/insights/nong_khai-placeholder.jpg'
        }
    },
    {
        id: 'sakon_nakhon',
        region: 'Upper Isan',
        nameEn: 'Sakon Nakhon',
        nameTh: 'สกลนคร',
        question: 'Sakon Nakhon is known as the "King of Indigo." Besides the beautiful blue color, what is a special quality of natural indigo dye?',
        options: [
            { id: 'A', text: 'It glows in the dark.' },
            { id: 'B', text: 'It has a pleasant scent and protects against UV rays.' },
            { id: 'C', text: 'It makes the fabric waterproof.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Sakon Nakhon',
            description: 'Her Majesty championed natural indigo dyeing. She recognized its wisdom—not only is it beautiful and chemical-free, but it also offers practical benefits like UV protection and a natural aroma.',
            imageUrl: '/images/insights/sakon_nakhon-placeholder.jpg'
        }
    },
    {
        id: 'nakhon_phanom',
        region: 'Upper Isan',
        nameEn: 'Nakhon Phanom',
        nameTh: 'นครพนม',
        question: '"Pha Muk" is a rare, ancient silk of Nakhon Phanom. What does its weaving technique resemble?',
        options: [
            { id: 'A', text: 'Embedding pearl jewelry into the fabric.' },
            { id: 'B', text: 'Painting with watercolor.' },
            { id: 'C', text: 'Tying knots like a fishing net.' }
        ],
        correctOptionId: 'A',
        royalInsight: {
            title: 'Royal Insight: Nakhon Phanom',
            description: 'Some ancient techniques like "Pha Muk" were almost lost. The Queen\'s SUPPORT Foundation played a crucial role in finding the few remaining masters and reviving this exquisite technique.',
            imageUrl: '/images/insights/nakhon_phanom-placeholder.jpg'
        }
    },
    {
        id: 'loei',
        region: 'Upper Isan',
        nameEn: 'Loei',
        nameTh: 'เลย',
        question: 'Loei is a cool, mountainous province. Their silk patterns are often inspired by which famous local festival?',
        options: [
            { id: 'A', text: 'The Rocket Festival.' },
            { id: 'B', text: 'The Phi Ta Khon (Ghost Mask) Festival.' },
            { id: 'C', text: 'The Candle Festival.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Loei',
            description: 'Her Majesty believed that silk should reflect local identity. Using unique cultural elements like the "Phi Ta Khon" festival in patterns makes the silk tell the story of its people.',
            imageUrl: '/images/insights/loei-placeholder.jpg'
        }
    },
    {
        id: 'nong_bua_lam_phu',
        region: 'Upper Isan',
        nameEn: 'Nong Bua Lam Phu',
        nameTh: 'หนองบัวลำภู',
        question: 'Nong Bua Lam Phu is famous for a complex technique called "Khit Salap Mee." What does this mean?',
        options: [
            { id: 'A', text: 'Using only cotton threads.' },
            { id: 'B', text: 'Mixing the "Khit" (raised) technique with "Mudmee" (ikat) in one piece.' },
            { id: 'C', text: 'Dyeing the fabric after weaving.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Nong Bua Lam Phu',
            description: 'The Queen encouraged weavers to challenge themselves. Combining complex techniques like Khit and Mudmee requires great skill, raising the value of Thai silk as a piece of fine art.',
            imageUrl: '/images/insights/nong_bua_lam_phu-placeholder.jpg'
        }
    },
    {
        id: 'mukdahan',
        region: 'Upper Isan',
        nameEn: 'Mukdahan',
        nameTh: 'มุกดาหาร',
        question: 'The signature pattern of Mukdahan is "Kaew Mukda." How many lucky sub-patterns are combined in this single pattern?',
        options: [
            { id: 'A', text: '3 patterns.' },
            { id: 'B', text: '5 patterns.' },
            { id: 'C', text: '9 patterns.' }
        ],
        correctOptionId: 'B',
        royalInsight: {
            title: 'Royal Insight: Mukdahan',
            description: 'Her Majesty appreciated patterns that carry good meaning. The combination of 5 auspicious patterns in "Kaew Mukda" makes the silk not just beautiful cloth, but a blessing for the wearer.',
            imageUrl: '/images/insights/mukdahan-placeholder.jpg'
        }
    },
    {
        id: 'bueng_kan',
        region: 'Upper Isan',
        nameEn: 'Bueng Kan',
        nameTh: 'บึงกาฬ',
        question: 'Bueng Kan is the newest province. They use natural colors from their rich environment. What is the source of their special "Dara Nakee" color?',
        options: [
            { id: 'A', text: 'Mud from the Bueng Khong Long lake.' },
            { id: 'B', text: 'Flowers from the mountain.' },
            { id: 'C', text: 'Roots of an old tree.' }
        ],
        correctOptionId: 'A',
        royalInsight: {
            title: 'Royal Insight: Bueng Kan',
            description: 'Even in a new province, Her Majesty\'s legacy of using local natural resources continues. Utilizing mud from the local lake creates a unique identity and keeps the environment safe.',
            imageUrl: '/images/insights/bueng_kan-placeholder.jpg'
        }
    }
];
