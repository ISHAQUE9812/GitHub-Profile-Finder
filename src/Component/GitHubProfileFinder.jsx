import React, { useState } from "react";

const GitHubProfileFinder = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [err, setErr] = useState("");
  const fetchGitUser = async  () => {
    if (!username.trim()) {
      setErr(`Please enter a GitHub username.`);
      return;
    }
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setErr(err.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-medium mb-4 ">🔍 GitHub Profile Finder</h2>
      <div>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="w-56 border border-black px-2 py-1 rounded-md ml-20"
        />
        <button
          onClick={fetchGitUser}
          className="px-3 py-2 bg-blue-500 rounded-md ml-4 text-white"
        >
          Search
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center mt-6">
        {userData && (
          <div className="">
            <img src={userData.avatar_url} alt="" className="w-10 h-10 rounded-full mx-auto "/>
             <h2 className="text-xl font-bold">{userData.name}</h2>
             <h3 className="text-gray-600">@{userData.login}</h3>
             <p className="text-sm mt-2">{userData.bio}</p>
             <p className="mt-2 text-gray-500">
            📍 {userData.location || "Unknown"} </p>
            <div className="flex justify-around mt-4 text-sm text-gray-700">
               <span>👥 {userData.followers} Followers</span>
               <span>📦 {userData.public_repos} Repos</span>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default GitHubProfileFinder;
