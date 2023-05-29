import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, loadUsers, getUsersdata, searchUsers  } from '../redux/action';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const Data = () => { 

  const [sortedUsers, setSortedUsers] = useState([]);

    let dispatch = useDispatch();
    const { users }  = useSelector((state) => state.data);

    const usersPerPage = 5; // Number of users to be displayed per page
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const totalPages = Math.ceil(users.length / usersPerPage);


const startIndex = (currentPage - 1) * usersPerPage;
const endIndex = startIndex + usersPerPage;
// const usersToDisplay = sortedUsers.length > 0 ? sortedUsers.slice(startIndex, endIndex) : users.slice(startIndex, endIndex);
const usersToDisplay = sortedUsers.length > 0 ? sortedUsers.slice(startIndex, endIndex) : users.slice(startIndex, endIndex);


      const handledelete = (id) => {
        if(window.confirm("Are you sure wanted to delete the user...")) {
            dispatch(deleteUser(id))
        }
      }
      const navigation = useNavigate();

      
      useEffect(() => {
        dispatch(loadUsers());
        dispatch(getUsersdata());
      }, []);

  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">First-Name</StyledTableCell>
            <StyledTableCell align="center">Last-Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>

          </TableRow>
        </TableHead>
      <TableBody>
  {usersToDisplay.map((user) => (
    <StyledTableRow key={user.id}>
      <StyledTableCell align="center">{user.fname}</StyledTableCell>
      <StyledTableCell align="center">{user.lname}</StyledTableCell>
      <StyledTableCell align="center">{user.status}</StyledTableCell>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button color="secondary" onClick={ () => handledelete(user.id)}>Delete</Button>
        <Button color="primary" onClick={() => { navigation(`/edituser/${user.id}`) }}>Edit</Button>
      </ButtonGroup>
    </StyledTableRow>
  ))}
</TableBody>
      </Table>
      </TableContainer>
    <Stack spacing={2}>
      <Pagination count={totalPages} color="primary" onChange={(event, value) => setCurrentPage(value)} />
    </Stack>
    </div>
  )
}

export default Data

