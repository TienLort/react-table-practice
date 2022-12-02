import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../client/userApi";
import { IUser,IGetUser } from "../../types";

export const getUsers = createAsyncThunk<IGetUser, number>(
  "user/getUsers",
  async (value, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers(value);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk<IUser, IUser>(
  "user/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.createUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk<IUser, string>(
  "user/deleteUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.deleteUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserById = createAsyncThunk<IUser, string>(
  "user/getUsersById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserById(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editUserById = createAsyncThunk<IUser, {
  id: string,
  data:IUser,
}>(
  "user/editUserById",
  async ({id, data}, { rejectWithValue }) => {
    try {
      const response = await userApi.editUserById(id,data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);