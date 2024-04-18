import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {Post} from "../../models/post";
import {Subject, takeUntil} from "rxjs";
import {SlugPipe} from "../../customPipes/slug.pipe";
import {SnackbarService} from "../../services/snackbar.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements  OnInit, OnDestroy{
  blogPost: Post[] = [] ;
  private unsubscribe$ = new Subject<void>();
  config: any;
  pageSizeOptions : number[] = [];
  constructor(private blogService: BlogService,private route:ActivatedRoute, private slugPipe:SlugPipe, private snackBarService: SnackbarService) {
    this.pageSizeOptions = [2, 4, 6];
    const pageSize = localStorage.getItem('pageSize');
    this.config = {
      currentPage: 1,
      itemsPerPage: pageSize ? +pageSize : this.pageSizeOptions[0]
    };
  }
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.config.currentPage = +params['pagenum'];
        this.getBlogPosts();
      }
    );
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
    if (confirm('Are you sure')) {
      this.blogService.deletePost(postId).then(
        () => {
          this.snackBarService.showSnackBar('Blog post deleted successfully');
        }
      );
    }
  }
}
