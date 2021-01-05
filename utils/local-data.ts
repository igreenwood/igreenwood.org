import { ProjectData, ProfileData } from '../interfaces'

export const projectData: ProjectData = {
    projects: [
        { id: 1, name: "portfolio", date: "202101", title: "igreenwood.com", description: "portfolio of Issei Aoki.", genre: "Website", part: "Frontend/Backend coding, Design, and all", coverImageUrl: "/images/cover4.jpg"},
        { id: 2, name: "techbooster-tbf10", date: "202012", title: "Up to Eleven", description: "https://techbooster.booth.pm/items/2627786", genre: "Writing", part: "第4章 今日から使えるMatrix", coverImageUrl: "https://s2.booth.pm/dac5443b-c661-4e74-84dd-b914e12fb633/i/2627786/3f9c9f6c-948e-4b4b-9bb2-e08527a03aea_base_resized.jpg"},
        { id: 3, name: "techbooster-tbf9", date: "202009", title: "プロに追いつくAndroid 開発入門 - アプリ設計を理解する", description: "https://techbooster.booth.pm/items/2367037", genre: "Writing", part: "第7章 メモリリークの謎を追う", coverImageUrl: "https://s2.booth.pm/dac5443b-c661-4e74-84dd-b914e12fb633/i/2367037/7b5453e8-33e6-49b3-937c-653d59de84b8_base_resized.jpg"},
        { id: 4, name: "techbooster-tbf8", date: "202004", title: "みんな気になるAndroid開発の最新事情", description: "https://techbooster.booth.pm/items/1743311", genre: "Writing", part: "第1章 in-app updates：アプリを使いながらアップデートしよう", coverImageUrl: "https://s2.booth.pm/dac5443b-c661-4e74-84dd-b914e12fb633/i/1743311/2f625758-bfc6-43ad-9278-0a9b13ccc31d_base_resized.jpg"},
        { id: 5, name: "loupe", date: "202004", title: "loupe", description: "https://github.com/igreenwood/loupe", genre: "Android OSS Library", part: "Android coding, Design, and all", coverImageUrl: "/images/loupe.gif"},
        { id: 6, name: "techbooster-tbf7", date: "201909", title: "ていねいに学ぶAndroidアプリ開発 Android 10 Modern Functions", description: "https://techbooster.booth.pm/items/1509191", genre: "Writing", part: "第2章 実践コルーチン 〜コードを動かして理解しよう〜", coverImageUrl: "https://s2.booth.pm/dac5443b-c661-4e74-84dd-b914e12fb633/i/1509191/7f0031ac-dc40-4a91-8736-0a66908b5feb_base_resized.jpg"},
        { id: 7, name: "monomy", date: "201804", title: "monomy", description: "Accessory create & sell application", genre: "Android Application", part: "Android coding", coverImageUrl: "/images/monomy.gif"},
        { id: 8, name: "techbooster-c96", date: "201908", title: "Androidプログラミング短編集：王女とカルテットの宝探し", description: "https://techbooster.booth.pm/items/1485567", genre: "Writing", part: "第5章 今さら聞けないAndroid の非同期処理～歴史を一気に駆けぬけよう～", coverImageUrl: "https://s2.booth.pm/dac5443b-c661-4e74-84dd-b914e12fb633/i/1485567/d8ed3bb0-0463-4e11-a27f-fecc700f7aad_base_resized.jpg"},
        { id: 9, name: "techbooster-tbf6", date: "201904", title: "とある技術の即興詩人", description: "https://techbooster.booth.pm/items/1485560", genre: "Writing", part: "第4章 Kotlin Contractsコンパイラと契約しよう", coverImageUrl: "https://s2.booth.pm/dac5443b-c661-4e74-84dd-b914e12fb633/i/1485560/f78c3d19-2286-474c-beed-8d8ccc4b02fc_base_resized.jpg"},
        { id: 10, name: "techbooster-c95", date: "201812", title: "TechBoosterプログラミングブック ～０から学ぶ最新技術とアプリ開発テクニック～", description: "https://techbooster.booth.pm/items/1144425", genre: "Writing", part: "第3章 How to serialize data in Kotlin", coverImageUrl: "https://s2.booth.pm/dac5443b-c661-4e74-84dd-b914e12fb633/i/1144425/12ffc04c-8edb-4bb3-b5e2-1fc7bd38964a_base_resized.jpg"},
        { id: 11, name: "simplecropview", date: "201509", title: "SimpleCropView", description: "https://github.com/igreenwood/SimpleCropView", genre: "Android OSS Library", part: "Android coding, Design, and all", coverImageUrl: "https://camo.githubusercontent.com/c824ee6b2d1659402994a69a97835fa8379a9387e801b0fa1907ed99eade4429/68747470733a2f2f7261772e6769746875622e636f6d2f77696b692f4973736569416f6b692f53696d706c6543726f70566965772f696d616765732f6465766963652d6172742f636f7665722d6172742e706e67"},
    ]
}

export const profileData: ProfileData = {
    name: "Issei Aoki",
    job: "a Tokyo based software engineer",
    description: `Having backgrounds in media arts, he works as s software engineer to development for launching new businesses.
    His greatest strength is his ability for visual programing and UI animations.`,
    skillData: {
        mainSkills: [
            { name: "Android", category: "programming" },
            { name: "Kotlin", category: "programming" },
            { name: "Java", category: "programming" },
            { name: "Swift", category: "programming" },
            { name: "Objective-C", category: "programming" },
            { name: "Processing", category: "programming" },
            { name: "Graphic Design", category: "design" },
            { name: "Illustrator", category: "design" },
            { name: "Photoshop", category: "design" },
            { name: "figma", category: "design" },
            { name: "Image Processing", category: "other" },
        ],
        subSkills: [
            { name: "JavaScript", category: "programming" },
            { name: "TypeScript", category: "programming" },
            { name: "React.js", category: "programming" },
            { name: "Next.js", category: "programming" },
            { name: "Ruby on Rails", category: "programming" },
            { name: "HTML", category: "programming" },
            { name: "CSS", category: "programming" },
            { name: "GLSL", category: "programming" },
            { name: "C++", category: "programming" },
            { name: "Audio Engineering", category: "other" },
            { name: "Sound Programing", category: "programming" },
        ]
    },
    careerData: {
        timelines: [ 
            { id: 1, date: "2018-Now", title: "Android Developer @Lang-8.inc", description: "Android: migration async processing from RxJava to Kotlin, migration from Camera to Camera2, migration billing framework from AIDL to Google Play Billing Library, migration CSS WebViews to native Views, and all", hideDate: false },
            { id: 2, date: "2016-2018", title: "Android Developer @FUN UP INC. as Freelance", description: "Android: full porting of iOS App(with Sprite Kit) to Android App(with libGDX)", hideDate: false },
            { id: 3, date: "2016-2017", title: "Web Frontend Developer, Web Backend Developer, Designer as Freelance", description: "Javascript: implementing service lp page/ Ruby on Rails: implementing service api/ Design: Create lp page icons", hideDate: false },
            { id: 4, date: "2015-2017", title: "Android Developer @umeebe Inc. as Freelance", description: "Android: implementing interactive photo map, implementing interactive graph view and many complex custom views", hideDate: false },
            { id: 5, date: "2013-2016", title: "Android Developer, iOS Developer @OUTSOURCING TECHNOLOGY Inc.", description: "Android: implementing graph views for slot machine, implementing photo editing app from scratch, implementing calendar sharing app from scratch/ iOS: porting calendar sharing app", hideDate: false },
            { id: 6, date: "2012-2013", title: "Unity Developer, Android Developer @C.A.Mobile,Ltd.", description: "Unity: implementing visual music sequencer app/ Android: implementing multiple translation joke app", hideDate: false }
        ]
    },
    awardData: {
        timelines: [ 
            { id: 1, date: "2011", title: "Grand Prix in BACA-JA 2011 Network Art Category", description: "oscillators", hideDate: false },
            { id: 2, date: "2011", title: "Prize in Asia Digital Art Award", description: "oscillators", hideDate: true }
        ]
    },
    educationData: {
        timelines: [ 
            { id: 1, date: "2010-2012", title: "Master of Content Creative Design, Kyushu University, Graduate School of Design", description: "Java, Processing, openFrameworks, Sound Design, Sound Programming(Max/MSP, Reactor, SuperCollider)", hideDate: false },
            { id: 2, date: "2006-2010", title: "Bachelor of Visual Communication Design, Kyushu University", description: "Graphic Design(Adobe Illustrator, Adobe Photoshop, Adobe InDesign), Image Processing(C), Computer Graphihcs, Computer Vision, Video Editing(Adobe Premire), Audio Engineering(Logic Pro, ProTools, Adobe Audition)", hideDate: false }
        ]
    },
    contactData: { githubUrl: "https://github.com/igreenwood", twitterUrl: "https://twitter.com/_igreenwood", linkedInUrl: "https://www.linkedin.com/in/issei-aoki-a8876019a/", email: "i.greenwood.dev@gmail.com" }
}