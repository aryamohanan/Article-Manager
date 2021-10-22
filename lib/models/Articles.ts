import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActionRequest } from "./ArticleUserMapping";
import { Action } from "./enum/Action";

@Entity("articles")
export class Articles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  author: string;
  @Column()
  body: any;
  @Column()
  noOfLikes: number;
  @Column()
  noOfViews: number;
  static async getByTitle(title: string) {
    return await Articles.find({
      where: { title: title },
    });
  }
  static fromJson(json: any): Articles {
    const article = new Articles();
    try {
      article.title = json.title;
      article.author = json.author;
      article.body = json.body;
      article.noOfLikes = json.noOfLikes;
      article.noOfViews = json.noOfViews;
    } catch (error) {
      console.log("Exception occured", error);
    }
    return article;
  }
  static async updateRecord(request: ActionRequest) {
    let article = await Articles.findOne(request.articleId);
    if (request.action === Action.Like) {
      article.noOfLikes = article.noOfLikes + 1;
    }
    if (request.action === Action.View) {
      article.noOfViews = article.noOfViews + 1;
    }
    return await Articles.save(article);
  }
}
