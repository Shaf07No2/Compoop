// notificationsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  firstName: string;
  lastName: string;
  profilePic: string;
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [] as Notification[],
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      return action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload);
    },
  },
});

export const { setNotifications, addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
