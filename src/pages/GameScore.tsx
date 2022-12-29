import { Stack, Center, Text, Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL ?? "";
const supabaseAnonKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function GameScorePage() {
  const location = useLocation();

  const [percentile, setPercentile] = useState<number>(0);
  const [numGames, setNumGames] = useState<number>(0);
  const [alreadyInserted, setAlreadyInserted] = useState<boolean>(false);

  const navigate = useNavigate();

  const goToStartFormPage = () => {
    navigate("/");
  };

  const getScoreData = async () => {
    const { data, error } = await supabase
      .from("game_scores")
      .select(`score`)
      .eq("game_length", location.state.gameLength);
    return data;
  };

  const insertNewScore = async () => {
    const { error } = await supabase.from("game_scores").insert({
      score: location.state.score,
      game_length: location.state.gameLength,
    });
    return error;
  };

  const calcPercentile = (arr: Array<number>, val: number) => {
    let count = 0;
    arr.forEach((v) => {
      if (v < val) {
        count++;
      } else if (v === val) {
        count += 0.5;
      }
    });
    return count / arr.length;
  };

  useEffect(() => {
    if (location.state !== null) {
      getScoreData().then((data) => {
        setNumGames(data === null ? 0 : data.length);
        const scoreVals: number[] =
          data !== null ? data.map((score) => score.score) : [];
        setPercentile(calcPercentile(scoreVals, location.state.score));
      });
      if (!alreadyInserted) {
        console.log("Insertion happening");
        setAlreadyInserted(true);
        insertNewScore().then((error) => {
          console.log(error);
        });
      }
    }
  }, []);

  return (
    <Stack spacing="250">
      <Box />
      <Center bg="cyan.100" w="100%" p={6} color="black">
        <Stack spacing={3} justifyContent="center">
          <Text fontSize="5xl">Your Score: {location.state.score}</Text>
          <Text fontSize="5xl">
            {" "}
            Your Percentile:{" "}
            {Number(percentile).toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 1,
            })}{" "}
          </Text>
          <Text fontSize="5xl"> Out of {numGames} total games</Text>
          <Button
            width="full"
            mt={4}
            type="submit"
            colorScheme="cyan"
            onClick={goToStartFormPage}
            autoFocus={true}
          >
            Play Again
          </Button>
        </Stack>
      </Center>
    </Stack>
  );
}

export default GameScorePage;
