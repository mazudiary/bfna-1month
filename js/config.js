/**
 * Butterfly Never Fly Along - Central Configuration
 * Easy customization for all text, dates, photos, video, and audio.
 * Simply update this file or add files to the /public/ directories!
 */

const STORY_DATA = {
    // Couple Names & Nicknames
    names: {
        husband: "Basharul",
        wife: "Lopa",
        wifeNicknames: ["Premiii", "Pakhii", "My Butterfly"],
        primaryCallout: "Premiii"
    },

    // Important Dates & Slogans
    dates: {
        friendshipStarted: "14 February 2020",
        anniversaryMilestone: "First Month Marriage Anniversary",
        slogan: "BUTTERFLY NEVER FLY ALONG",
        prayer: "Together in this life & reunited in Jannatul Ferdous"
    },

    // Audio & Video Sources
    media: {
        // Drop your romantic instrumental mp3 here (e.g. 'public/audio/romantic-instrumental.mp3')
        // Uses royalty-free soothing romantic piano ambient track by default
        audioSource: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c1c1f5127e.mp3?filename=piano-moment-9835.mp3",
        // Local path fallback: "public/audio/romantic-instrumental.mp3"
        localAudioSource: "public/audio/romantic-instrumental.mp3",
        
        // Drop your Google Flow anniversary film here (e.g. 'public/videos/anniversary.mp4')
        videoSource: "public/videos/anniversary.mp4",
        videoSourceWebm: "public/videos/anniversary.webm",
        videoPoster: "public/images/wedding/wedding-cover.webp"
    },

    // Timeline Events (Section 2)
    timeline: [
        {
            date: "14 February 2020",
            tag: "The Beginning",
            title: "Where Our Story Quietly Began",
            description: "An ordinary February day transformed into something timeless. That first conversation opened a door neither of us knew would lead to our greatest blessing.",
            image: "public/images/first-day/1.webp",
            alt: "First day memory"
        },
        {
            date: "2020 — 2023",
            tag: "Growing Together",
            title: "The Friendship Years",
            description: "Countless late-night laughs, shared triumphs, heart-to-heart talks, and an unspoken comfort that made every heavy day light. We grew up side by side.",
            image: "public/images/friendship/1.webp",
            alt: "Friendship moments"
        },
        {
            date: "A Stronger Bond",
            tag: "More Than Memories",
            title: "Two Souls Finding Their Peace",
            description: "Our friendship steadily blossomed into an unshakeable bond of mutual respect, trust, care, and an unspoken certainty that we belonged together.",
            image: "public/images/special-moments/1.webp",
            alt: "Special journey moments"
        },
        {
            date: "Our Sacred Union",
            tag: "Forever Begins",
            title: "Our Wedding Day",
            description: "With heartfelt prayers and family blessings, our friendship sealed its greatest chapter. We chose each other for this life and for eternity.",
            image: "public/images/wedding/1.webp",
            alt: "Our wedding day"
        },
        {
            date: "One Month of Marriage",
            tag: "My Butterfly, My Forever",
            title: "Our First 30 Days as One",
            description: "A month filled with quiet mornings, warm smiles, caring gestures, and the tender reassurance that home is whenever I look into your eyes.",
            image: "public/images/anniversary/1.webp",
            alt: "First month celebration"
        }
    ],

    // Memory Gallery (Section 3)
    galleryCategories: [
        { id: "all", label: "All Memories" },
        { id: "first-day", label: "Our First Day" },
        { id: "friendship", label: "Friendship Memories" },
        { id: "special", label: "Special Moments" },
        { id: "wedding", label: "Wedding Day" },
        { id: "first-month", label: "Our First Month" }
    ],

    galleryItems: [
        {
            id: 1,
            category: "first-day",
            title: "14 February 2020",
            caption: "The sparks of an eternal friendship",
            image: "public/images/first-day/1.webp",
            aspect: "horizontal"
        },
        {
            id: 2,
            category: "friendship",
            title: "Cherished Conversations",
            caption: "When hours felt like minutes just talking to you",
            image: "public/images/friendship/1.webp",
            aspect: "vertical"
        },
        {
            id: 3,
            category: "friendship",
            title: "Shared Laughs & Little Secrets",
            caption: "Growing through every season together",
            image: "public/images/friendship/2.webp",
            aspect: "vertical"
        },
        {
            id: 4,
            category: "special",
            title: "A Gentle Realization",
            caption: "Realizing you were the one I pray for in Tahajjud",
            image: "public/images/special-moments/1.webp",
            aspect: "vertical"
        },
        {
            id: 5,
            category: "special",
            title: "Two Souls, One Heart",
            caption: "An unbreakable bond of care, respect and mutual peace",
            image: "public/images/special-moments/2.webp",
            aspect: "vertical"
        },
        {
            id: 6,
            category: "wedding",
            title: "The Holy Vows",
            caption: "From best friends to soulmates under Allah's grace",
            image: "public/images/wedding/1.webp",
            aspect: "vertical"
        },
        {
            id: 7,
            category: "wedding",
            title: "The Golden Moment",
            caption: "A pure promise: In sickness, health, joy, and peace",
            image: "public/images/wedding/2.webp",
            aspect: "vertical"
        },
        {
            id: 8,
            category: "first-month",
            title: "One Month of Bliss",
            caption: "30 days of making our little home feel like paradise",
            image: "public/images/anniversary/1.webp",
            aspect: "horizontal"
        },
        {
            id: 9,
            category: "first-month",
            title: "My Butterfly's Smile",
            caption: "Every day with you is my favorite day",
            image: "public/images/anniversary/2.webp",
            aspect: "horizontal"
        }
    ],

    // Wedding Showcase Photos (Section 4)
    weddingShowcase: [
        {
            image: "public/images/wedding/1.webp",
            title: "The Sacred Vows",
            caption: "Two souls united under Allah's guidance and mercy."
        },
        {
            image: "public/images/wedding/2.webp",
            title: "Radiance & Pure Joy",
            caption: "The brightest smile that became my forever home."
        },
        {
            image: "public/images/wedding/wedding-cover.webp",
            title: "From Friends to Life Partners",
            caption: "I would choose this journey with you in every lifetime."
        }
    ],

    // Love Letter (Section 6)
    letter: {
        salutation: "My dearest Premiii,",
        paragraphs: [
            "Do you remember 14 February 2020? That was the day our friendship quietly began. Looking back at every shared laugh, every late-night conversation, and every unspoken prayer, I never imagined that the best friend who became my favorite part of life would one day become my wife. Today marks our first month of marriage — thirty days that feel like both a dream and the most peaceful home my heart has ever known.",
            "I want to tell you something from the deepest part of my heart: I am not perfect, nor do I ever desire to be. Because if everything were already flawless, that sweet charm of cherishing and falling in love would lose its wonder. There is no real beauty in a love that has nothing left to strive for.",
            "Instead, I want to be optimized — specially tailored and uniquely optimized just for you. A journey where I know I will make mistakes, stumble sometimes, or need understanding; but with your gentle guidance, your suggestions, and your wisdom, I want to grow from better to even better, constantly evolving for you.",
            "You will always be my Premiii, my Pakhii, and my Butterfly. Even as the years gently roll by and our hair turns silver, I never want us to forget the two friends who started this story. In every ordinary morning, through every quiet triumph, and in every challenge life brings, I will keep choosing you, loving you, and standing faithfully by your side.",
            "My deepest wish is not bound only to this world. I want to walk beside you until my very last breath in this life — and then, by Allah’s mercy, enter Jannatul Ferdous hand in hand with you, blessed to hear your sweet Salam welcoming me at the gates of eternity.",
            "Happy First Month Anniversary, My Butterfly. Butterfly Never Fly Along."
        ],
        signature: "With all my love and devotion,",
        sender: "Your forever friend & husband, Basharul ❤️"
    }
};

window.STORY_DATA = STORY_DATA;
