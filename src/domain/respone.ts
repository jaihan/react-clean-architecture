import { IArticle } from "./article";

export type IData = {
  response: IResponse;
};

export type IResponse = {
  orderBy: string;
  results: IArticle[];
  content: any;
};
