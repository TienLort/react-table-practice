import { useAppSelector } from "../redux_store/store";

const useGetStatus = (actionName: string) => {
  const { api } = useAppSelector((state) => state.api);

  return [
    Boolean(api?.[actionName]?.loading),
    Boolean(api?.[actionName]?.error),
  ];
};

export default useGetStatus;
