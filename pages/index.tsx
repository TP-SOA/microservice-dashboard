import { NextPage } from 'next';
import useSWR from 'swr';
import Head from 'next/head';
import React from 'react';
import RoomList from '../components/room-list';
import Url from '../constants/Url';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const { data, mutate } = useSWR(Url.server_url + '/rooms', fetcher, {
    refreshInterval: 1000,
  });
  console.log(data);

  return (
    <div>
      <Head>
        <title>Microservice Dashboard</title>
        <meta name="description" content="Boujour" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom={true}
            align={'center'}
          >
            Microservice Dashboard
          </Typography>
          <RoomList rooms={data} onAlarmDeactivated={mutate} />
        </Container>
      </main>
    </div>
  );
};

export default Home;
