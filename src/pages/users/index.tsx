import {useUsers} from "../../services/hooks/useUsers";

import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Spinner,
    Link,
    HStack,
    Center,
    Divider,
} from "@chakra-ui/react";
import {Header} from "../../components/Header";
import {Sidebar} from "../../components/Sidebar";

import {RiAddLine} from "react-icons/ri";
import {CgImport} from "react-icons/cg";
import {TbEdit} from "react-icons/tb";
import {FaWhatsapp} from "react-icons/fa";
import {CgNotes} from "react-icons/cg";

import {Pagination} from "../../components/Pagination";

import NextLink from "next/link";
import {useEffect, useState} from "react";
import {queryClient} from "../../services/queryClient";
import {withSSRAuth} from "../../utils/withSSRAuth";
import {setupAPIClient} from "../../services/api";
// import { api } from "../../services/api";

// interface Users {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: string;
// }

interface UserListProps {
    permissions?: string[];
    roles?: string[];
}

export default function UserList({permissions, roles}: UserListProps) {
    const [page, setPage] = useState(1);

    const {data, isLoading, isFetching, error} = useUsers(page);
    const [ids, setIds] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState(false);

    function selectUser(e) {
        const selectedId = e.target.value;

        if (ids.includes(selectedId)) {
            const newIds = ids.filter((id) => id !== selectedId);
            setIds(newIds);
        } else {
            const newIds = [...ids];
            newIds.push(selectedId);
            setIds(newIds);
        }
    }

    function selectAllUsers(e) {
        setIsChecked(!isChecked);

        const allUsers = data.users.map((user) => {
            return user.id;
        });

        if (!isChecked) {
            setIds(allUsers);
        } else {
            setIds([]);
        }
    }

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(
            ["user", userId],
            async () => {
                // const response = await api.get(`users/${userId}`);

                // return response.data;
            },
            {
                staleTime: 1000 * 60 * 10,
            }
        );
    }

    return (
        <Box>
            <Header/>

            <Flex my="6" maxWidth={1480} mx="auto" w="94%">
                <Sidebar/>

                <Box flex="1" borderRadius={8} bg="gray.800" p="8" overflow="hidden">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Alunos
                            {!isLoading && isFetching && (
                                <Spinner size="sm" color="gray.500" ml="4"/>
                            )}
                        </Heading>

                        <HStack spacing={4}>
                            <NextLink href="/users/create" passHref>
                                <Button as="a" size="sm" fontSize="sm" colorScheme="pink">
                                    <Icon as={RiAddLine} fontSize="20"/>
                                </Button>
                            </NextLink>

                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="blue"
                                cursor="pointer"
                            >
                                <Icon as={CgImport} fontSize="20"/>
                            </Button>

                            {ids.length > 0 && (
                                <>
                                    <Center height="40px">
                                        <Divider orientation="vertical"/>
                                    </Center>


                                    <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="purple"
                                        cursor="pointer"
                                    >
                                        <Icon as={CgNotes} fontSize="20"/>
                                    </Button>
                                </>
                            )}
                        </HStack>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center" align="center">
                            <Spinner/>
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários.</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha" overflow="none" size="md">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300">
                                            <Checkbox
                                                colorScheme="pink"
                                                isChecked={isChecked}
                                                onChange={(e) => selectAllUsers(e)}
                                            />
                                        </Th>

                                        <Th w="100%">Alunos</Th>
                                        {/* <Th w="8"></Th> */}
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.users.map((user) => (
                                        <Tr key={user.id}>
                                            <Td px={["4", "4", "6"]}>
                                                <Checkbox
                                                    colorScheme="pink"
                                                    key={user.id}
                                                    value={user.id}
                                                    isChecked={ids.includes(user.id) ? true : false}
                                                    onChange={selectUser}
                                                />
                                            </Td>

                                            <Td>
                                                <Box>
                                                    <Link
                                                        colorScheme="purple"
                                                        onMouseEnter={() => handlePrefetchUser(user.id)}
                                                    >
                                                        <Text fontWeight="bold" fontSize={["sm", "md"]}>
                                                            {user.name}
                                                        </Text>
                                                    </Link>
                                                </Box>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>

                            {/* <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              /> */}
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)


    return {
        props: {}
    }
}, {
    permissions: ['metrics.list'],
    roles: ['administrator']
})