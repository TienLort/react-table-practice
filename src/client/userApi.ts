import { instance } from ".";
import { IUser,IGetUser } from "../types";

export const userApi = {
  getUsers: (value: number) => {
    return instance.get<IGetUser>("/user",{params: {page:value}});
  },
  // getUsers: (id: string) => {
  //   return instance.get<IUser[]>(`/user?search=${id}`);
  // },

  createUser: (data: IUser) => {
    return instance.post<IUser>("/user", data);
  },
  deleteUser: (id: string) => {
    return instance.delete<IUser>(`/user/${id}`);
  },
  getUserById: (id: string) => {
    return instance.get<IUser>(`/user/${id}`);
  },
  editUserById: (id: string,data:IUser) => {
    return instance.put<IUser>(`/user/${id}`, data);
  },
};
