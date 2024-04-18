import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Text, useColorMode, useColorModeValue, VStack, Heading } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaSun, FaMoon } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const handleAddTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <VStack p={4}>
      <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} isRound="true" size="lg" alignSelf="flex-end" onClick={toggleColorMode} />
      <Heading mb="8" fontWeight="extrabold" size="2xl" bgGradient="linear(to-r, teal.500,green.500)" bgClip="text">
        Todo App
      </Heading>
      <Box w="100%" p={4} bg={bgColor} borderRadius="lg">
        <Input placeholder="Add new todo" value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} variant="filled" mb={2} />
        <Button onClick={handleAddTodo} colorScheme="teal" px={8} leftIcon={<FaPlus />}>
          Add
        </Button>
      </Box>
      <List spacing={3} w="100%" maxW="md">
        {todos.map((todo, index) => (
          <ListItem key={index} p={2} bg={bgColor} borderRadius="lg" display="flex" alignItems="center" justifyContent="space-between">
            <Text isTruncated maxW="80%" color={textColor}>
              {todo}
            </Text>
            <IconButton icon={<FaTrash />} isRound="true" onClick={() => handleDeleteTodo(index)} aria-label={`Delete "${todo}"`} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
