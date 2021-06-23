import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { BlogsService } from '../blogs.service';
import { Blog } from '../Shared/Blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  // blogs = [
  //   {title: 'First blog', content: 'This is the content of the first blog'},
  //   {title: 'Second blog', content: 'This is the content of the second blog'},
  //   {title: 'Third blog', content: 'This is the content of the third blog'}
  // ];
  blogs: Blog[] = [];
  blogSubcription: Subscription;

  constructor(public blogService: BlogsService) { }

  ngOnInit() {
    this.blogService.getBlogs();
    this.blogSubcription = this.blogService.UpdatedBlogListner().subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
    });
  }

  Delete(blogId: string) {
    this.blogService.DeleteBlog(blogId);
  }

  ngOnDestroy() {
    this.blogSubcription.unsubscribe();
  }
}
