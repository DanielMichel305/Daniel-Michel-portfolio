
export interface CreateBlogRequestSchema {
    blog_data : {
        blog_id : string;
        blogTitle: string;
        blog_description : string 
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

export interface ExpressFileUpload{
    name: string,
    data: Buffer,
    size: number,
    encoding: string,
    tempFilePath: string,
    truncated: boolean,
    mimetype: string,
    md5: string,
    mv: Function
}
