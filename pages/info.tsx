import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { ProfileData } from '../interfaces'
import { profileData } from '../utils/local-data'

type Props = {
    profileData: ProfileData
}

export default function InfoPage({ profileData }: Props) {
    return <Layout>
        <Profile data={profileData}/>
    </Layout>
}

export async function getStaticProps() {
    return {
        props: {
            profileData: profileData
        }
    }
}