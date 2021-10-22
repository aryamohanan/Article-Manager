import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Action } from "./enum/Action";

@Entity("article_user_mapping")
export class ArticleUserMapping extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  articleId: number;
  @Column()
  userId: number;
  @Column()
  isLiked: boolean;
  @Column()
  isViewed: boolean;

  static async insertRecord(request: ActionRequest)
  {
   let mapping = new ArticleUserMapping();
   mapping.articleId = request.articleId;
   mapping.userId = request.userId;
   if(request.action === Action.Like)
   {
       mapping.isLiked = true;
   }
   if(request.action === Action.View)
   {
       mapping.isViewed = true;
   }
   return await mapping.save();
  }
}
export class ActionRequest{
articleId: number;
userId: number;
action: string;
get isValid(): boolean {
    return !!(this.articleId && this.userId);
  }
  static fromJson(json: any): ActionRequest {
    const request = new ActionRequest();
    try {
        request.userId = json.userId;
        request.articleId = json.articleId;
        request.action = json.action;
    } catch (error) {
      console.log("Exception occured", error);
    }
    return request;
  }
}
