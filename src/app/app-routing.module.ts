import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BlogListComponent } from "./blog-list/blog-list.component";
import { CreateBlogComponent } from "./create-blog/create-blog.component";

const routes: Routes = [
  { path: '', component: BlogListComponent},
  { path: 'create', component: CreateBlogComponent },
  { path: 'edit/:id', component: CreateBlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
