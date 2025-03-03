import { useState, useEffect } from 'react';

import { useFetch } from '@/hooks/useFetch';

import {
  Button,
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Select,
} from '@chakra-ui/react';

import Scanner from '@/components/Scanner';

import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';

export default function NewOrganization() {
  const { loading, get, post } = useFetch();

  const router = useRouter();

  const { orgId, eventId } = router.query;

  const [uninterruptedScanMode, setUninterruptedScanMode] = useState(true);
  const [scanResult, setScanResult] = useState('');

  useEffect(() => {
    if (scanResult) {
      handleSubmit();
    }
  }, [scanResult]);

  const handleSubmit = async () => {
    const { data, status } = await post(
      `/core/organizations/${orgId}/events/${eventId}/participants/check-out/${scanResult}`,
      {},
      {
        checkedInAt: new Date().toISOString(),
      },
    );
    if (status === 200) {
      if (uninterruptedScanMode) {
        console.log(data.participant.firstname, status);
        alert('Participant checked out successfully');
        setScanResult('');
      } else {
        router.push(`/organizations/${orgId}/events/${eventId}/participants/${scanResult}`);
      }
    } else {
      alert(data.error);
    }
  };

  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold">
            Check In Participant
          </Text>
        </Box>
        <Card width="100%" maxWidth="400px" height="auto">
          <CardBody width="full">
            <Scanner result={scanResult} setResult={setScanResult} />
            <Text>{JSON.stringify(scanResult)}</Text>
          </CardBody>
        </Card>
      </Flex>
    </DashboardLayout>
  );
}
