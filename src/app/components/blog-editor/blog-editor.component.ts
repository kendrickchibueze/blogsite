import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post";
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss'],
  providers: [DatePipe]
})
export class BlogEditorComponent implements OnInit{
  public Editor:any = ClassicEditor ;
  ckeConfig: any;
  postData = new Post();
  formTitle = 'Add';
  postId = '';

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private blogService: BlogService,
              private router: Router) { }
  ngOnInit(): void {
   this.setEditorConfig();


  }



  setEditorConfig() {
    this.ckeConfig = {
      removePlugins: ['ImageUpload', 'MediaEmbed'],
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ckheading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ckheading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ckheading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ckheading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ckheading_heading4' },
          { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ckheading_heading5' },
          { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ckheading_heading6' },
          { model: 'Formatted', view: 'pre', title: 'Formatted' },
        ]
      }
    };
  }
  saveBlogPost() {
    this.postData.createdDate = this.datePipe.transform(Date.now(), 'MMdd-yyyy HH:mm');
    this.blogService.createPost(this.postData).then(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
