import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
//   RadioGroup,
  Radio,
  Stack
} from "@chakra-ui/react";
import RadioGroup from "../components/radioGroup";
import axios from "axios";

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: "", // Name of the person
      temperature: "", // Temperature of the person in Celsius
      question1: "", // Do you have any of the following symptoms now or within the last 14 days:  Cough, smell/test impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea, runny nose(even if your symptoms are mild)?
      question2: "", // Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?
    },
    onSubmit: (values) => {
      // JSONIFY the values then send to backend via POST request? (async, axios)
      alert(JSON.stringify(values, null, 2));
    },
  });


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
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                    <Field as={Input} id="name" name="name" variant="filled" placeholder="eg. John Doe" />

                </FormControl>
                <FormControl isInvalid={errors.temperature && touched.temperature}>
                    <FormLabel htmlFor="temperature">Temperature (°C)</FormLabel>
                    <Field as={Input} id="temperature" name="temperature" variant="filled" placeholder="eg. 36.5" />
                    <FormErrorMessage>{errors.temperature}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="question1">
                        Do you have any of the following symptoms now or within the last 14 days: Cough, smell/test impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea, runny nose (even if your symptoms are mild)?
                    </FormLabel>
                    {/* Radio Button YES/NO for question 1 */}
                    <Field as={RadioGroup} name="question1" id="question1">
                        <Stack direction="row">
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                        </Stack>
                    </Field>
                    
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="question2">
                        Have you been in contact with anyone who is suspected to have / has been diagnosed with Covid-19 within the last 14 days?
                    </FormLabel>
                    {/* Radio Button YES/NO for question 2 */}
                    <Field as={RadioGroup} name="question2" id="question2">
                        <Stack direction="row">
                            <Radio value="true">Yes</Radio>
                            <Radio value="false">No</Radio>
                        </Stack>
                    </Field>
                    
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
