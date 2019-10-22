var Posts = function(post) {
    this.title = post.title,
        this.id = post.id,
        this.description = post.description,
        this.content = post.content,
        this.avartar = post.avartar,
        this.date_create = post.date_create,
        this.slug = post.slug,
        this.status = post.status,
        this.id_category = post.id_category
}
module.exports = Posts;