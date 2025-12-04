'use client';

interface ErrorHandlerProps {
  error: Error;
  reset: () => void;
}

function ErrorHandler({ error, reset }: ErrorHandlerProps) {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

export default ErrorHandler;
