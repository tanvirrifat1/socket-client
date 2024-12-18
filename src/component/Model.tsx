function Model({ isModelOpen, setIsModelOpen, children }: any) {
  if (!isModelOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <button
          onClick={() => setIsModelOpen(false)}
          className="absolute top-4 right-4 text-black text-3xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Model;
