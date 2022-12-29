import { Flex, Spacer, Text, Input, Stack, Center } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

export type Problem = {
  numberOne: string;
  operation: string;
  numberTwo: string;
  answer: string;
};

function GamePlayPage() {
  // Sets the time left for the player, defaults to 120 which is the initial amount of time the player has
  const [gameLength, setGameLength] = useState<number>(120);
  const [score, setScore] = useState<number>(0);
  const [problemList, setProblemList] = useState<Problem[]>([]);
  const [currAnswer, setCurrAnswer] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  const goToScorePage = () => {
    navigate("/gameScorePage", {
      state: {
        score: score,
        gameLength: gameLength,
      },
    });
  };

  const createProblemList = () => {
    const userInputs = location.state;
    const newProblemList: Problem[] = [];
    const numOpsToInclude: number = [
      userInputs.isAdditionChecked,
      userInputs.isSubtractionChecked,
      userInputs.isMultiplicationChecked,
      userInputs.isDivisionChecked,
    ].reduce((partialSum, a) => partialSum + a, 0);

    const numProblemsPerOp: number = Math.floor(200 / numOpsToInclude);

    if (userInputs.isAdditionChecked) {
      const additionLowerBoundOne: number = userInputs.additionLowerBoundOne;
      const additionUpperBoundOne: number = userInputs.additionUpperBoundOne;
      const additionLowerBoundTwo: number = userInputs.additionLowerBoundTwo;
      const additionUpperBoundTwo: number = userInputs.additionUpperBoundTwo;
      for (let i = 0; i < numProblemsPerOp; i++) {
        const addNumOne: number = randomIntFromInterval(
          additionLowerBoundOne,
          additionUpperBoundOne
        );
        const addNumTwo: number = randomIntFromInterval(
          additionLowerBoundTwo,
          additionUpperBoundTwo
        );
        const addProblem: Problem = {
          numberOne: addNumOne.toString(),
          operation: "+",
          numberTwo: addNumTwo.toString(),
          answer: (addNumOne + addNumTwo).toString(),
        };
        newProblemList.push(addProblem);
      }
    }

    if (userInputs.isSubtractionChecked) {
      const additionLowerBoundOne: number = userInputs.additionLowerBoundOne;
      const additionUpperBoundOne: number = userInputs.additionUpperBoundOne;
      const additionLowerBoundTwo: number = userInputs.additionLowerBoundTwo;
      const additionUpperBoundTwo: number = userInputs.additionUpperBoundTwo;
      for (let i = 0; i < numProblemsPerOp; i++) {
        const subAnswer: number = randomIntFromInterval(
          additionLowerBoundOne,
          additionUpperBoundOne
        );
        const subNumTwo: number = randomIntFromInterval(
          additionLowerBoundTwo,
          additionUpperBoundTwo
        );
        const subNumOne: number = subAnswer + subNumTwo;
        const subProblem: Problem = {
          numberOne: subNumOne.toString(),
          operation: "-",
          numberTwo: subNumTwo.toString(),
          answer: subAnswer.toString(),
        };
        newProblemList.push(subProblem);
      }
    }

    if (userInputs.isMultiplicationChecked) {
      const multiplicationLowerBoundOne: number =
        userInputs.multiplicationLowerBoundOne;
      const multiplicationUpperBoundOne: number =
        userInputs.multiplicationUpperBoundOne;
      const multiplicationLowerBoundTwo: number =
        userInputs.multiplicationLowerBoundTwo;
      const multiplicationUpperBoundTwo: number =
        userInputs.multiplicationUpperBoundTwo;
      for (let i = 0; i < numProblemsPerOp; i++) {
        const multNumOne: number = randomIntFromInterval(
          multiplicationLowerBoundOne,
          multiplicationUpperBoundOne
        );
        const multNumTwo: number = randomIntFromInterval(
          multiplicationLowerBoundTwo,
          multiplicationUpperBoundTwo
        );
        const multProblem: Problem = {
          numberOne: multNumOne.toString(),
          operation: "x",
          numberTwo: multNumTwo.toString(),
          answer: (multNumOne * multNumTwo).toString(),
        };
        newProblemList.push(multProblem);
      }
    }

    if (userInputs.isDivisionChecked) {
      const multiplicationLowerBoundOne: number =
        userInputs.multiplicationLowerBoundOne;
      const multiplicationUpperBoundOne: number =
        userInputs.multiplicationUpperBoundOne;
      const multiplicationLowerBoundTwo: number =
        userInputs.multiplicationLowerBoundTwo;
      const multiplicationUpperBoundTwo: number =
        userInputs.multiplicationUpperBoundTwo;

      for (let i = 0; i < numProblemsPerOp; i++) {
        const divAnswer: number = randomIntFromInterval(
          multiplicationLowerBoundOne,
          multiplicationUpperBoundOne
        );
        const divNumTwo: number = randomIntFromInterval(
          multiplicationLowerBoundTwo,
          multiplicationUpperBoundTwo
        );
        const divNumOne: number = divAnswer * divNumTwo;
        const divProblem: Problem = {
          numberOne: divNumOne.toString(),
          operation: "/",
          numberTwo: divNumTwo.toString(),
          answer: divAnswer.toString(),
        };
        newProblemList.push(divProblem);
      }
    }
    newProblemList.sort(() => Math.random() - 0.5);
    return newProblemList;
  };

  const constructProblemString = () => {
    const currProblem = problemList[0];
    return currProblem === undefined
      ? ""
      : `${currProblem.numberOne} ${currProblem.operation} ${currProblem.numberTwo} = `;
  };

  function randomIntFromInterval(min: number, max: number) {
    // Function to return random integer from min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const checkAnswer = (event: any) => {
    const answer: string = event.target.value;
    setCurrAnswer(answer);
    const currProblemAnswer: string = problemList[0].answer;

    if (answer === currProblemAnswer) {
      const copyList: Problem[] = [...problemList];
      copyList.shift();
      setProblemList(copyList);
      setScore(score + 1);
      setCurrAnswer("");
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      console.log("game length and problem set being set");
      setGameLength(location.state.gameLength);
      setProblemList(createProblemList());
    }
  }, []);

  const gameTime = useMemo(() => {
    return Date.now();
  }, []);

  return (
    <Stack spacing="100">
      <Flex>
        <Countdown
          date={gameTime + gameLength * 1000}
          renderer={(props) => (
            <Text margin="7" fontSize="lg">
              Seconds left: {Math.floor(props.total / 1000)}
            </Text>
          )}
          onComplete={goToScorePage}
        />
        <Spacer />
        <Text margin="7" fontSize="lg">
          Score: {score}
        </Text>
      </Flex>
      <Spacer />
      <Center bg="cyan.100" w="100%" p={6} color="black">
        <Text margin="7" fontSize="5xl" fontWeight="normal">
          {constructProblemString()}
        </Text>
        <Input
          htmlSize={5}
          width="auto"
          height="16"
          bgColor="white"
          fontSize="4xl"
          autoFocus={true}
          onChange={checkAnswer}
          value={currAnswer}
        />
      </Center>
    </Stack>
  );
}

export default GamePlayPage;
