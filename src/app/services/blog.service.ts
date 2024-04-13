import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Post} from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private db : AngularFirestore) {};

  createPost(post: Post) {
    const postData = JSON.parse(JSON.stringify(post));
    return this.db.collection('blogs').add(postData);
  }
}
