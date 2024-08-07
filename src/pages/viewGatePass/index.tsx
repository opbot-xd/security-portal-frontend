import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface Entry {
    name: string;
    phone: string;
    id: string;
}

const DataTable: React.FC = () => {
    const [data, setData] = useState<Entry[]>([]);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: Entry[]) => setData(data))
            .catch((error) => {
                console.error('Error fetching data:', error);
                setMessage('Error fetching data');
            });
    }, []);

    const handleCheckboxChange = (index: number) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(index)
                ? prevSelectedRows.filter((i) => i !== index)
                : [...prevSelectedRows, index]
        );
    };

    const handleAccept = () => {
        const acceptedNames = selectedRows.map((index) => data[index].name).join(', ');
        setMessage(`Accepted entries: ${acceptedNames}`);
        setSelectedRows([]);
    };

    const handleReject = () => {
        const rejectedNames = selectedRows.map((index) => data[index].name).join(', ');
        setMessage(`Rejected entries: ${rejectedNames}`);
        setSelectedRows([]);
    };

    return (
        <div className="flex bg-slate-900 min-h-screen flex-col justify-center items-center">
            {selectedRows.length > 0 && (
                <div className="flex mb-4">
                    <Button variant="contained" color="success" onClick={handleAccept} style={{ marginRight: 8 }}>
                        Accept Selected
                    </Button>
                    <Button variant="contained" color="error" onClick={handleReject}>
                        Reject Selected
                    </Button>
                </div>
            )}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>ID Number</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows.includes(index)}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                </TableCell>
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.phone}</TableCell>
                                <TableCell>{entry.id}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="success" onClick={() => setMessage(`Accepted entry: ${entry.name}`)}>
                                        Accept
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => setMessage(`Rejected entry: ${entry.name}`)} style={{ marginLeft: 8 }}>
                                        Reject
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {message && (
                <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
                    <Alert variant="filled" severity="info">{message}</Alert>
                </Stack>
            )}
        </div>
    );
};

export default DataTable;
