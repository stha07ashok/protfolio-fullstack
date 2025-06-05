import React from "react";

const AdminPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1
        className="text-5xl font-extrabold mb-6 animate-fadeInDown"
        style={{ animationDuration: "1s" }}
      >
        Welcome Ashok.
      </h1>
      <p
        className="text-xl max-w-xl text-center opacity-90 animate-fadeInUp"
        style={{ animationDuration: "1.5s" }}
      >
        Manage your portfolio content here with ease and efficiency.
      </p>
    </main>
  );
};

export default AdminPage;
