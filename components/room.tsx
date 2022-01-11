import React, { useEffect, useRef, useState } from 'react';
import Url from '../constants/Url';
import {
  Card,
  CardActions,
  Button,
  CardContent,
  Typography,
  createTheme,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import LightIcon from '@mui/icons-material/Light';
import LightOutlinedIcon from '@mui/icons-material/LightOutlined';
import DoorUnlockedIcon from '@mui/icons-material/MeetingRoom';
import DoorLockedIcon from '@mui/icons-material/DoorFront';
import PresenceOnIcon from '@mui/icons-material/Visibility';
import PresenceOffIcon from '@mui/icons-material/VisibilityOutlined';

export type RoomType = {
  id: string;
  lightEnabled: boolean;
  alarmEnabled: boolean;
  doorLocked: boolean;
  presenceDetected: boolean;
};

type Props = {
  room: RoomType;
  onAlarmDeactivated: () => void;
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Room(props: Props) {
  const { room } = props;
  const iconSize = 40;
  const defaultTheme = useTheme();
  const [alarmLight, setAlarmLight] = useState(false);
  const timerRef = useRef<number>();
  useEffect(() => {
    clearTimeout(timerRef.current);
    if (room.alarmEnabled) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      timerRef.current = setTimeout(() => {
        setAlarmLight(!alarmLight);
      }, 500);
    } else {
      setAlarmLight(false);
    }
  }, [room, alarmLight]);

  const getLightIcon = () => {
    if (room.lightEnabled) {
      return <LightIcon color="primary" sx={{ fontSize: iconSize }} />;
    } else {
      return <LightOutlinedIcon color="disabled" sx={{ fontSize: iconSize }} />;
    }
  };

  const getDoorIcon = () => {
    if (room.doorLocked) {
      return <DoorLockedIcon sx={{ fontSize: iconSize, color: 'red' }} />;
    } else {
      return <DoorUnlockedIcon color="disabled" sx={{ fontSize: iconSize }} />;
    }
  };

  const getPresenceIcon = () => {
    if (room.presenceDetected) {
      return <PresenceOnIcon color="primary" sx={{ fontSize: iconSize }} />;
    } else {
      return <PresenceOffIcon color="disabled" sx={{ fontSize: iconSize }} />;
    }
  };

  const theme = room.lightEnabled ? defaultTheme : darkTheme;

  return (
    <ThemeProvider theme={alarmLight ? defaultTheme : theme}>
      <Card sx={alarmLight ? { backgroundColor: '#fd6060' } : undefined}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Room #{room.id}
          </Typography>
          {getLightIcon()}
          {getDoorIcon()}
          {getPresenceIcon()}
        </CardContent>
        <CardActions>
          <Button
            size={'small'}
            color={'primary'}
            disabled={!room.alarmEnabled}
            onClick={() => {
              fetch(Url.server_url + '/alarms/' + room.id, {
                method: 'POST',
                body: JSON.stringify({ enabled: false }),
              })
                .then((res) => {
                  if (res.ok) {
                    alert('Alarm deactivated');
                    props.onAlarmDeactivated();
                  } else {
                    alert('Could not deactivate alarm:\nStatus ' + res.status);
                  }
                })
                .catch(() => {
                  alert('Could not deactivate alarm:\nCould not reach host');
                });
            }}
          >
            {room.alarmEnabled ? (
              <AlarmOnIcon sx={{ mr: 1 }} />
            ) : (
              <AlarmOffIcon sx={{ mr: 1 }} />
            )}
            {room.alarmEnabled ? 'Disable alarm' : 'Alarm disabled'}
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
