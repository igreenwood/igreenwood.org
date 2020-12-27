import React from 'react'
import styles from './Profile.module.css'

export default function Profile(){
    return <>
        <figure>
            <img src="/images/cover3.jpg" className={ styles.coverImage }/>
        </figure>
        <article>
            <section className={ styles.container }>
                <h2>
                    <div className={ styles.title }>
                        Issei Aoki is a <br/>Tokyo based software engineer.
                    </div>
                    <div className={ styles.description }>
                        Having backgrounds in media arts, he works as s software engineer to development for launching new businesses.
                        His greatest strength is his ability for visual programing and UI animations.
                    </div>
                </h2>
            </section>
            
        </article>
        
    </>
}