//let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

//require('dotenv').config({
//  path: `.env.${activeEnv}`,
//});

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        additionalData: `@import "${__dirname}/src/assets/scss/bootstrap-variables";`,
      },
    },
    //{
    //  resolve: 'gatsby-plugin-google-analytics',
    //  options: {
    //    trackingId: 'UI-111AAA',
    //  },
    //},
    'gatsby-plugin-react-helmet',
    //'gatsby-plugin-sitemap',
  ],
};
