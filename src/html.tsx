import React from 'react';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} className="h-100">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes} className="h-100">
        {props.preBodyComponents}
        <div
          key={`body`}
          className="d-flex flex-column h-100"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}
