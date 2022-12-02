import { createSlice, PayloadAction,current  } from "@reduxjs/toolkit";
import { IUser,IGetUser } from "../../types";
import { createUser, getUsers, deleteUser,getUserById, editUserById } from "./user_action";

interface IState {
    data: IUser[]
    data1:IUser
    data2:IGetUser
}

const initialState: IState = {
    data: [],
    data1:{
        id: "",
        avatar: '',
        name: '',
        age: 0,
        birthday: new Date()
      },
    data2:{
        data:[],
        total: 0,
        page:0,
        limit:0
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetState: (state) => {
            state.data = initialState.data;
            // state.loading = initialState.loading;
            // state.error = initialState.error;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.data2 = action.payload;
        });

        builder.addCase(createUser.fulfilled, (state, action) => {
            state.data.unshift(action.payload);
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.data.filter((user) => user.id !== action.payload.id)
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {  
            state.data1 = action.payload;
            // state.data.filter((user) =>  user.id == action.payload.id);
        });
        builder.addCase(editUserById.fulfilled, (state, action) => {  
            state.data1 = action.payload;
        });       
    },
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;