import LoginForm from './loginForm';

export default function LoginPage() {


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900">

      <div className="absolute w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full -top-10 -left-20"></div>
      <div className="absolute w-80 h-80 bg-green-700 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>
    
        <LoginForm  />

    </div>

  );
}