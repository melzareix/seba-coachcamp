import { Notification } from 'grommet-controls';
import React from 'react';

export default function ErrorBox(props: any) {
  return <Notification align="center" message={props.text} status="error" size="small" />;
}
