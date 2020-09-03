import React from 'react'
import theme from './theme'
import { ThemeProvider } from 'emotion-theming'
import { Box } from 'rebass'
import { Gallery } from 'components/gallery'

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundColor='white'
        sx={{ minHeight: '100vh' }}
      >
        <Gallery />
      </Box>
    </ThemeProvider>
  )
}

export default App
