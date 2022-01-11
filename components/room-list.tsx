import React from 'react';
import Room, { RoomType } from './room';
import { Grid, Typography, Container } from '@mui/material';

export type RoomListType = Array<RoomType>;

type Props = {
  rooms?: RoomListType;
  onAlarmDeactivated: () => void;
};

export default function RoomList(props: Props) {
  const { rooms } = props;

  if (rooms != null) {
    return (
      <Grid
        container={true}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {props.rooms?.map((r, index) => (
          <Grid item={true} xs={2} sm={4} md={4} key={index}>
            <Room room={r} onAlarmDeactivated={props.onAlarmDeactivated} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <Container>
        <Typography
          variant="h4"
          component="h4"
          gutterBottom={true}
          align={'center'}
          color={'secondary'}
        >
          Rooms unavailable
        </Typography>
      </Container>
    );
  }
}
