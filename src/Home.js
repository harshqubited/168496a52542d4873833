import React from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Left,
  Right,
  Card,
  Thumbnail,
} from 'native-base';

import styles from './App.styles';

const Home = ({navigation}) => {
  const [input, setInput] = React.useState('');

  return (
    <Container>
      <Thumbnail
        square
        style={styles.bg}
        source={{uri: 'https://source.unsplash.com/collection/249192/600x900'}}
      />
      <Content>
        <Card style={styles.card}>
          <Form>
            <Item>
              <Input
                placeholder="Enter Asteroid Id"
                value={input}
                onChangeText={setInput}
              />
            </Item>
            <Left>
              <Button
                dark
                rounded
                style={styles.btn}
                onPress={() =>
                  navigation.navigate('Info', {random: false, id: input})
                }
                disabled={!input}>
                <Text>Submit</Text>
              </Button>
            </Left>
            <Right>
              <Button
                rounded
                style={styles.btn}
                dark
                onPress={() =>
                  navigation.navigate('Info', {
                    random: true,
                  })
                }>
                <Text>Random Asteroid</Text>
              </Button>
            </Right>
          </Form>
        </Card>
      </Content>
    </Container>
  );
};

export default Home;
