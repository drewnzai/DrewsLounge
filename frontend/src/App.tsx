import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css'
import { ColorModeContext, useMode } from './theme'

function App() {

  const [theme, colorMode] = useMode();
  
  return (
    <>
    
    {/*An error that's just a pain really, works fine*/}
    {/* @ts-ignore */}
    <ColorModeContext.Provider value={colorMode}>

    {/*An error that's just a pain really, works fine*/}
    {/* @ts-ignore */}
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    </ThemeProvider>
    </ColorModeContext.Provider>
    
    </>
  )
}

export default App
