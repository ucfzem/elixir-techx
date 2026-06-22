import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://elixir-techx.vercel.app';

export default function SEO({
  title,
  description,
  path,
  image,
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string;
}) {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;

  return (
    <Helmet>
      <title>{title} | TechStore</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={`${title} | TechStore`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image.startsWith('http') ? image : `${SITE_URL}${image}`} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | TechStore`} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image.startsWith('http') ? image : `${SITE_URL}${image}`} />}
    </Helmet>
  );
}
