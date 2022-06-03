import { Text } from "@chakra-ui/react"

export function Logo() {
    return (
        <Text // o componente Text é sempre utilizado para qualquer tipo de texto
            fontSize="3xl"
            fontWeight="bold"
            letterSpacing="tight"
            w="64"
        >
            dashgo
            <Text as="span" ml="1" color="pink.500">.</Text>
        </Text>
    )
}