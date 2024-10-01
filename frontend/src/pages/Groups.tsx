import { Box, Typography, TextField, Card, CardContent } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function Groups(){
    const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Implement search functionality here and update searchResults accordingly
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
  ))}
</Box>

      
    </Box>
  );
}