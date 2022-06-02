import { Flex, Icon, Input, Text } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export function Header() {
    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            marginX="auto"
            mt="4"
            px="6"
            align="center"
        >
            <Text // o text é sempre utilizado para qualquer tipo de texto
                fontSize="3xl"
                fontWeight="bold"
                letterSpacing="tight"
                w="64"
            >
                dashgo
                <Text as="span" ml="1" color="pink.500">.</Text>
            </Text>

            <Flex
                as="label"
                flex="1"
                py="4"
                px="8"
                maxWidth={400}
                alignSelf="center"
                color="gray.200"
                position="relative"
                bg="gray.800"
                borderRadius="full"
            >
                <Input
                    color="gray.50"
                    variant="unstyled"
                    placeholder="Buscar na plataforma"
                    px="4"
                    mr="4"
                    _placeholder={{ color: 'gray.400' }} // aplica cor apenas no texto do placeholder
                />

                <Icon as={RiSearchLine} fontSize="20" />
            </Flex>
        </Flex>
    )
}