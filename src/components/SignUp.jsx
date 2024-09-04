import { useState } from 'react';
import supabase from '../utils/supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // SIGN UP SECTION PAUSED WHILE IN DEVELOPMENT

    // try {
    //   const { error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //   });

    //   if (error) {
    //     setError(error.message);
    //   } else {
    //     setSuccess('Thank you for signing up! Please check your email and spam folder for confirmation.');
    //     setEmail('');
    //     setPassword('');
    //     setConfirmPassword('');
    //   }
    // } catch (error) {
    //   setError('An unexpected error occurred');
    //   console.error('SignUp error:', error.message);
    // }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-center">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSignUp}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered w-full max-w-xs rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered w-full max-w-xs rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered w-full max-w-xs rounded-xl"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary bg-primary rounded-full text-white font-semibold mt-4"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;