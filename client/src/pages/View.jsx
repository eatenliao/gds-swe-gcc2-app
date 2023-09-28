import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import DataTable from "../components/dataTable";
import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const View = () => {
  // firstly, get the data from the backend
  const [data, setData] = useState([]);
  const columnHelper = createColumnHelper();

  useEffect(() => {
    // add CORS header to the request
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios
      .get(`${BASE_URL}/api/getResponses`)
      .then((res) => {
        console.log(res);
        console.log(res.data.rows);
        setData(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    columnHelper.accessor("name", {
      cell: (props) => props.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("temperature", {
      cell: (props) => props.getValue(),
      header: "Temperature",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("question1", {
      cell: (props) => props.getValue(),
      header: "Question 1",
    }),
    columnHelper.accessor("question2", {
      cell: (props) => props.getValue(),
      header: "Question 2",
    }),
  ];

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <Flex mb={4} justify="center">
          <Text fontSize="3xl" mb={4}>
            Responses
          </Text>
        </Flex>
        
        <Text fontSize="m" mb={4} ml={4}>
        Question 1: Do you have any of the following symptoms now or
          within the last 14 days: Cough, smell/test impairment, fever,
          breathing difficulties, body aches, headaches, fatigue, sore throat,
          diarrhea, runny nose (even if your symptoms are mild)?
        </Text>
        <Text fontSize="m" mb={4} ml={4}>
        Question 2: Have you been in contact with anyone who is suspected to have/has been diagnosed with Covid-19 within the last 14 days?
        </Text>
        <Text fontSize="l" mb={4} ml={4} fontWeight="bold" color="red.500">
        <Text fontSize="xl" as="span">Note: </Text>Question 1 and Question 2 are answered with "Yes" or "No".
        </Text>
        <DataTable columns={columns} data={data} />
      </Box>
    </Flex>
  );
};

export default View;
