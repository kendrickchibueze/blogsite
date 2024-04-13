export class Post {
  postId?: string ;   //adding ? makes it optional
  // meaning it doesn't have to be initialized in a constructor
  title?: string;
  content: string;
  author?: string;
  createdDate: any;
  constructor() {
    this.content = '';
  }
}
