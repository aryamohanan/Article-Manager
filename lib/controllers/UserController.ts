import { Request, Response } from "express";
import { Users } from "lib/models/Users";
 
export class UserController {
  async show(request: Request, response: Response) {
    const id = request.params.id;
    await Users.findOne(id)
      .then((record) => {
        response.status(200).json(record).end();
      })
      .catch((error) => response.status(400).json(error).end());
  }

  async create(request: Request, response: Response) {
    const payload = request.body;
    const record = Users.fromJson(payload);
    return Users.save(record).then((result) => {
      return response.status(200).json(result).end();
    });
  }

  async update(request: Request, response: Response) {
    const payload = request.body;
    const id = request.params.id;
    const mappingRecord = Users.fromJson(payload);
    return Users.update(id, mappingRecord)
      .then((record) => Users.findOne(id))
      .then((result) => {
        response.status(200).json(result).end();
      })
      .catch((error) => {
        response.status(400).json(error).end();
      });
  }
}
