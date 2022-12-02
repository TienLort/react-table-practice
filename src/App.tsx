import React, { useEffect, useState } from 'react';
import { LoadingButton } from "@mui/lab";
import ReactTable from "react-table";
import useGetStatus from "./hooks/useGetStatus";
import './App.css';
import { IUser } from './types';
import ResponsiveAppBar from './components/appBar';
import { FormDialog } from './components/appDialog';
import { FormDialog1 } from './components/appDialog1';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {
  createUser,
  getUsers,
  deleteUser,
  getUserById,
} from "./redux_store/user/user_action";
import { resetState } from "./redux_store/user/user_slice";
import { useAppDispatch, useAppSelector } from "./redux_store/store";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtual } from 'react-virtual'
import Button from '@mui/material/Button';
// import 'react-table/react-table.css'

function App() {
  const { data, data1,data2 } = useAppSelector((state) => state.user);
  console.log(data2)
  const [loading, error] = useGetStatus("getUsers");
  const [loadingCreate, errorCreate] = useGetStatus("createUser");
  const dispatch = useAppDispatch();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    await dispatch(getUsers(value));
    setPage(value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getUsers(1));
  }, [])
  const columns = React.useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'avatar',
        header: () => 'Avatar',
        cell: info => (
          <img src={String(info.getValue())} alt="" />
        ),
      },
      {
        accessorKey: 'name',
        header: () => 'Name',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'birthday',
        header: 'Birth Day',
        cell: info => info.getValue<Date>().toLocaleString().slice(0, 10)
      },
      {
        accessorKey: 'id',
        header: 'Delete',
        cell: info => (
          <div>
            <Button variant="contained" color="error" onClick={async () => {
              await dispatch(deleteUser(String(info.getValue())));
              await dispatch(getUsers(1));
            }}>
              <DeleteForeverIcon />
              Delete
            </Button>
          </div>

        ),
      },
      {
        accessorKey: 'id',
        header: 'Edit',
        cell: info => (
          <div>
            <FormDialog id_user={String(info.getValue())} />
          </div>

        ),
      }
    ],
    []
  )

  const table = useReactTable({
    data:data2.data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <div className="wrap" style={{ width: '100%' }}>
      <ResponsiveAppBar />
      <div style={{ margin: 'auto', marginTop: "5%" }}>
        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>
            Co loi thu lai{" "}
            <button onClick={() => dispatch(getUsers(1))}>Thu lai</button>
          </span>
        ) : (
          <div className="">
            <div ref={tableContainerRef} className="container">
              <div>
                <FormDialog1 />
              </div>
              <table style={{ width: "90%", margin: '0 auto' }}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => {
                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            style={{ width: header.getSize() }}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
                                    : '',
                                  onClick: header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: ' 🔼',
                                  desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ?? null}
                              </div>
                            )}
                          </th>
                        )
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {paddingTop > 0 && (
                    <tr>
                      <td style={{ height: `${paddingTop}px` }} />
                    </tr>
                  )}
                  {virtualRows.map(virtualRow => {
                    const row = rows[virtualRow.index] as Row<IUser>
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => {
                          return (
                            <td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  {paddingBottom > 0 && (
                    <tr>
                      <td style={{ height: `${paddingBottom}px` }} />
                    </tr>
                  )}
                </tbody>
              </table>
              <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination count={Math.ceil(data2.total/data2.limit)} page={page} onChange={handleChange} sx={{padding: '0px 40% 20px'}}/>
              </Stack>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
