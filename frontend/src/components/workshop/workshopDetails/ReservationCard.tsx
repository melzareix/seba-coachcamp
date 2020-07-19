import React, { useState } from 'react';
import {Box, Text, Calendar, Button} from 'grommet';
import moment from 'moment';
import { Offering } from './types';

const getISODate = (date: Date) => new Date(date).toISOString()

const generateDisabledDates = (offerings: Offering[]) => {
  const disabledDates = [];
  for(let i=0;i<offerings.length-1;i++) {
    let currentDate = moment(offerings[i].startDate).add(1, 'days')
    const nextDate = moment(offerings[i+1].startDate)
    while(currentDate.isBefore(nextDate, 'day')) {
      disabledDates.push(currentDate.toISOString())
      currentDate = currentDate.add(1, 'days')
    }
  }
  return disabledDates;
}

interface Props {
  offerings: Offering[];
  onSubmit: (offeringId: string) => void;
}

const ReservationCard = ({offerings, onSubmit}: Props) => {
  const [currentOffering, setCurrentOffering] = useState<Offering>();

  return (
    <Box 
      pad="medium" 
      border={{ color: 'lightgray', size: 'small' }}
      align="center"
      margin={{top: "large"}}
    >
      <Box 
        pad={{bottom: "small"}}
        margin={{bottom: "medium"}}
        border={{ color: 'lightgray', size: 'small', side: 'bottom' }}
      >
        <Text>
          Make an online reservation
       </Text>
      </Box>

      {offerings.length > 0? (
        <>
          <Calendar
            size="small"
            date={offerings.length === 0?
              (new Date()).toISOString():
              getISODate(offerings[0].startDate)
            }
            bounds={offerings.length === 0?
              [(new Date()).toISOString(), (new Date()).toISOString()]:
              [getISODate(offerings[0].startDate), getISODate(offerings[offerings.length - 1].startDate)]
            }
            disabled={offerings.length === 0?[]:generateDisabledDates(offerings)}
            onSelect={(date: any) => setCurrentOffering(offerings.find(offering => offering.startDate === date))}
          />

          {currentOffering && (
            <Box 
              margin={{top: "medium"}}
              style={{width: '100%'}}
              align="center"
            >
              <Text>{`Price: ${currentOffering.price}$`}</Text>
              <Text>{`Location: ${currentOffering.location}`}</Text>
              <Button label="Book" margin={{top: "small"}} onClick={() => onSubmit(currentOffering._id)}/>
            </Box>
          )}
        </>
      ):(
        <Text margin={{horizontal:"medium"}} textAlign="center">
          Sorry, this workshop offerings are fully booked
        </Text>
      )}
    </Box>
  );
}

export default ReservationCard;