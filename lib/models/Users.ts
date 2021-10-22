import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  static async getById(id: number) {
    return await Users.findOne({
      where: { id: id },
    });
  }
  static fromJson(json: any): Users {
    const user = new Users();
    try {
        user.name = json.name;
    }
    catch (error) {
    console.log('Exception occured',error)
    }
    return user;
}
}