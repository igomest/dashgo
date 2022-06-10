import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  console.log({ from, to });
  // console.log([...new Array(to - from)]);

  return [...new Array(to - from)]
    .map((_, index) => {
      console.log(index, from, from + index + 1);
      return from + index + 1;
    })
    .filter((page) => page > 0); // O filtro acontece, porque se houver um número negativo, pode quebrar o cálculo. Ou seja, ele filtra somente os números maiores que 0.
}

export function Pagination({
  totalCountOfRegisters, // são 200 registros que estão vindo do mirage/req
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage); // O math arredonda o resultado do totalCountOfRegisters/registersPerPage = 200 / 10, para o caso de vir um valor quebrado de totalCountOfRegisters, não quebrar a paginação.
  // console.log({ totalCountOfRegisters });

  /* De acordo com a lógica abaixo, as páginas devem ficar assim: 1 ...4 5 6 ... 20   
     Caso 1: O estado da página começa com 1, logo não haverá uma página anterior, porque o usuário está na primeira página. Então se a página atual for maior que 1, o generatePagesArray vai calcular: a página atual - 1 - a siblingsCount(páginas irmãs) e subtrair a página atual por 1. 
  */

  const previousPages = // calcular quantas páginas devem ser exibidas, antes da página atual
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) // 3 - 1 = 2
      : [];                                                                  // 2 - 1 = 1 (12[3]4 ... 20)

  console.log({ previousPages });
 
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  // console.log({ nextPages });

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        {currentPage > 0 && <strong>{currentPage}</strong>} -{" "}
        {registersPerPage > 0 && <strong>{registersPerPage}</strong>} de{" "}
        {totalCountOfRegisters > 0 && <strong>{totalCountOfRegisters}</strong>}
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem
                key={page}
                number={page}
                onPageChange={onPageChange}
              />
            );
          })}

        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                key={page}
                number={page}
                onPageChange={onPageChange}
              />
            );
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
