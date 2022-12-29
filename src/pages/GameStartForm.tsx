import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  Button,
  InputGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  IconButton,
  Select,
} from "@chakra-ui/react";
import {
  RxCross1 as MultiplicationIcon,
  RxSlash as DivisionIcon,
  RxDividerHorizontal as SubtractionIcon,
  RxPlus as AdditionIcon,
} from "react-icons/rx";

function GameStartForm() {
  const [isAdditionChecked, setIsAdditionChecked] = useState<boolean>(true);

  const [additionLowerBoundOne, setAdditionLowerBoundOne] = useState<number>(2);
  const [additionUpperBoundOne, setAdditionUpperBoundOne] =
    useState<number>(100);
  const [additionLowerBoundTwo, setAdditionLowerBoundTwo] = useState<number>(2);
  const [additionUpperBoundTwo, setAdditionUpperBoundTwo] =
    useState<number>(100);

  const [isSubtractionChecked, setIsSubtractionChecked] =
    useState<boolean>(true);

  const [isMultiplicationChecked, setIsMultiplicationChecked] =
    useState<boolean>(true);

  const [multiplicationLowerBoundOne, setMultiplicationLowerBoundOne] =
    useState<number>(2);
  const [multiplicationUpperBoundOne, setMultiplicationUpperBoundOne] =
    useState<number>(12);
  const [multiplicationLowerBoundTwo, setMultiplicationLowerBoundTwo] =
    useState<number>(2);
  const [multiplicationUpperBoundTwo, setMultiplicationUpperBoundTwo] =
    useState<number>(100);

  const [isDivisionChecked, setIsDivisionChecked] = useState<boolean>(true);

  const [gameLength, setGameLength] = useState<number>(120);

  const setIsAdditionCheckedWithVal = () => {
    // Function to ensure changing the include addition doesn't violate the need for atleast one operation
    if (!isAdditionChecked) {
      setIsAdditionChecked(true);
      return;
    }
    const hasAtleastOneOtherOp: boolean =
      isSubtractionChecked || isMultiplicationChecked || isDivisionChecked;

    if (hasAtleastOneOtherOp) {
      setIsAdditionChecked(false);
    }
  };

  const setIsSubtractionCheckedWithVal = () => {
    // Function to ensure changing the include addition doesn't violate the need for atleast one operation
    if (!isSubtractionChecked) {
      setIsSubtractionChecked(true);
      return;
    }
    const hasAtleastOneOtherOp: boolean =
      isAdditionChecked || isMultiplicationChecked || isDivisionChecked;

    if (hasAtleastOneOtherOp) {
      setIsSubtractionChecked(false);
    }
  };

  const setIsMultiplicationCheckedWithVal = () => {
    // Function to ensure changing the include addition doesn't violate the need for atleast one operation
    if (!isMultiplicationChecked) {
      setIsMultiplicationChecked(true);
      return;
    }
    const hasAtleastOneOtherOp: boolean =
      isAdditionChecked || isSubtractionChecked || isDivisionChecked;

    if (hasAtleastOneOtherOp) {
      setIsMultiplicationChecked(false);
    }
  };

  const setIsDivisionCheckedWithVal = () => {
    // Function to ensure changing the include addition doesn't violate the need for atleast one operation
    if (!isDivisionChecked) {
      setIsDivisionChecked(true);
      return;
    }
    const hasAtleastOneOtherOp: boolean =
      isAdditionChecked || isSubtractionChecked || isMultiplicationChecked;

    if (hasAtleastOneOtherOp) {
      setIsDivisionChecked(false);
    }
  };

  const navigate = useNavigate();
  const goToGamePage = () => {
    console.log("We got here brothers");
    navigate("/gamePlayPage", {
      state: {
        isAdditionChecked: isAdditionChecked,
        additionLowerBoundOne: additionLowerBoundOne,
        additionUpperBoundOne: additionUpperBoundOne,
        additionLowerBoundTwo: additionLowerBoundTwo,
        additionUpperBoundTwo: additionUpperBoundTwo,
        isSubtractionChecked: isSubtractionChecked,
        isMultiplicationChecked: isMultiplicationChecked,
        multiplicationLowerBoundOne: multiplicationLowerBoundOne,
        multiplicationUpperBoundOne: multiplicationUpperBoundOne,
        multiplicationLowerBoundTwo: multiplicationLowerBoundTwo,
        multiplicationUpperBoundTwo: multiplicationUpperBoundTwo,
        isDivisionChecked: isDivisionChecked,
        gameLength: gameLength,
      },
    });
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Arithmetic Game</Heading>
          <Text maxWidth="600px" marginTop="10px">
            The Arithmetic Game is a fast-paced speed drill where yousolve as
            many arithmetic problems as you can. Just select what operations you
            want, their number ranges, and for how long you want to play the
            game.
          </Text>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl mt={6}>
              <InputGroup>
                <IconButton
                  colorScheme="teal"
                  variant={isAdditionChecked ? "solid" : "outline"}
                  onClick={setIsAdditionCheckedWithVal}
                  aria-label="Call Segun"
                  size="md"
                  icon={<AdditionIcon />}
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  (
                </Text>
                <RangeInput
                  defaultValue={additionLowerBoundOne}
                  isDisabled={!isAdditionChecked}
                  onChange={(e: unknown) =>
                    setAdditionLowerBoundOne(e as unknown as number)
                  }
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  to
                </Text>
                <RangeInput
                  defaultValue={additionUpperBoundOne}
                  isDisabled={!isAdditionChecked}
                  onChange={(e: unknown) =>
                    setAdditionUpperBoundOne(e as unknown as number)
                  }
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  ) + (
                </Text>
                <RangeInput
                  defaultValue={additionLowerBoundTwo}
                  isDisabled={!isAdditionChecked}
                  onChange={(e: unknown) =>
                    setAdditionLowerBoundTwo(e as unknown as number)
                  }
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  to
                </Text>
                <RangeInput
                  defaultValue={additionUpperBoundTwo}
                  isDisabled={!isAdditionChecked}
                  onChange={(e: unknown) =>
                    setAdditionUpperBoundTwo(e as unknown as number)
                  }
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  )
                </Text>
              </InputGroup>
            </FormControl>
            <FormControl mt={6}>
              <InputGroup>
                <IconButton
                  colorScheme="teal"
                  variant={isSubtractionChecked ? "solid" : "outline"}
                  onClick={setIsSubtractionCheckedWithVal}
                  aria-label="Call Segun"
                  size="md"
                  icon={<SubtractionIcon />}
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  Subtraction range is addition range in reverse
                </Text>
              </InputGroup>
            </FormControl>
            <FormControl mt={6}>
              <InputGroup>
                <IconButton
                  colorScheme="teal"
                  variant={isMultiplicationChecked ? "solid" : "outline"}
                  onClick={setIsMultiplicationCheckedWithVal}
                  aria-label="Call Segun"
                  size="md"
                  icon={<MultiplicationIcon />}
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  (
                </Text>
                <RangeInput
                  defaultValue={multiplicationLowerBoundOne}
                  isDisabled={!isMultiplicationChecked}
                  onChange={(e: unknown) =>
                    setMultiplicationLowerBoundOne(e as unknown as number)
                  }
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  to
                </Text>
                <RangeInput
                  defaultValue={multiplicationUpperBoundOne}
                  isDisabled={!isMultiplicationChecked}
                  onChange={(e: unknown) =>
                    setMultiplicationUpperBoundOne(e as unknown as number)
                  }
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  ) x (
                </Text>
                <RangeInput
                  defaultValue={multiplicationLowerBoundTwo}
                  isDisabled={!isMultiplicationChecked}
                  onChange={(e: unknown) =>
                    setMultiplicationLowerBoundTwo(e as unknown as number)
                  }
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  to
                </Text>
                <RangeInput
                  defaultValue={multiplicationUpperBoundTwo}
                  isDisabled={!isMultiplicationChecked}
                  onChange={(e: unknown) =>
                    setMultiplicationUpperBoundTwo(e as unknown as number)
                  }
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  )
                </Text>
              </InputGroup>
            </FormControl>
            <FormControl mt={6}>
              <InputGroup>
                <IconButton
                  colorScheme="teal"
                  variant={isDivisionChecked ? "solid" : "outline"}
                  onClick={setIsDivisionCheckedWithVal}
                  aria-label="Call Segun"
                  size="md"
                  icon={<DivisionIcon />}
                />
                <Text fontSize="2xl" marginInline="12.5px">
                  Division range is multiplication range in reverse
                </Text>
              </InputGroup>
            </FormControl>

            <FormControl mt={6}>
              <InputGroup>
                <Select
                  onChange={(e) =>
                    setGameLength(e.target.value as unknown as number)
                  }
                  defaultValue={120}
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>60 seconds</option>
                  <option value={120}>120 seconds</option>
                  <option value={300}>300 seconds</option>
                  <option value={600}>600 seconds</option>
                </Select>
              </InputGroup>
            </FormControl>
            <Button
              width="full"
              mt={4}
              type="submit"
              colorScheme="teal"
              onClick={goToGamePage}
            >
              Start Game
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

function RangeInput(props: any) {
  return (
    <NumberInput
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      isDisabled={props.isDisabled}
      width="80px"
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}

export default GameStartForm;
