import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { ProfileData } from '../interfaces'
import { getProfile } from '../utils/graphcms'

type Props = {
    profileData: ProfileData
}

export default function InfoPage({ profileData }: Props) {
    return <Layout>
        <Profile data={profileData}/>
    </Layout>
}

export async function getStaticProps() {
    const { data } = await getProfile()
    const profileData = data.profile as ProfileData
    return {
        props: {
            profileData: profileData
        }
    }
}