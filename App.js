import React from 'react';
import { StyleSheet, ScrollView, Image, Text, Button, View, } from 'react-native';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      doctorArr: []
    }
  }

  componentDidMount() {
    var url = 'http://localhost:3001/api/v1/doctors.json'
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        const doctorArr = responseJson.map((doctor) => {
          return {
            id: doctor.id,
            name: doctor.name,
            image_url: 'http://localhost:3001/doctors/' + doctor.image_url,
            actor_image_url: doctor.actor_image_url,
            actor_name: doctor.actor_name,
            category: doctor.category,
            companions: doctor.companions,
            episodes: doctor.episodes,
            species: doctor.species
          }
        })
        this.setState({
          isLoading: false,
          doctorArr
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
    render() {
      return (
        <View style={styles.container}>
          <ScrollView>
              <Text style={{fontSize:36}}>Dr Who Images</Text>
                  {this.state.doctorArr.map(doctor =>
                    { return (
                      <View key={doctor.id}>
                        <Text style={{fontSize:36}}>{doctor.actor_name}</Text>
                        <Image style={{width: 350, height: 350}} source={{uri: doctor.image_url}} />
                      </View>
                    )}
                  )}
          </ScrollView>
        </View>
      );
    }
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
