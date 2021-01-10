import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { OgData, ProfileData } from '../interfaces'
import { siteUrl } from '../utils/constants'
import { getProfile } from '../utils/graphcms'

type Props = {
    profileData: ProfileData
}

export default function InfoPage({ profileData }: Props) {
    const ogData: OgData = {
        title: "Issei Aoki | Info",
        type: "website",
        url: `${siteUrl}/info`,
        image: "/images/cover3.jpg"
    }
    return <Layout ogData={ogData}>
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