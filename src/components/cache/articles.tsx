import { useEffect, useState } from "react";
import { httpClient } from "../../axios";
import { Article } from "../../types/article";
import ArticleItem from "./article";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  //
  useEffect(() => {
    const getAllArticles = async () => {
      try {
        const res = await httpClient({
          url: "articles",
          useCache: true,
          dataKey: "articles",
        });

        console.log("Response", res);
        setArticles(res?.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingArticles(false);
      }
    };

    getAllArticles();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">Articles</h1>
      {loadingArticles && <p>Loading...</p>}
      {!loadingArticles && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles?.map((article) => (
            <ArticleItem article={article} key={article?.id} />
          ))}
        </div>
      )}
    </div>
  );
}
