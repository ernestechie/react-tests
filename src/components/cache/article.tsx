import { Article } from "../../types/article";

interface ArticleProps {
  article: Article;
}

export default function ArticleItem({ article }: ArticleProps) {
  return (
    <div className="p-4 border border-neutral-200 rounded-lg">
      <div className="space-y-2 mb-4">
        <p className="font-semibold">{article?.title}</p>
        <p className="text-neutral-500 text-sm">{article?.description}</p>
        <p className="text-neutral-500 italic">
          {new Date(article?.created_at)?.toLocaleDateString()}
        </p>
      </div>
      <button type="button" className="btn">
        Read more
      </button>
    </div>
  );
}
