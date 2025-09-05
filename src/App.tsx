import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = (username: string) => {
    setUser({ username });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <LoginForm 
      onLogin={handleLogin}
      isSignUp={isSignUp}
      onToggleMode={() => setIsSignUp(!isSignUp)}
    />
  );
}

export default App;
