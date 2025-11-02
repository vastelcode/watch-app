import AuthForm from "./components/AuthForm";


export default function Home() {
  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-gray-500 rounded-2xl shadow-lg p-8 space-y-6">
    <div className="text-center space-y-3">
      <h1 className="text-3xl font-bold text-white">
        Welcome to Watch List
      </h1>
      <p className="text-white leading-relaxed">
        Your personal space to curate and manage a wishlist of your favourite watches.
        Sign in to create, view, edit, and delete watches from your wishlist.
      </p>
    </div>
    <div className="pt-4">
      <AuthForm/>
    </div>
  </div>
</div>
  );
}
