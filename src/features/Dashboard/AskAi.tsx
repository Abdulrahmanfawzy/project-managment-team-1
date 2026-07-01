import { useState } from "react";
import image from "@/assets/image 2.svg";
import { SendHorizontal } from "lucide-react";
import { useAskAI } from "@/features/Dashboard/hooks/UseAskAI";

export default function AskAi() {
  const [question, setQuestion] = useState("");

  const { mutate, data, isPending, error } = useAskAI();
 
  const handleAsk = () => {
    if (!question.trim()) return;
  
    mutate(question, {
      onSuccess: () => {
        setQuestion("");
      },
    });
  };

  const handleKeyDown = (e:any) => {
    if (e.key === "Enter" ) {
      handleAsk();
  }}

  return (
    <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-5 flex flex-col justify-between">
      <h2 className="font-semibold text-black">Ask AI</h2>

      <div className="flex flex-col items-center justify-center my-auto">
        <img
          src={image}
          className="w-16 h-16 object-contain mb-2"
          alt="ai-bot"
        />
        <h2 className="text-sm text-gray-500 font-medium">
          Ask me anything
        </h2>
      </div>

      <div className="relative w-full mt-2">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-gray-100 rounded-md p-2 pr-12 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          rows={2}
          placeholder="Ask for anything..."
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleAsk}
          disabled={isPending}
          className="absolute right-3 bottom-3 cursor-pointer disabled:opacity-50"
        >
          <SendHorizontal size={18} />
        </button>
      </div>

      {isPending && (
        <p className="mt-3 text-sm text-gray-500">
          Generating answer...
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      {data && (
        <div className="mt-4 rounded-md bg-gray-100 p-3">
          <h3 className="font-semibold mb-2">AI Answer</h3>
          <p className="text-sm text-gray-700">
            {data.data.answer}
          </p>
        </div>
      )}
    </div>
  );
}