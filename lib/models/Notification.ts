import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("notification")
export class Notifications extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  to: string;
  @Column()
  subject: string;
  @Column()
  body: any;
  static async insertRecord(to,subject,body)
  {
   let notification = new Notifications();
   notification.to = to;
   notification.subject = subject;
   notification.body = body;
   return await notification.save();
  }
}

