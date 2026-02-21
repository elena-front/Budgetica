import { useState, useEffect } from "react";
import AppRouter from "./app/routing/AppRouter";
import UserApi from "./entities/user/UserApi";
import type { User } from "./types/common";

// Компонент React - это функция
function App() {
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function refreshUser() {
      const response = await UserApi.refresh();
      if (response) {
        const { data, statusCode, error } = response;

        if (statusCode === 200) {
          setUser(data.user);
        } else {
          console.error(error);
        }
      }
      setUserIsLoading(false);
    }
    refreshUser();
  }, []);

  return (
    <AppRouter setUser={setUser} user={user} userIsLoading={userIsLoading} />
  );
}

export default App;
