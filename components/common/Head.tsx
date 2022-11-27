import React from "react";
import Head from "next/head";

const HeadComponent = (props: {
  title: string;
  name: string;
  content: string;
}) => {
  const { title, name, content } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name={name} content={content} />
    </Head>
  )
}

export default HeadComponent;