import React from "react";

const Home = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: 'url("/public/Images/home.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center text-black p-8">
        <h2 className="text-5xl mb-4">Home</h2>
        <p className="text-3xl mb-6">Welcome to the Recipe Sharing Platform!</p>
        <ul className="list-disc pl-5 text-3xl">
          <li>Click on the link above to register or login</li>
          <li>After logging in, you will be redirected to your dashboard</li>
          <li>You can then explore, share, and save recipes</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
