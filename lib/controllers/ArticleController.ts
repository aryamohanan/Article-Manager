import { Request, Response } from "express";
import { Articles } from "lib/models/Articles";
import { HandleArticles } from "lib/usecases/HandleArticles";
 
export class ArticleController {
  async show(request: Request, response: Response) {
    const id = request.params.id;
    await Articles.findOne(id)
      .then((record) => {
        response.status(200).json(record).end();
      })
      .catch((error) => response.status(400).json(error).end());
  }

  async create(request: Request, response: Response) {
    const payload = request.body;
    const record = Articles.fromJson(payload);
    return Articles.save(record).then((result) => {
      return response.status(200).json(result).end();
    });
  }

  async update(request: Request, response: Response) {
    const payload = request.body;
    const id = request.params.id;
    const mappingRecord = Articles.fromJson(payload);
    return Articles.update(id, mappingRecord)
      .then((record) => Articles.findOne(id))
      .then((result) => {
        response.status(200).json(result).end();
      })
      .catch((error) => {
        response.status(400).json(error).end();
      });
  }
  async newUpdates(request: Request, response: Response) {
    HandleArticles.do(request.body)
      .then((result) => {
        response.status(200).json(result).end();
      })
      .catch((err) => response.status(400).send(err));
  }
}
