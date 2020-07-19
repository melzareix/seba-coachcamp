import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Box,
  Button
} from 'grommet';
import {useParams} from 'react-router-dom';
import {axios, api} from '../../utils/api';

interface StudentInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const ManageWorkshop = () => {
  const { id } = useParams<{ id: string }>();
  const [students, setStudents] = useState<StudentInfo[]>([]);
  useEffect(() => {
    const getAttendees = async () => {
      const { data } = await axios.get(api.getAttendees(id));
      const studentData = data.data;
      if(studentData) {
        setStudents(studentData);
      }
    };
    getAttendees();
  }, [id]);
  return (
    <Box align="center"> 
      <h2>List of Attendees</h2>
      <Table style={{ width: '90%' }} >
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
                      // onClick={}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </Box>
  )
}

export default ManageWorkshop;