import { useEffect, useState } from 'react';
import Drawer from '@/components/ui/Drawer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses, TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

// Define the interface for the data
interface Credential {
  name: string;
  phone: string;
  idNumber: string;
  selfPhoto: string;
  document: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface DataResponse {
  creds: Credential[];
}

// Styled components
const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ApproveGatePasses() {
  const [rows, setRows] = useState<Credential[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from data.json
    axios.get<DataResponse>('/data.json')
      .then((response) => {
        setRows(response.data.creds);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleApprove = (idNumber: string) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.idNumber === idNumber ? { ...row, status: 'accepted' } : row
      )
    );
  };

  const handleReject = (idNumber: string) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.idNumber === idNumber ? { ...row, status: 'rejected' } : row
      )
    );
  };

  return (
    <div className="flex flex-col bg-slate-900 items-center h-screen">
      <div className="w-full">
        <Drawer />
      </div>
      <div className="w-full p-4 mt-16">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Id Number</StyledTableCell>
                <StyledTableCell align="right">Self Image</StyledTableCell>
                <StyledTableCell align="right">Id Image</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.idNumber}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.phone}</StyledTableCell>
                  <StyledTableCell align="right">{row.idNumber}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div className="flex justify-center items-center">
                      <img src={row.selfPhoto} alt="Self" width="50" />
                      <IconButton onClick={() => handleClickOpen(row.selfPhoto)}>
                        <VisibilityIcon />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div className="flex justify-center items-center">
                      <img src={row.document} alt="Document" width="50" />
                      <IconButton onClick={() => handleClickOpen(row.document)}>
                        <VisibilityIcon />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{
                      color: row.status === 'pending'
                        ? 'red'
                        : row.status === 'accepted'
                        ? 'blue'
                        : 'gray',
                    }}
                  >
                    {row.status}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div className="flex justify-center items-center">
                      <IconButton
                        color="success"
                        onClick={() => handleApprove(row.idNumber)}
                        disabled={row.status !== 'pending'}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleReject(row.idNumber)}
                        disabled={row.status !== 'pending'}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedImage && (
            <div className="relative">
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                className="absolute top-2 right-2"
              >
                <CloseIcon />
              </IconButton>
              <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
