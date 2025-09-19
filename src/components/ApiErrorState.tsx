import { AiOutlineSync } from "react-icons/ai";

const ApiErrorState: React.FC<{
  message: string;
  onRetry?: () => void;
}> = ({ message, onRetry }) => {
  return (
    <section>
      <div className="text-center h-[100vh]">
        <div className="flex justify-center my-4">
          <img
            src="/images/icon-error.svg"
            alt="Error Icon"
            className="size-[40px]"
          />
        </div>
        <h1 className="text-4xl my-2">Something went wrong</h1>
        <p className="my-4">
          We couldn't connect to the server (API error). Please try again in a
          few moments.
        </p>
        <p>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-[#312f4b] flex gap-2 rounded-md items-center px-3 py-1.5 mx-auto my-1"
          >
            <AiOutlineSync /> Retry
          </button>
        )}
      </div>
    </section>
  );
};

export default ApiErrorState;
