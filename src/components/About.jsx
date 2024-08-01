import { useState, useEffect } from "react";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for banner image
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 mt-10">
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
      </div>
    )
  }

  return (
    <>
      <section className="max-w-4xl px-6 pt-24 mx-auto space-y-12 bg-base-200 rounded-2xl my-8">
        <div className="w-full mx-auto space-y-4 text-center">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">About SuperNews</h1>
          <div className="flex justify-center">
            <img
              src="https://images.pexels.com/photos/3184393/pexels-photo-3184393.jpeg?w=750&h=750"
              alt="SuperNews staff team group photo"
              className="max-w-full h-auto rounded-2xl"
            />
          </div>
        </div>
        <article className="prose mx-auto pb-10">
          <p>
            Welcome to <strong>SuperNews</strong>! Our mission is simple: to provide &apos;Just Super Good News&apos; and nothing else.
          </p>
          <p>
            We believe in the power of positive and uplifting news stories as the antidote to the bad news that we get bombarded with daily. Sometimes, it&apos;s good to take a break and read up on the good things happening out there.
          </p>
          <p>
            All our stories are written by our readers and are nominated to go on the site. We take feedback from the public, and articles can get voted upon. This ensures that the content we provide is not only positive but also engaging and community-driven.
          </p>
          <p>
            Thank you for being a part of our journey. Together, we can make the world a little happier, one good news story at a time.
          </p>
        </article>
      </section>
    </>
  );
}

export default About;