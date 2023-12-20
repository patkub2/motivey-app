import React, { createContext, useState, useCallback } from "react";

// Define the shape of the user and task data
type Stat = {
  level: number;
  currentExp: number;
  maxExp: number;
};

type User = {
  characterLevel: number;
  maxExp: number;
  currentExp: number;
  maxHp: number;
  currentHp: number;
  maxMana: number;
  currentMana: number;
  currentArmorId: String;
  intStat: Stat;
  strStat: Stat;
  agiStat: Stat;
  vitStat: Stat;
};

type Task = {
  id: number;
  name: string;
  section: "HABITS" | "CHALLENGES" | "GOALS";
  difficultyLevel: number;
  experience: number;
  dailyExecutionCounter: number;
  completed: boolean;
  type: string;
  icon: string;
};

// Define the shape of the context data
interface GlobalContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  fetchUserData: (userToken: string) => Promise<void>;
  fetchTasks: (userToken: string) => Promise<void>;
  incrementTaskCounter: (taskId: number, userToken: string) => Promise<void>;
}

const defaultGlobalContextValue: GlobalContextType = {
  user: null,
  setUser: () => {},
  tasks: [],
  setTasks: () => {},
  fetchUserData: async () => {},
  fetchTasks: async () => {},
  incrementTaskCounter: async () => {},
};

export const GlobalContext = createContext(defaultGlobalContextValue);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchUserData = useCallback(async (userToken) => {
    try {
      const response = await fetch("http://192.168.0.115:8080/api/user", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error appropriately
    }
  }, []);

  const fetchTasks = useCallback(async (userToken) => {
    try {
      const response = await fetch("http://192.168.0.115:8080/api/tasks", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Handle error appropriately
    }
  }, []);

  const incrementTaskCounter = useCallback(
    async (taskId, userToken) => {
      try {
        const response = await fetch(
          `http://192.168.0.115:8080/api/task/${taskId}/increment-counter`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to increment counter");
        }
        // re-fetch user data or tasks if needed to update UI
        await fetchUserData(userToken);
        await fetchTasks(userToken);
      } catch (error) {
        console.error("Error incrementing counter:", error);
        // Handle error appropriately
      }
    },
    [fetchUserData, fetchTasks]
  );

  const contextValue = {
    user,
    setUser,
    tasks,
    setTasks,
    fetchUserData,
    fetchTasks,
    incrementTaskCounter,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
