import { fullBlog } from '@/lib/interface';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from 'next-sanity';
import { Image } from 'next-sanity/image';
import React from 'react'

async function getData (slug: string) {
  const query = `*[_type == "blog" && slug.current == '${slug}']{
  "currentSlug": slug.current,
    title,
    content,
    titleImage
}[0]`;

const data = await client.fetch(query);
return data;
}

export default async function BlogArticle ({params, } : {params: {slug: string}; }) {
  const data: fullBlog = await getData(params.slug);

  // Ensure that content is structured correctly for PortableText
  const content = typeof data.content === 'string' ? [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: data.content,
        },
      ],
    },
  ] : data.content;

  console.log(data);

  return (
    <div className='mt-8'>
      <h1>
        <span className='block text-base text-center text- font-semibold tracking-wide uppercase text-blue-600'>Ahmed Ali - Blog</span>
        <span className='mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:4xl'>{data.title}</span>
      </h1>
      <Image src={urlFor(data.titleImage).url()} width={800} height={500} alt="Title Image" priority className='rounded-lg mt-8 border' />

      <div className='mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary'>
        <PortableText value={content} />
      </div>
    </div>
  );
}
