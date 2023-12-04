import { useState } from "react";

export function useAxios(callback: (...args: any[]) => Promise<void>){
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  async function fetch(...args: any[]) {
    try {
      setIsLoading(true);
      await callback(args);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }
  return [fetch, isLoading, error];
}
