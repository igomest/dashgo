/* eslint-disable react/no-children-prop */
import {
  Flex,
  Box,
  Heading,
  Stack,
  Text,
  InputGroup,
  InputLeftElement,
  Textarea,
  Divider,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { TextArea } from "../../components/Form/Textarea";

interface SendEmailData {
  email: string;
  message: string;
}

export default function SendEmail() {
  const toast = useToast();

  const sendEmailFormSchema = yup.object({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    message: yup.string().required("Insira uma mensagem"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(sendEmailFormSchema),
  });

  const { isSubmitting, errors } = formState;

  const handleSendEmail: SubmitHandler<SendEmailData> = async ({
    email,
    message,
  }: SendEmailData) => {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, message: message }),
    });

    const apiResponse = await res.json();

    if (apiResponse.success) {
      toast({
        position: "top",
        title: "E-mail enviado",
        description: "O e-mail foi enviado com sucesso!.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Ocorreu um erro",
        description:
          "Ocorreu um erro ao enviar o e-mail, tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" as="form" onSubmit={handleSubmit(handleSendEmail)}>
      <Header />

      <Flex my="6" maxWidth={1480} mx="12.5%" w="94%">
        <Sidebar />

        <Box my="8" bg="gray.800" w="900px" maxH="auto" borderRadius={8} p={10}>
          <Stack spacing={4}>
            <Heading fontSize="2xl">Enviar e-mail</Heading>
            <Divider />

            <InputGroup marginTop={10}>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineMail color="gray.300" fontSize="18px" />}
              />
              <Input
                type="email"
                paddingLeft={10}
                name="phone"
                borderRadius={8}
                placeholder="fulano@email.com"
                {...register("email")}
                error={errors.email}
                variant="filled"
                size="lg"
              />
            </InputGroup>

            <Stack>
              <TextArea
                label="Mensagem"
                size="lg"
                h="300px"
                bg="gray.900"
                resize="none"
                {...register("message")}
                error={errors.message}
              />
            </Stack>
          </Stack>

          <Flex marginTop={10} w="100%" justify="flex-end">
            <HStack>
              <Button colorScheme="pink" type="submit" isLoading={isSubmitting}>
                Enviar
              </Button>

              <Link href="/dashboard">
                <a>
                  <Button bg="gray.500">Cancelar</Button>
                </a>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
