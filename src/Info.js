import {
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Left,
  Right,
  Spinner,
  Text,
  Thumbnail,
} from 'native-base';
import React from 'react';
import {API_KEY} from '@env';
import {Linking} from 'react-native';
import styles from './App.styles';

const Info = ({route, navigation}) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const {random, id} = route.params;

    if (!random) {
      getNeoById(id);
    } else {
      getNeo();
    }
  }, [route.params]);

  const getData = async (query) => {
    const res = await fetch(query);
    try {
      const json = await res.json();
      return json;
    } catch (e) {
      const err = {error: true, message: e};
      setError(err);
      return err;
    }
  };

  const getNeo = async () => {
    let query = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`;
    const res = await getData(query);
    if (!res.error) {
      const neoList = res.near_earth_objects;
      const id = neoList[Math.floor(Math.random() * neoList.length)].id;
      getNeoById(id);
    }
  };

  const getNeoById = async (id) => {
    let query = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`;
    const res = await getData(query);
    if (!res.error) {
      setData(res);
    }
    setLoading(false);
  };

  const openLink = React.useCallback(async (link) => {
    await Linking.openURL(link);
  }, []);

  if (loading) {
    return (
      <Container>
        <Thumbnail
          square
          style={styles.bg}
          source={{
            uri: 'https://source.unsplash.com/collection/249192/600x900',
          }}
        />
        <Content>
          <Spinner />
        </Content>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Thumbnail
          square
          style={styles.bg}
          source={{
            uri: 'https://source.unsplash.com/collection/249192/600x900',
          }}
        />
        <Content>
          <Card style={styles.card}>
            <Text>Asteroid Not Found</Text>
            <Button
              dark
              rounded
              onPress={() => navigation.goBack()}
              style={styles.btn}>
              <Text>Go back</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Thumbnail
        square
        style={styles.bg}
        source={{uri: 'https://source.unsplash.com/collection/249192/600x900'}}
      />
      <Content>
        {data && (
          <Card style={styles.card}>
            <CardItem header>
              <Text>Asteroid Details</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Name</Text>
              </Left>
              <Right>
                <Text>{data.name}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>NASA JPL URL</Text>
              </Left>
              <Right>
                <Text
                  style={styles.link}
                  onPress={() => openLink(data.nasa_jpl_url)}>
                  {data.nasa_jpl_url}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Potentially hazardous</Text>
              </Left>
              <Right>
                <Text>
                  {data.is_potentially_hazardous_asteroid ? (
                    <Text>Yes</Text>
                  ) : (
                    <Text>No</Text>
                  )}
                </Text>
              </Right>
            </CardItem>
            <Button
              dark
              rounded
              onPress={() => navigation.goBack()}
              style={styles.btn}>
              <Text>Go back</Text>
            </Button>
          </Card>
        )}
      </Content>
    </Container>
  );
};

export default Info;
