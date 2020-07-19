import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow, Box, Button, Heading } from 'grommet';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorBox from '../common/error';
import { axios, api } from '../../utils/api';

interface StudentInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bookingId: string;
}

const ManageWorkshop = () => {
  const { id } = useParams<{ id: string }>();
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const getAttendees = async () => {
      const { data } = await axios.get(api.getAttendees(id));
      const studentData = data.data;
      if (studentData) {
        setStudents(studentData);
      }
    };
    getAttendees();
  }, [id]);

  const removeAttendee = async (bookingId: string) => {
    try {
      setApiError(null);
      await axios.delete(api.removeAttendee(id, bookingId));
      toast.success('Attendee Removed');
      setStudents(students.filter((student) => student.bookingId !== bookingId));
    } catch (error) {
      setApiError(error.response.data?.message);
    }
  };

  return (
    <Box align="center" className="full-height">
      {apiError && <ErrorBox text={apiError} />}
      <h2>List of Attendees</h2>
      <Table style={{ width: '90%' }}>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom" align="center">
              First Name
            </TableCell>
            <TableCell scope="col" border="bottom" align="center">
              Last Name
            </TableCell>
            <TableCell scope="col" border="bottom" align="center">
              Email
            </TableCell>
            <TableCell scope="col" border="bottom" align="center">
              Phone number
            </TableCell>
            <TableCell scope="col" border="bottom" align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student: StudentInfo) => {
            return (
              <TableRow>
                <TableCell scope="row" align="center">
                  <strong>{student.firstName}</strong>
                </TableCell>
                <TableCell scope="row" align="center">
                  <strong>{student.lastName}</strong>
                </TableCell>
                <TableCell scope="row" align="center">
                  <strong>{student.email}</strong>
                </TableCell>
                <TableCell scope="row" align="center">
                  <strong>{student.phoneNumber}</strong>
                </TableCell>
                <TableCell>
                  <Box direction="row" gap="medium" justify="center">
                    <Button
                      primary
                      label="Remove"
                      onClick={async () => {
                        await removeAttendee(student.bookingId);
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {students.length === 0 && <Heading>No one registered for this workshop yet</Heading>}
    </Box>
  );
};

export default ManageWorkshop;
