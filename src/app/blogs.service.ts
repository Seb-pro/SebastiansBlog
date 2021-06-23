import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Blog } from "./Shared/Blog.model";

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private blogs: Blog[] = [];
  private updatedBlog = new Subject<Blog[]>();

  getBlogs() {
    this.http.get<{message: string, blogs: any[]}>('http://localhost:3000/api/blogs')
    .pipe(map((data) => {
      return data.blogs.map(blog => {
        return {
          title: blog.title,
          content: blog.content,
          id: blog._id
        };
      });
    }))
    .subscribe((transformedBlog) => {
    this.blogs = transformedBlog;
    this.updatedBlog.next(this.blogs);
    });
  }

  UpdatedBlogListner() {
    return this.updatedBlog.asObservable();
  }

  getSingleBlog(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/blogs/' + id);
  }

  PostBlogs(title: string, content: string) {
    const blog: Blog = { id: null, title: title, content: content };
    this.http.post<{message: string, blogId: string}>('http://localhost:3000/api/blogs', blog)
    .subscribe(data => {
      const id = data.blogId;
      blog.id =id;
      this.blogs.push(blog);
      this.updatedBlog.next(this.blogs)
      this.router.navigate(["/"]);
    });

  }

  putBlog(id: string, title: string, content: string) {
    const blog: Blog = {id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/blogs/' + id, blog)
    .subscribe( data => {
      const updatedBlog = this.blogs;
      const oldBlogIndex = updatedBlog.findIndex(b => b.id == blog.id);
      updatedBlog[oldBlogIndex] = blog;
      this.blogs = updatedBlog;
      this.updatedBlog.next(this.blogs)
      this.router.navigate(["/"]);
    })
  }

  DeleteBlog(blogId: string) {
    this.http.delete('http://localhost:3000/api/blogs/' + blogId)
    .subscribe(() => {
      const removeDeletedBlog = this.blogs.filter(blog => blog.id !== blogId);
      this.blogs = removeDeletedBlog;
      this.updatedBlog.next(this.blogs);
    })
  }

  constructor(private http: HttpClient, private router: Router) { }
}
