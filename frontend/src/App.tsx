import {
  Box,
  Grommet,
  Header,
  Heading,
  Nav,
  Anchor,
  Button,
  Avatar,
  Form,
  Image,
  FormField,
  Grid,
  Footer,
  Text,
  TextInput,
} from 'grommet';
import * as Icons from 'grommet-icons';
import React from 'react';
import { useSpring, animated } from 'react-spring';
// @ts-ignore
import ReactStars from 'react-stars';
import './app.css';

const theme = {
  global: {
    colors: {
      brand: '#333',
    },
    font: {
      family: 'Work Sans',
      size: '18px',
      height: '20px',
    },
  },
  anchor: {
    color: 'dark-1',
    hover: {
      extend: () => {
        return {
          color: '#555555',
        };
      },
      textDecoration: 'none',
    },
  },
};

const AppBar = (props: any) => (
  <Header pad={{ left: 'medium', right: 'medium', vertical: 'medium' }} {...props} />
);

function App() {
  const headerAnimatedProps = useSpring({
    transform: `translateY(0px)`,
    from: { transform: `translateY(-600px)` },
  });
  const searchFormAnimatedProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });
  return (
    <Grommet theme={theme}>
      <Box height="high" width="full" overflow="hidden">
        <AppBar>
          <Heading margin="none" level="3">
            <Anchor href="/" label="COACHCAMP" />
          </Heading>

          <Nav direction="row" background="transparent">
            <Button icon={<Icons.Home />} hoverIndicator />
            <Button icon={<Icons.Notification />} hoverIndicator />
            <Button icon={<Icons.ChatOption />} hoverIndicator />
            <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
          </Nav>
        </AppBar>
        <Box width="full" fill>
          <animated.div style={headerAnimatedProps}>
            <Heading textAlign="center" style={{ maxWidth: '100%' }} margin="1">
              Soft Skills for Career Success.
            </Heading>
            <Heading textAlign="center" level="4" style={{ maxWidth: '100%' }} margin="0">
              Certified workshops to enhance your skills.
            </Heading>
          </animated.div>
        </Box>
        <animated.div style={searchFormAnimatedProps}>
          <Box width="full" margin={{ vertical: 'medium' }}>
            <Form>
              <Box direction="row" justify="center" gap="large">
                <FormField width="medium">
                  <TextInput placeholder="Keyword (e.g Leadership)" />
                </FormField>
                <FormField>
                  <TextInput placeholder="Location" />
                </FormField>
                <Button label="Search" type="submit" primary />
              </Box>
            </Form>
          </Box>
        </animated.div>

        <Box justify="center" width="full">
          <Heading textAlign="center" style={{ maxWidth: '100%' }}>
            Our Top Skills
          </Heading>
          <hr style={{ width: '50%', color: 'rgba(0, 0, 0, 0.33)' }} />

          <Grid rows="small" columns="medium" gap="large" pad="medium">
            <Box background="brand" />
            <Box background="red" />
            <Box background="blue" />
          </Grid>
        </Box>

        <Box justify="center" width="full">
          <Heading textAlign="center" style={{ maxWidth: '100%' }}>
            Top Workshops
          </Heading>
          <hr style={{ width: '50%', color: 'rgba(0, 0, 0, 0.33)' }} />

          <Grid rows="small" columns="medium" gap="large" pad="large">
            <Box>
              <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
            </Box>
            <Box>
              <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
            </Box>
            <Box style={{ position: 'relative' }} background="brand">
              <Image
                fit="cover"
                opacity="0.3"
                src="https://miro.medium.com/max/1000/1*Ft1IhoaXQCxbmZRWGFb1xQ.jpeg"
              />
              <Heading
                style={{
                  position: 'absolute',
                  bottom: 50,
                  left: 10,
                  color: '#fff',
                }}
                level="3"
              >
                Leadership Workshop
              </Heading>
              <Text
                style={{
                  position: 'absolute',
                  bottom: 25,
                  left: 10,
                  color: '#fff',
                }}
              >
                Munich
                <ReactStars
                  className="abs"
                  count={5}
                  value={2}
                  size={24}
                  color1="#fff"
                  color2="#ffd700"
                  edit={false}
                />
              </Text>
            </Box>
          </Grid>
        </Box>
        <Footer background="brand" pad="medium" justify="center">
          <Text textAlign="center">Copyright CoachCamp. All Rights Reserved.</Text>
        </Footer>
      </Box>
    </Grommet>
  );
}

export default App;
