import { Articles } from "lib/models/Articles";
import {ActionRequest,ArticleUserMapping} from "lib/models/ArticleUserMapping";
import { Action } from "lib/models/enum/Action";
import { Users } from "lib/models/Users";
import { SendMail } from "./Notification/SendEmail";

export class HandleArticles {
  static async do(incomingMessage: ActionRequest) {
    try {
      const request = ActionRequest.fromJson(incomingMessage);
      if (request.isValid) {
        const article = await Articles.updateRecord(request);
        await ArticleUserMapping.insertRecord(request);
        const UserInfo = await Users.getById(request.userId);
        if (request.action === Action.Like) {
          const mailBody = `Hai ${article.author}, ${UserInfo.name} Liked your article ${article.title}`;
          const subject = "New updates on your article";
          SendMail.call(subject, mailBody);
        }
      } else {
        console.log("invalid request received");
      }
    } catch (error) {
      console.log("Something went wrong!", error);
      throw error;
    }
  }
}
//if user views a article
// --update in articles table
// --update the info in the mapped table

// if user likes a article
// --update in articles table
// --update the info in new table
// --notification 


