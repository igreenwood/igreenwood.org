import React from 'react'
import styles from './Profile.module.css'
import { Timeline } from '../interfaces'
import Skills from './Skills'
import Awards from './Awards'
import Education from './Education'
import Contact from './Contact'

export default function Profile(){
    const contact = { githubUrl: "https://github.com/igreenwood", twitterUrl: "https://twitter.com/_igreenwood", linkedInUrl: "https://www.linkedin.com/in/issei-aoki-a8876019a/", email: "i.greenwood.dev@gmail.com" }
    const awardItems: Timeline[] = [ 
        { id: 1, date: "2012", title: "Grand Prix in BACA-JA 2011 Network Art Category", description: "oscillators", hideDate: false },
        { id: 2, date: "2011", title: "Prize in Asia Digital Art Award", description: "oscillators", hideDate: true }
    ]
    const educationItems: Timeline[] = [ 
        { id: 1, date: "2012", title: "Master of Content Creative Design, Kyushu University, Graduate School of Design", description: "Java, Processing, openFrameworks, Sound Design, Sound Programming(Max/MSP, Reactor, SuperCollider)", hideDate: false },
        { id: 2, date: "2010", title: "Bachelor of Visual Communication Design, Kyushu University", description: "Graphic Design(Adobe Illustrator, Adobe Photoshop, Adobe InDesign), Image Processing(C), Computer Graphihcs, Computer Vision, Video Editing(Adobe Premire), Audio Engineering(Logic Pro, ProTools, Adobe Audition)", hideDate: false }
    ]
    return <>
        <figure>
            <img src="/images/cover3.jpg" className={ styles.coverImage }/>
        </figure>
        <article>
            <div className={ styles.container }>
                <section>
                    <h2>
                        <div className={ styles.title }>
                            <span className={ styles.name } >Issei Aoki</span> is a <br/>Tokyo based software engineer.
                        </div>
                        <div className={ styles.description }>
                            Having backgrounds in media arts, he works as s software engineer to development for launching new businesses.
                            His greatest strength is his ability for visual programing and UI animations.
                        </div>
                    </h2>
                </section>
                
                <Skills/>

                <Awards items={ awardItems }/>

                <Education items={ educationItems }/>

                <Contact
                    githubUrl={ contact.githubUrl }
                    twitterUrl={ contact.twitterUrl }
                    linkedInUrl={ contact.linkedInUrl }
                    email={ contact.email }
                />
            </div>
        </article>
        
    </>
}