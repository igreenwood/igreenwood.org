import React from 'react'
import ImageCard from './ImageCard'
import Chip from '@material-ui/core/Chip';
import styles from './Skills.module.css'

type Skill = {
    name: string
    category: SkillCategory
}

type SkillCategory = "programming" | "design" | "other"

export default function Skills(){

    const mainSkills: Skill[] = [
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
    ]

    const subSkills: Skill[] = [
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

    const cardStyle = { flex: "0 1 40%", marginRight: "1rem", marginTop: "1rem" }
    const chipStyle = { color: "#1C1C1C", fontFamily: "WeeklyAlt", fontWeight: 400, fontSize: ".8rem", margin: ".1rem .1rem 0 0" }

    return <section className={ styles.container }>
            <h2 className={ styles.title }>Skills</h2>
            <div className={ styles.cardContainer }>
                <ImageCard image={ "/images/cover6.jpg" } title={ "Main Skills" } style={ cardStyle }>
                    { mainSkills.map((skill) => <Chip variant="outlined" size="small" label={ skill.name } style={ chipStyle } /> ) }
                </ImageCard>
                <ImageCard image={ "/images/cover2.jpg" } title={ "Sub Skills" } style={ cardStyle }>
                    { subSkills.map((skill) => <Chip variant="outlined" size="small" label={ skill.name } style={ chipStyle } /> ) }
                </ImageCard>
            </div>
        </section>
}