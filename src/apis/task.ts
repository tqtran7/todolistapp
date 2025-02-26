
// TODO: use react query to cache requests
// TODO: host should come from a config file

const host = "http://localhost:4000";

export const fetchTasks = async (): Promise<TaskProps[]> => {
  try {
    const response = await fetch(`${host}/tasks`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchTask = async (id: string): Promise<TaskProps | null> => {
  try {
    const response = await fetch(`http://localhost:4000/tasks/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch task ${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addTask = async (data: any): Promise<TaskProps | null> => {
  try {
    const { color, message } = data;
    const response = await fetch(`${host}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color, message }),
      });
    if (!response.ok) throw new Error("Failed to create task!");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTask = async (id: string, data: any): Promise<TaskProps | null> => {
  try {
    const response = await fetch(`${host}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    if (!response.ok) throw new Error(`Failed to update task ${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTask = async (id: string): Promise<TaskProps | null> => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`Failed to delete task ${id}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };