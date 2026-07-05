
import React from 'react';
import { Head } from 'vite-react-ssg';

const SITE_URL = 'https://leonardosa.pro';
const OG_IMAGE = `${SITE_URL}/img/og-image.png`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, path }) => {
  const url = `${SITE_URL}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Leonardo Sá — AI Engineer" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Head>
  );
};

export default Seo;
