export interface CreateBlogRequestSchema {
    blog_data : {
        blog_id : string;
        blogTitle: string;
        markdown_source : string;
    }
    topics : string[]
}
export interface BlogRenderSchema {
    blog_data : {
        blog_id : string;
        blogTitle: string;
        markdown_source : string;
        created_at : Date
    }
    topics : object[]
}