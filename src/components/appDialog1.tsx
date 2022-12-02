import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormInput from './FormInput'
import {
  createUser,
} from "../redux_store/user/user_action";
import { ScopedCssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import { IUser } from '../types';
import { useAppDispatch, useAppSelector } from '../redux_store/store';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
  id: string;
  avatar: string;
  name: string;
  age: number;
  birthday: Date;
}
const defaultValues = {
  id : '',
  avatar : '',
  name : '',
  age : 0,
  birthday : new Date(),
}

export const FormDialog1 = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const validionSchema = React.useMemo(() => {
    return yup.object({
      id: yup.string().required('First name is required'),
      name: yup.string().required('Last name is required'),
      avatar: yup.string().required('Last name is required'),
      age: yup.string().required('Last name is required'),
      birthday: yup.string().required('Last name is required'),
    });
  }, []);
  function handleClickOpen() {
     setOpen(true);
  };
  const AddData =(data : IUser)=>{
    dispatch(createUser(data));
    console.log(data);
    setOpen(false);
  }
  const handleClose = () => {
    
    setOpen(false);
  };
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues, resolver: yupResolver(validionSchema) });
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ margin: '5px 0 5px 5%' }}
      >
        <AddCircleIcon />
        <span style={{ marginLeft: '5px' }}>Add New</span>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Mới</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(AddData)}>
            <FormInput
              control={control}
              name="id"
              label="Id"
            />
            <FormInput
              control={control}
              name="avatar"
              label="Avatar link"
            />

            <FormInput
              control={control}
              name="name"
              label="Name"
            />
            <FormInput
              control={control}
              name="age"
              label="Age"
            />
            <FormInput
              control={control}
              name="birthday"
              label="Birth day"
            />
          <DialogActions>
            <Button type="submit" >Add</Button>
          </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}