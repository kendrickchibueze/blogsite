import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {Post} from "../../models/post";
import {Subject, takeUntil} from "rxjs";
import {SlugPipe} from "../../customPipes/slug.pipe";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements  OnInit, OnDestroy{
  blogPost: Post[] = [] ;
  private unsubscribe$ = new Subject<void>();
  constructor(private blogService: BlogService, private slugPipe:SlugPipe) {
  }
  ngOnInit(): void {
  this.getBlogPosts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getBlogPosts() {
    this.blogService.getAllPosts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.blogPost = result;
      });
  }
  getTitleSlug(title: string | undefined): string {
    if (!title) return ''; // Handle cases where title is undefined
    return this.slugPipe.transform(title);
  }
  delete(postId: string) {
    // Method definition to be added later
  }
}
