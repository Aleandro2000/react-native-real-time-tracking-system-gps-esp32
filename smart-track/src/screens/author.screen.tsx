import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const AuthorScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Aleandro2000</Title>
          <Paragraph>
            Aleandro2000 is a passionate developer with a love for creating
            innovative applications and contributing to open-source projects.
            Always eager to learn and share knowledge with the community.
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    elevation: 4,
  },
});

export default AuthorScreen;
