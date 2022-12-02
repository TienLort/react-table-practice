import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  getUserById,
  getUsers,
  editUserById
} from "../redux_store/user/user_action";
import Box from '@mui/material/Box';
import { IUser } from '../types';
import { useAppDispatch, useAppSelector } from '../redux_store/store';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from './FormInput';

interface Props {
  id_user: string;
}
interface IFormInput {
  id: string;
  avatar: string;
  name: string;
  age: number;
  birthday: Date;
}


export const FormDialog: React.FC<Props> = ({ id_user }) => {
  const { data, data1 } = useAppSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const validationSchema = React.useMemo(() => {
    return yup.object({
      id: yup.string().required('First name is required'),
      name: yup.string().required('Last name is required'),
      avatar: yup.string().required('Last name is required'),
      age: yup.string().required('Last name is required'),
      birthday: yup.string().required('Last name is required'),
    });
  }, []);
  React.useEffect(() => {
    reset(data1);
  }, [data1])
  function handleClickOpen() {
    dispatch(getUserById(id_user));
    setOpen(true);
  };
  const addData = async (data: IUser) => {
    await dispatch(editUserById({ id: data.id, data }));
    dispatch(getUsers(1));
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: data1, resolver: yupResolver(validationSchema) });
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        <BorderColorIcon />
        <span style={{ fontSize: '14px' }}>Edit</span>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(addData)}>
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
              <Button type="submit" >Edit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}