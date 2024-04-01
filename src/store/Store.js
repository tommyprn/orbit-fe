import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'src/reducers/userReducer';
import reportReducer from 'src/reducers/reportReducer';
import formLEDReducer from 'src/reducers/formLEDReducers';
import CustomizerReducer from './customizer/CustomizerSlice';
import masterDataReducer from 'src/reducers/masterDataReducer';

export const store = configureStore({
  reducer: {
    LED: formLEDReducer,
    user: userReducer,
    report: reportReducer,
    customizer: CustomizerReducer,
    masterData: masterDataReducer,
  },
});

export default store;
