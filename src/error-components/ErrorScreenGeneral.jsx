const ErrorScreenGeneral = () => {
  return (
    <>
      <h1 className="text-9xl font-black text-gray-300">Oops</h1>
      <p className="text-2xl font-bold tracking-tight text-red-600 sm:text-4xl">Something went wrong!</p>
      <p className="mt-4 text-gray-500">{"We can't seem to find what you're looking for."}</p>
    </>
  );
};

export default ErrorScreenGeneral;