import React from "react";
import { Formik, Field, useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  //   RadioGroup,
  Radio,
  Stack,
  useToast
} from "@chakra-ui/react";
import RadioGroup from "../components/radioGroup";
import axios from "axios";
// require('dotenv').config( {path: '../.env'} );
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Form = () => {
  const toast = useToast();
  const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    }
    };
  
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={96}>
        <Formik
          initialValues={{
            name: "", // Name of the person
            temperature: "", // Temperature of the person in Celsius
            question1: "", // Do you have any of the following symptoms now or within the last 14 days:  Cough, smell/test impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea, runny nose(even if your symptoms are mild)?
            question2: "", // Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?
          }}
          onSubmit={(values) => {
            // send data to backend
            axios
              .post(`${BASE_URL}/api/postResponse`, values, config)
              .then((res) => {
                console.log(res);
                console.log(res.data);
                // alert("Form submitted successfully!");
                toast({
                  title: "Form submitted successfully!",
                  status: "success",
                  isClosable: true,
                  position: "top",
                  duration: 3000,
                });
              })
              .catch((err) => {
                console.log(err);
                // alert("Error submitting form!");
                toast({
                  title: "Error submitting form!",
                  status: "error",
                  isClosable: true,
                  position: "top",
                  duration: 3000,
                });
              });
            // reset form
            values.name = "";
            values.temperature = "";
            values.question1 = "";
            values.question2 = "";
            
            // sleep for 1.5 seconds to allow time for the form to reset
            setTimeout(() => {
              window.location.reload(); 
            }, 1500);

          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.name && touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    variant="filled"
                    placeholder="eg. John Doe"
                    validate={(value) => {
                      let error;
                      if (!value) {
                        error = "Name is required";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.temperature && touched.temperature}
                >
                  <FormLabel htmlFor="temperature">Temperature (°C)</FormLabel>
                  <Field
                    as={Input}
                    id="temperature"
                    name="temperature"
                    variant="filled"
                    placeholder="eg. 36.5"
                    validate={(value) => {
                      let error;
                      if (!value) {
                        error = "Temperature is required";
                      } else if (isNaN(value)) {
                        error = "Temperature must be a number";
                      } else if (value < 35 || value > 42) {
                        error = "Temperature must be between 35 and 42";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.temperature}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.question1 && touched.question1}>
                  <FormLabel htmlFor="question1">
                    Do you have any of the following symptoms now or within the
                    last 14 days: Cough, smell/test impairment, fever, breathing
                    difficulties, body aches, headaches, fatigue, sore throat,
                    diarrhea, runny nose (even if your symptoms are mild)?
                  </FormLabel>
                  {/* Radio Button YES/NO for question 1 */}
                  <Field as={RadioGroup} name="question1" id="question1" validate={(value) => {
                      let error;
                      if (!value) {
                        error = "Please select an option";
                      }
                      return error;
                    }
                  }>
                    <Stack direction="row">
                      <Radio value="true">Yes</Radio>
                      <Radio value="false">No</Radio>
                    </Stack>
                  </Field>
                  <FormErrorMessage>{errors.question1}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.question2 && touched.question2}>
                  <FormLabel htmlFor="question2">
                    Have you been in contact with anyone who is suspected to
                    have / has been diagnosed with Covid-19 within the last 14
                    days?
                  </FormLabel>
                  {/* Radio Button YES/NO for question 2 */}
                  <Field as={RadioGroup} name="question2" id="question2" validate={(value) => {
                      let error;
                      if (!value) {
                        error = "Please select an option";
                      }
                      return error;
                    }
                  }>
                    <Stack direction="row">
                      <Radio value="true">Yes</Radio>
                      <Radio value="false">No</Radio>
                    </Stack>
                  </Field>
                  <FormErrorMessage>{errors.question2}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="purple" width="full">
                  Submit
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Form;
