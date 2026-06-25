import { comments } from "../../data/data";

export default function CommentsTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-text-h">Comments</h2>
      <ul className="mt-3 space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="flex gap-3">
            <img
              src={comment.avatar}
              alt={comment.name}
              className="size-8 shrink-0 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-h">
                  {comment.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {comment.time}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {comment.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
