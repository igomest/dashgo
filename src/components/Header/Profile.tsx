import {Avatar, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList} from "@chakra-ui/react";
import {signOut, useAuthContext} from "../../contexts/AuthContext";


export function Profile() {
    const { user } = useAuthContext()

    return (
        <Flex align="center">
            <Menu>
                <MenuButton transition='all 0.2s'>
                    <Avatar size="md" name={ user?.email } />
                </MenuButton>

                <MenuList bg="gray.800">
                    <MenuGroup title='Perfil'>
                        <MenuItem _hover={{
                            bg: 'gray.700'
                        }}>
                            Minha conta
                        </MenuItem>

                        <MenuItem _hover={{
                            bg: 'gray.700'
                        }}>
                            Pagamentos
                        </MenuItem>
                    </MenuGroup>

                    <MenuDivider/>

                    <MenuItem
                        _hover={{
                        bg: 'gray.700'
                    }}
                        onClick={signOut}
                    >
                        Sign out
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
}
