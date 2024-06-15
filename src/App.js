import * as React from 'react';
import { ChakraProvider, Box, Button, Text, Center, Flex, Switch, useColorMode, ColorModeProvider, } from '@chakra-ui/react';

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [nextValue, setNextValue] = React.useState('X');
  const [status, setStatus] = React.useState('');

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[square] = nextValue;

    const winner = calculateWinner(newSquares);
    const status = calculateStatus(winner, newSquares, nextValue);

    setSquares(newSquares);
    setNextValue(calculateNextValue(newSquares));
    setStatus(status);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue('X');
    setStatus('');
  }

  function renderSquare(i) {
    return (
      <Button
        className="square"
        variant="outline"
        onClick={() => selectSquare(i)}
        width="100px"
        height="100px"
        fontSize="xl"
      >
        {squares[i]}
      </Button>
    );
  }

  function Title() {
    return (
      <div>
        <h2>Tic Tac Toe</h2>
      </div>
    )
  }

  return (
    <Center h="100vh">
      <Box p={50} rounded="md" boxShadow="dark-lg" textAlign="center">
        <Box>
          <Text fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">
            <Title />
          </Text>
          <Text fontSize="lg" fontWeight="bold" mb="6" color="teal">
            {status}
          </Text>
        </Box>
        <Flex direction="column" align="center" >
          <Box mb="8">
            <Flex>
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </Flex>
            <Flex>
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </Flex>
            <Flex>
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </Flex>
            <Box m={5}>
              <Button
                size="md"
                colorScheme="blue"
                variant="solid"
                onClick={restart}
              >
                Restart
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
}

function Game() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Flex
        position="absolute"
        top="2"
        right="2"
        mr="4"
        mt="4"
      >
        <Switch
          colorScheme="blue"
          isChecked={colorMode === 'dark'}
          onChange={toggleColorMode}
          size="md"
        />
      </Flex>
      <Board />
    </Flex>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next Player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <ChakraProvider>
      <ColorModeProvider>
        <Game />
      </ColorModeProvider >
    </ChakraProvider>
  );
}

export default App;
