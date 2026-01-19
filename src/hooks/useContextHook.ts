import { useContext } from "react";
import { MainContext } from "../context/MainContext";

function useContextHook() {
  const contextHook = useContext(MainContext);

  return contextHook;
}

export default useContextHook;
