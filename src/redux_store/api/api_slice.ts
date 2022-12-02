import { createSlice } from "@reduxjs/toolkit";

interface IState {
  api: {
    [x: string]: {
      loading: boolean;
      error: boolean;
    };
  };
}

const initialState: IState = {
  api: {},
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return action.type.endsWith("/pending");
      },
      (state, action) => {
        const actionName = action.type.split("/")[1];
        state.api = {
          ...state.api,
          [actionName]: {
            loading: true,
            error: false,
          },
        };
      }
    );

    builder.addMatcher(
      (action) => {
        return action.type.endsWith("/fulfilled");
      },
      (state, action) => {
        const actionName = action.type.split("/")[1];
        state.api = {
          ...state.api,
          [actionName]: {
            loading: false,
            error: false,
          },
        };
      }
    );

    builder.addMatcher(
      (action) => {
        return action.type.endsWith("/rejected");
      },
      (state, action) => {
        const actionName = action.type.split("/")[1];
        state.api = {
          ...state.api,
          [actionName]: {
            loading: false,
            error: true,
          },
        };
      }
    );
  },
});

export const {} = apiSlice.actions;

export default apiSlice.reducer;
