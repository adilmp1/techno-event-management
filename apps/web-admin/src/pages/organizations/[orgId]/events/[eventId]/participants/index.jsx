import { useRouter } from 'next/router';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material';
import { BsArrowLeft } from 'react-icons/bs';
import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  TableContainer,
  Text,
  Button,
} from '@chakra-ui/react';

import { useFetch } from '@/hooks/useFetch';

import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect, useState } from 'react';
const MuiTheme = createTheme({});
export default function Events() {
  const router = useRouter();

  const { orgId, eventId } = router.query;

  const { loading, get } = useFetch();

  const [participants, setParticipants] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
  ];
  const handleClick = () => {
    router.push(`/organizations/${orgId}/events/${eventId}/participants/new/`);
  };

  const handleClick1 = () => {
    router.push(`/organizations/${orgId}/events/${eventId}/participants/new/upload-csv`);
  };

  const handleRowClick = (row) => {
    router.push(`/organizations/${orgId}/events/${eventId}/participants/${row.id}`);
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants`,
      );
      setParticipants(data.participants || []);
      console.log(data);
    };
    fetchParticipants();
  }, [orgId, eventId]);
  const iconStyle = {
    fontSize: '45px', // Adjust the size as needed
    marginTop: '8px',
  };
  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        <Box width="100%" p={8} display="flex" justifyContent="space-between">
          <button onClick={() => router.push(`/organizations/${orgId}/events/${eventId}`)}>
            <BsArrowLeft style={iconStyle} />
          </button>
          <Text fontSize="4xl" fontWeight="bold">
            Participants
          </Text>
          <Box display="flex" gap={4}>
            <Button
              padding="4"
              minWidth="-moz-initial"
              bgColor="rgb(128, 90, 213)"
              color="white"
              _hover={{ bgColor: 'rgb(100, 70, 183)' }}
              onClick={handleClick}
            >
              Add Participant
            </Button>
            <Button
              padding="4"
              minWidth="-moz-initial"
              bgColor="rgb(128, 90, 213)"
              color="white"
              _hover={{ bgColor: 'rgb(100, 70, 183)' }}
              onClick={handleClick1}
            >
              Upload CSV
            </Button>
          </Box>
        </Box>
        <Box width="100%" height="100%">
          <ThemeProvider theme={MuiTheme}>
            <DataGrid
              rows={participants}
              columns={columns}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              autoHeight
              getRowId={(row) => row.id}
              sx={{
                // disable cell selection style
                '.MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                // pointer cursor on ALL rows
                '& .MuiDataGrid-row:hover': {
                  cursor: 'pointer',
                },
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              onRowClick={handleRowClick}
            />
          </ThemeProvider>
        </Box>
        {/* <Box width="100%" height="100%">
          <TableContainer width="100%" height="100%">
            <Table variant="simple">
              <TableCaption>Participants</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {participants.map((participant) => (
                  <Tr
                    key={participant?.id}
                    onClick={() => {
                      router.push(
                        `/organizations/${orgId}/events/${eventId}/participants/${participant?.id}`,
                      );
                    }}
                    cursor="pointer"
                  >
                    <Td>{participant?.id}</Td>
                    <Td>{participant?.firstName}</Td>
                    <Td>{participant?.lastName}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{participants.length} participants</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box> */}
      </Flex>
    </DashboardLayout>
  );
}
