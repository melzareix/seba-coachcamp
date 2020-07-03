import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Box,Nav, Heading, Grid ,Button} from 'grommet';
import WorkshopCard from '../common/workshopCard';
import * as Icons from 'grommet-icons';


export default function WorkshopsList() {
  const [workshops, setWorkshops] = useState([{
    gallery:"",
    name:"",
    description:""
  }]);
  const[pageNumber,setPageNumber]=useState(1);
  const[maxPage,setMaxPage]=useState(1);
  const pageLimit = 2;

  useEffect(() => {
    const fetchData = async () => {
      const allWorkshops = await axios.get('http://localhost:3000/workshops');
      const skip = (pageNumber-1)*pageLimit;
      setMaxPage(Math.ceil(allWorkshops.data.data.length/pageLimit));
      const paginatedWorkshops = await axios.get('http://localhost:3000/workshops/paginated/'+skip+'/'+pageLimit);
      setWorkshops(paginatedWorkshops.data.data);
    };
    fetchData();
  }, []);

 async function  changePageNumber(newPageNum: number){
    if(newPageNum>=1){
    const skip = (newPageNum-1)*pageLimit;
    const result = await axios.get('http://localhost:3000/workshops/paginated/'+skip+'/'+pageLimit);
    setWorkshops(result.data.data);
    setPageNumber(newPageNum);
    }
   return;
  }

  return (

    <Box justify="center" width="full">
      <Nav direction="row"  margin="1" justify="center"  background="transparent">
        <Button icon={<Icons.CaretPrevious />}disabled={pageNumber==1} label="Previous" size="small" margin="large" hoverIndicator onClick={()=>changePageNumber(pageNumber-1)}/>
      <Heading textAlign="center" style={{ maxWidth: '100%' }}>
        Workshops
      </Heading>
      <Button label="Next"icon={<Icons.CaretNext />}disabled={pageNumber>=maxPage}size="small" margin="large" onClick={()=>changePageNumber(pageNumber+1)} hoverIndicator />
      </Nav>
      <Grid rows="small" columns="medium" gap="large" pad="large">

      {workshops.map((workshop) => {
          return (
            <WorkshopCard
              image={`${workshop.gallery[0]}`}
              title={`${workshop.name}`}
              subtitle={`${workshop.description}`}
            rating={5} //J-TODO : Get rating reviews later on 
            />
          );
        })}
      </Grid>
      {workshops.length === 0 && (
        <Heading textAlign="center" style={{ maxWidth: '100%' }}>
          Loading...
        </Heading>
      )}
      </Box>
  );
}
