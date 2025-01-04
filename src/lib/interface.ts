export interface simpleBlogCard {
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: string;  // URL or image identifier
}

export interface fullBlog {
    currentSlug: string;
    title: string;
    content: string;  // The main text of the blog post
    titleImage: string;  // URL or image identifier for the title image
}
