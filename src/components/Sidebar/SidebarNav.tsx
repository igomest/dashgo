import { Box, Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
      </NavSection>

      <Box>
        <Stack spacing="4" mt="8" align="stretch">
          <NavSection title="AUTOMAÇÃO">
            <NavLink icon={RiInputMethodLine} href="/forms">Formulários</NavLink>
            <NavLink icon={RiGitMergeLine} href="/automation">Usuários</NavLink>
          </NavSection>
        </Stack>
      </Box>
    </Stack>
  );
}
