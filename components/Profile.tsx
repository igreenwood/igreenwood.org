import React from 'react'
import styles from './Profile.module.css'
import Skills from './Skills'
import Contact from './Contact'

export default function Profile(){
    const contact = { githubUrl: "https://github.com/igreenwood", twitterUrl: "https://twitter.com/_igreenwood", linkedInUrl: "https://www.linkedin.com/in/issei-aoki-a8876019a/", email: "i.greenwood.dev@gmail.com" }

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