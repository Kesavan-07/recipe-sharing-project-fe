import React from "react";

const Home = () => {
  return (
    <div className="max-w-xs mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Home</h2>
      <p>Welcome to the Recipe Sharing Platform!</p>
      <ul className="list-disc pl-5">
        <li>Click on the links above to register or login</li>
        <li>After logging in, you will be redirected to your dashboard</li>
        <li>You can then explore, share, and save recipes</li>
      </ul>
    </div>
  );
};

export default Home;
