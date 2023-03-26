import { ArticleService } from "../application/ports";
import { IData } from "../domain/respone";
import { callApi } from "./api";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const pageSize = 15;

export function useArticleService(): ArticleService {
  function findBySection(section: string, orderBy: string): Promise<IData> {
    return callApi(
      `${baseUrl}/search?page-size=${pageSize}&section=${section}&order-by=${orderBy}&show-fields=thumbnail&api-key=${apiKey}`
    );
  }

  function search(query: string, orderBy: string): Promise<IData> {
    return callApi(
      `${baseUrl}/search?page-size=${pageSize}&page=1&q=${query}&order-by=${orderBy}&api-key=${apiKey}&show-fields=thumbnail`
    );
  }
  function sort(option: string): Promise<IData> {
    return callApi(
      `${baseUrl}/search?page-size=${pageSize}&q=news&order-by=${option}&api-key=${apiKey}&show-fields=thumbnail`
    );
  }

  function findById(id: string): Promise<IData> {
    return callApi(
      `${baseUrl}/${id}?api-key=${apiKey}&show-fields=thumbnail,headline,body`
    );
  }

  function paginate(page: number, query: string): Promise<IData> {
    return callApi(
      `${baseUrl}/search?page-size=${pageSize}&page=${page}&q=${query}&api-key=${apiKey}&show-fields=thumbnail`
    );
  }

  return { sort, search, findBySection, findById, paginate };
}
