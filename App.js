import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { api } from './component/api';
import axios from 'axios';

export default function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList()

  }, [])
  const getList = async () => {
    await axios.get(api)
      .then((res) => {
        setList(res.data.results);
      })
  }
  const showImage = (url) => {
    let link = "https://image.tmdb.org/t/p/w342/"
    return link + url
  }
  const getDate = (date) => {
    let number = date; // Số ban đầu
    let numberString = number.toString(); // Chuyển số thành chuỗi
    let firstFourDigits = numberString.substring(0, 4); // Lấy 4 ký tự đầu
    return firstFourDigits;
  }

  const getVote1 = (vote1) => {
    let number = vote1; // Số ban đầu
    let numberString = number.toString(); // Chuyển số thành chuỗi
    let firstFourDigits = numberString.substring(0, 1); // Lấy 4 ký tự đầu
    return firstFourDigits;
  }
  const getVote2 = (vote2) => {
    let number = vote2; // Số ban đầu
    let numberString = number.toString(); // Chuyển số thành chuỗi
    let firstFourDigits = numberString.substring(1, 3); // Lấy 4 ký tự đầu
    return firstFourDigits;
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <Image source={require('../Test1/img/back.png')} style={{ width: 25, height: 25 }} />
          <Text style={{ fontSize: 20 }}>Back</Text>
        </View>

        <Text style={{ marginTop: 30, fontSize: 20, fontWeight: '500', color: '#C0C0C0', marginLeft: 10 }}>Popular list</Text>
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', marginTop: 40 }}>
          {
             list.map((item, index) => {
              return (
                <View key={item.id} style={{ width: '50%', padding: 10, height: 300 }}>

                  <ImageBackground source={{ uri: showImage(item.poster_path) }} resizeMode="cover" style={styles.image}>
                    <View style={styles.viewtop}>
                      <Text></Text>
                      <View style={styles.NumberVote}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>{getVote1(item.vote_average)}</Text>

                        <Text style={{ color: '#fff' }}>{getVote2(item.vote_average)}</Text>
                      </View>

                    </View>
                    <View style={styles.viewcenter}>
                      <Text></Text>
                    </View>
                    <View style={styles.viewbottom}>
                      <Text style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{getDate(item.release_date)}</Text>
                      <Text style={styles.titlee}>{item.title}</Text>
                    </View>
                  </ImageBackground>
                </View>
              )
            })
          }
        </View>

      </ScrollView>

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  viewtop: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

  },
  viewcenter: {
    width: '100%',
    height: 155,
  },
  viewbottom: {
    width: '100%',
    height: 75,
    padding: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'

  },
  NumberVote: {
    margin: 12,
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: "#FF6347",
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titlee: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'left',
    textTransform: 'uppercase',
  }
});
