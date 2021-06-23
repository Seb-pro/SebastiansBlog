import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { BlogsService } from '../blogs.service';
import { Blog } from '../Shared/Blog.model';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  private mode = 'create';
  private blogId = "";
  blog: Blog;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = "edit";
        this.blogId = paramMap.get('id');
        this.blogService.getSingleBlog(this.blogId).subscribe(blogData => {
          this.blog = {id: blogData._id, title: blogData.title, content: blogData.content}
        });
      }else {
        this.mode = "create";
        this.blogId = null;
      }
    });
  }

  AddBlog(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode == 'create'){
      this.blogService.PostBlogs(form.value.title, form.value.content);
    }else {
      this.blogService.putBlog(this.blogId, form.value.title, form.value.content)
    }
    form.resetForm();
  }

  constructor(public blogService: BlogsService, public route: ActivatedRoute) { }

}
