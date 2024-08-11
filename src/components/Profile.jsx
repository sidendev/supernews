import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import supabase from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else if (data) {
      setUsername(data.username || 'User');
      setAvatarUrl(data.avatar_url || '');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, username, avatar_url: avatarUrl });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Profile updated successfully');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Update profile error:', error.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Password updated successfully');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Update password error:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        setUser(null);
        console.log('User logged out');
        navigate('/');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Sign out error:', error.message);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (newEmail !== confirmNewEmail) {
      setError('Email addresses do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Email update request sent. Please check your new email for confirmation.');
        setNewEmail('');
        setConfirmNewEmail('');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Update email error:', error.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="flex flex-col items-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full" />
            ) : (
              <FaUserCircle className="text-gray-500 text-9xl" />
            )}
            <h2 className="card-title text-center mt-4">{username}</h2>
            <p className="text-center">{user?.email}</p>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleUpdateProfile}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs rounded-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Avatar URL</span>
              </label>
              <input
                type="url"
                placeholder="Avatar URL"
                className="input input-bordered w-full max-w-xs rounded-xl"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-secondary bg-primary rounded-full text-white font-semibold mt-4">
              Save Profile
            </button>
          </form>
          <form onSubmit={handleUpdateEmail}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">New Email</span>
              </label>
              <input
                type="email"
                placeholder="New email"
                className="input input-bordered w-full max-w-xs rounded-xl"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirm New Email</span>
              </label>
              <input
                type="email"
                placeholder="Confirm new email"
                className="input input-bordered w-full max-w-xs rounded-xl"
                value={confirmNewEmail}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-secondary bg-primary rounded-full text-white font-semibold mt-4">
              Update Email
            </button>
          </form>
          <form onSubmit={handleUpdatePassword}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                placeholder="New password"
                className="input input-bordered w-full max-w-xs rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered w-full max-w-xs rounded-xl"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-secondary bg-primary rounded-full text-white font-semibold mt-4">
              Update Password
            </button>
          </form>
          <button onClick={handleSignOut} className="btn btn-secondary bg-primary rounded-full text-white font-semibold mt-4">
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
