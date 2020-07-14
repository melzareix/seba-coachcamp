import { Box, Button, Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, axios } from '../../utils/api';

export default function InstructorWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [workshopsUpdateDate, setWorkshopsUpdateDate] = useState(new Date());
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token') || '';
      const instructor = jwt_decode(token) as Record<string, string>;
      const instructorWorkshops = await axios.get(api.instructorWorkshops(instructor.id));
      setWorkshops(instructorWorkshops.data.data);
    };
    fetchData();
  }, [workshopsUpdateDate]);

  const deleteWorkshop = async (id: string) => {
    const token = localStorage.getItem('token') || '';
    const resp = await axios.delete(api.singleWorkshop(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setWorkshopsUpdateDate(new Date());
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Name
          </TableCell>
          <TableCell scope="col" border="bottom">
            Description
          </TableCell>
          <TableCell scope="col" border="bottom">
            Actions
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workshops.map((workshop: Record<string, string>) => {
          return (
            <TableRow>
              <TableCell scope="row">
                <strong>{workshop.name}</strong>
              </TableCell>
              <TableCell scope="row">
                <strong>{workshop.description}</strong>
              </TableCell>
              <TableCell>
                <Box direction="row" gap="medium">
                  <Button secondary label="Edit" />
                  <Button
                    primary
                    label="Delete"
                    onClick={async () => {
                      await deleteWorkshop(workshop._id);
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}