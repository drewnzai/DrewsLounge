import { Box, Typography, TextField, Card, CardContent, Button } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ConversationService from "../services/ConversationService.service";
import { Link } from "react-router-dom";

export default function Groups(){
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const conversationService = new ConversationService();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const search = () => {
    conversationService.searchGroups(searchTerm)
      .then(
        (response) => {
          setSearchResults(response);
        }
      )
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search();
    }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('searchbar.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
        paddingTop: "100px",
        textAlign: "center",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Find your community in The Lounge
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#2c2f33",
          padding: "8px 16px",
          borderRadius: "24px",
          width: "50%",
          maxWidth: "600px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
          marginTop: "24px",
        }}
      >
        <SearchIcon sx={{ color: "#fff", marginRight: "8px" }} />
        <TextField
          fullWidth
          placeholder="Explore communities"
          variant="standard"
          InputProps={{ disableUnderline: true, style: { color: "#fff" } }}
          value={searchTerm}
          onKeyPress={handleKeyPress}
          onChange={handleSearchChange}
        />
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        mt={4}
        px={2}
>
  {searchResults.length > 0 && searchResults.map((searchResult, index) => (
    <Link
    to={`/conversations/@me/${searchResult}`}
    style={{
      textDecoration: "none"
    }}
    >
    <Card 
      key={index} 
      sx={{
        width: "300px", 
        minWidth: "250px",
        margin: "10px", 
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Typography 
          gutterBottom 
          sx={{ color: 'text.secondary', fontSize: 14 }}
        >
          {searchResult}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  ))}
</Box>

      
    </Box>
  );
}