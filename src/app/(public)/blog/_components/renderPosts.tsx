import { BlogPost } from '@/payload/payload-types'
import BlogCard from '@/website/blog/blog-card';
import React from 'react'

const RenderPosts = (posts: any) => {

    // console.log('posts', posts);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {posts.posts.map((post: BlogPost) => {
                return <BlogCard key={post.id} {...post} />;
            })}
        </div>
    )
}

export default RenderPosts