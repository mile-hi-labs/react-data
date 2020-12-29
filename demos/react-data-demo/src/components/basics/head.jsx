import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { LibIcon } from 'utils/assets/branding';

const Head = (props) => {
	const { title, description, img, url } = props;
	const { pathname } = useLocation();


  // Render
	return (
    <Helmet>
      <link rel='shortcut icon' href={LibIcon} />
      <title>{title}</title>
      <meta name='description' content={description} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={LibIcon} />
      <meta property='og:url' content={pathname} />

      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={LibIcon} />
      <meta property='twitter:card' content='summary_large_image' />

      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width'/>
    </Helmet>
	)
}


Head.defaultProps = {
	title: 'React Data Demo',
	description: 'A demo application to showcase and test React Data.',
}


export default Head;
