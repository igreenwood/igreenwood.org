import React from 'react'
import styles from './Profile.module.css'
import { Timeline } from '../interfaces'
import Skills from './Skills'
import Awards from './Awards'
import Education from './Education'
import Contact from './Contact'
import Careers from './Careers'
import Container from './Container'
import commonStyles from '../styles/utils.module.css'

export default function Profile(){
    const contact = { githubUrl: "https://github.com/igreenwood", twitterUrl: "https://twitter.com/_igreenwood", linkedInUrl: "https://www.linkedin.com/in/issei-aoki-a8876019a/", email: "i.greenwood.dev@gmail.com" }
    const careersItems: Timeline[] = [ 
        { id: 1, date: "2018-Now", title: "Android Developer @Lang-8.inc", description: "Android: migration async processing from RxJava to Kotlin, migration from Camera to Camera2, migration billing framework from AIDL to Google Play Billing Library, migration CSS WebViews to native Views, and all", hideDate: false },
        { id: 2, date: "2016-2018", title: "Android Developer @FUN UP INC. as Freelance", description: "Android: full porting of iOS App(with Sprite Kit) to Android App(with libGDX)", hideDate: false },
        { id: 3, date: "2016-2017", title: "Web Frontend Developer, Web Backend Developer, Designer as Freelance", description: "Javascript: implementing service lp page/ Ruby on Rails: implementing service api/ Design: Create lp page icons", hideDate: false },
        { id: 4, date: "2015-2017", title: "Android Developer @umeebe Inc. as Freelance", description: "Android: implementing interactive photo map, implementing interactive graph view and many complex custom views", hideDate: false },
        { id: 5, date: "2013-2016", title: "Android Developer, iOS Developer @OUTSOURCING TECHNOLOGY Inc.", description: "Android: implementing graph views for slot machine, implementing photo editing app from scratch, implementing calendar sharing app from scratch/ iOS: porting calendar sharing app", hideDate: false },
        { id: 6, date: "2012-2013", title: "Unity Developer, Android Developer @C.A.Mobile,Ltd.", description: "Unity: implementing visual music sequencer app/ Android: implementing multiple translation joke app", hideDate: false }
    ]
    const awardItems: Timeline[] = [ 
        { id: 1, date: "2011", title: "Grand Prix in BACA-JA 2011 Network Art Category", description: "oscillators", hideDate: false },
        { id: 2, date: "2011", title: "Prize in Asia Digital Art Award", description: "oscillators", hideDate: true }
    ]
    const educationItems: Timeline[] = [ 
        { id: 1, date: "2010-2012", title: "Master of Content Creative Design, Kyushu University, Graduate School of Design", description: "Java, Processing, openFrameworks, Sound Design, Sound Programming(Max/MSP, Reactor, SuperCollider)", hideDate: false },
        { id: 2, date: "2006-2010", title: "Bachelor of Visual Communication Design, Kyushu University", description: "Graphic Design(Adobe Illustrator, Adobe Photoshop, Adobe InDesign), Image Processing(C), Computer Graphihcs, Computer Vision, Video Editing(Adobe Premire), Audio Engineering(Logic Pro, ProTools, Adobe Audition)", hideDate: false }
    ]
    return <>
        <article>
            <figure>
                <img src="/images/cover3.jpg" className={ styles.coverImage }/>
            </figure>
            <Container>
                <section>
                        <h1>
                            <div className={ commonStyles.headingL }>
                                <span className={ styles.name } >Issei Aoki</span> is a Tokyo based <br/>software engineer.
                            </div>
                            <div className={ styles.description }>
                                Having backgrounds in media arts, he works as s software engineer to development for launching new businesses.
                                His greatest strength is his ability for visual programing and UI animations.
                            </div>
                        </h1>
                    </section>
                    
                    <Skills/>

                    <Careers items={ careersItems }/>

                    <Awards items={ awardItems }/>

                    <Education items={ educationItems }/>

                    <Contact
                        githubUrl={ contact.githubUrl }
                        twitterUrl={ contact.twitterUrl }
                        linkedInUrl={ contact.linkedInUrl }
                        email={ contact.email }
                    />
            </Container>
        </article>
        
    </>
}