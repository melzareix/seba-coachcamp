import React from 'react';
import { FormField, TextInput } from 'grommet';
import 'react-datepicker/dist/react-datepicker.css';
// eslint-disable-next-line import/no-cycle
import { Offering } from '../CreteWorkshop';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IProps {
  key: any;
  offeringIndex: number;
  register: (args: any) => void;
  errors: any;
  control: any;
  offering: Offering;
}

type Inputs = {
  id?: string;
  startDate: Date;
  endDate: Date;
  location: string;
  address: string;
};
const Locations = ['Munich', 'Stuttgart', 'Toronto', 'New York', 'Cairo'];

export default function OfferingItem({ key, register, errors, offeringIndex, offering }: IProps) {
  return (
    <div key={key}>
      <FormField label="StartDate">
        <TextInput
          defaultValue={offering.startDate}
          name={`offerings[${offeringIndex}].startDate`}
          placeholder="dd/mm/yyyy"
          // @ts-ignore
          ref={register({
            required: {
              value: true,
              message: 'start date is required.',
            },
            pattern: {
              value: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
              message: 'invalid date format.',
            },
          })}
        />
      </FormField>
      <div className="errors">
        {errors.offerings &&
          errors.offerings[offeringIndex].startDate &&
          errors.offerings[offeringIndex].startDate.message}
      </div>

      <FormField label="EndDate">
        <TextInput
          defaultValue={offering.endDate}
          name={`offerings[${offeringIndex}].endDate`}
          placeholder="dd/mm/yyyy"
          // @ts-ignore
          ref={register({
            required: {
              value: true,
              message: 'end date is required.',
            },
            pattern: {
              value: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
              message: 'invalid date format.',
            },
          })}
        />
      </FormField>
      <div className="errors">
        {errors.offerings &&
          errors.offerings[offeringIndex].endDate &&
          errors.offerings[offeringIndex].endDate.message}
      </div>

      <FormField label="Location">
        <select
          name={`offerings[${offeringIndex}].location`}
          // @ts-ignore
          ref={register({ required: { value: true, message: 'location is required.' } })}
        >
          {Locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </FormField>
      <div className="errors">
        {errors.offerings &&
          errors.offerings[offeringIndex].location &&
          errors.offerings[offeringIndex].location.message}
      </div>

      <FormField label="Address">
        <TextInput
          defaultValue={offering.address}
          name={`offerings[${offeringIndex}].address`}
          placeholder="22 example st."
          // @ts-ignore
          ref={register({ required: { value: true, message: 'address is required.' } })}
        />
      </FormField>
      <div className="errors">
        {errors.offerings &&
          errors.offerings[offeringIndex].address &&
          errors.offerings[offeringIndex].address.message}
      </div>
    </div>
  );
}
