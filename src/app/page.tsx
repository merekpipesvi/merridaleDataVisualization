import { createTheme, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { FrontPage } from "./FrontPage";

const theme = createTheme({});

export default function Home() {



  return (
      <MantineProvider theme={theme}>
        <FrontPage/>
      </MantineProvider>
  );
}
