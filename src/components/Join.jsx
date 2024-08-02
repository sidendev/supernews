import { useState, useEffect } from "react";

const Join = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    e.target.reset();
    setTimeout(() => {
      setShowToast(false);
    }, 5000); // Hide toast after 5 seconds
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 mt-10">
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
      </div>
    );
  }

  // form not currently linked to any backend
  return (
    <section className="max-w-4xl px-6 pt-24 mx-auto space-y-12 bg-base-200 rounded-2xl my-8">
      <div className="w-full mx-auto space-y-4 text-center">
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">Join Our Writers</h1>
      </div>
      <section className="prose mx-auto pb-10 text-center">
        <p>
          Do you have a super news story to share?
        </p>
        <p>
          Complete the form below if you are interested in joining our team of writers.
        </p>
      </section>
      <form className="flex flex-col items-center space-y-4 pb-9" onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Your name" className="input input-bordered w-full max-w-xs rounded-xl" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Your email" className="input input-bordered w-full max-w-xs rounded-xl" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Why should you become a writer for SuperNews?</span>
          </label>
          <textarea placeholder="Your message" className="textarea textarea-bordered h-24 w-full max-w-xs rounded-xl"></textarea>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Share your super news story</span>
          </label>
          <textarea placeholder="Your news story" className="textarea textarea-bordered h-24 w-full max-w-xs rounded-xl"></textarea>
        </div>
        <button type="submit" className="btn btn-secondary bg-primary rounded-full text-white font-semibold">Submit</button>
      </form>

      {showToast && (
        <div className="toast toast-end" style={{ zIndex: 200 }}>
          <div className="alert alert-info rounded-full bg-purple-900 text-white max-w-xs">
            <div>
              <span>Thanks for submitting your story.</span>
              <button className="btn btn-sm btn-ghost" onClick={() => setShowToast(false)}>✕</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Join;