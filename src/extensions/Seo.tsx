import { Helmet } from "react-helmet-async";

interface SeoProps {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogType?: string;
    canonical: string;
    ogImage?: string;
}

export default function Seo({ title, description, ogTitle, ogDescription, ogType="website", canonical, ogImage="https://znilpy.space/znilpy.png" }: SeoProps) {

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Zniply | {title}</title>
            <meta name="description" content={description} />
            
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImage} />
            
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ogTitle} />
            <meta name="twitter:description" content={ogDescription} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="author" content="EdenBlood" />
            <link rel="canonical" href={canonical} />
        </Helmet>
    )
}