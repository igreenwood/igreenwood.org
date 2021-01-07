import { ProfileData } from '../interfaces'

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