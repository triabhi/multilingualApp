import React, { useState, useRef } from 'react'
import { View, Text, Image, FlatList, TouchableWithoutFeedback, Modal, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native'
import { NavigationBar } from 'navigationbar-react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';

const Profile = (props) => {

  const [imageArr, setImageArr] = useState([])
  const [modal, setModal] = useState(false)
  const { t, i18n } = useTranslation();
  const dropdownGender = useRef(null)
  const genderArray = [
    { value: "m", label: "Male" },
    { value: "f", label: "Female" },
    { value: "n", label: "Non binary" },
  ]
  const age = [
    { label: "18-24", value: "18" },
    { label: "25-30", value: "25" },
    { label: "31-36", value: "31" },
    { label: "37-45", value: "37" },
    { label: "45", value: "37+" },
  ]
  const constellations = [
    { label: "Aries", value: "Aries" },
    { label: "Tauras", value: "Taurus" },
    { label: "Gemini", value: "Gemini" },
    { label: "Cancer", value: "Cancer" },
    { label: "Leo", value: "Leo" },
    { label: "Scorpion", value: "Scorpion" },
    { label: "Saggitarius", value: "Saggitarius" },
    { label: "Capricorn", value: "Capricorn" },
    { label: "Aquarius", value: "Aquarius" },
    { label: "Pisces", value: "Pisces" }
  ]

  const [currentLanguage, setLanguage] = useState('en');
  const [gender, setGender] = useState('')
  const [value, setValue] = useState('')
  const [name, setName] = useState(null)
  const [sign, setSign] = useState(null)
  const [address, setAddress] = useState('')
  const [addressHeight, setAddressHeight] = useState(50)
  const [school, setSchool] = useState('')
  const [occ, setOcc] = useState(null)

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const wsUploadImage = (type, imageData) => {
    
    let formData = new FormData();
    const fileName = imageData.uri;
    const mimeType = (type == 'photo') ? imageData.type : 'video/mp4'
    formData.append("file", { uri: imageData.uri, name: fileName, type: mimeType, mimetype: mimeType });
  }
  const renderItem = ({ item }) => {
    
    return <View style={{ marginRight: 10, }}>
      <Image source={{ uri: item.assets[0].uri }}
        style={{ height: 200, width: 200, borderRadius: 5 }} />
      <TouchableWithoutFeedback onPress={() => {
        const images = imageArr.filter(i => i != item)
        setImageArr(images)
      }}>
        <Image source={require('../../assets/close.png')}
          style={{ width: 25, height: 25, position: 'absolute', top: 10, right: 10 }} />
      </TouchableWithoutFeedback>
    </View>
  }
  const ComponentLeft = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <Text style={{ color: 'black', fontSize: 20 }}>{t('photos')}{' '}</Text>
      </View>
    );
  };

  const ComponentRight = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setModal(true)}>
        <View style={{ padding: 15 }}>
          <Text style={{ color: 'black', fontSize: 20 }}>{t('language')}{' '}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const UploadMedia = (mediaType) => {
    launchImageLibrary({ mediaType: mediaType, durationLimit: 20, maxWidth: 1080, maxHeight: 1920 }, (response) => {
      // console.log(response)
      if (response.didCancel) {

      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {

      } else {
        const images = [...imageArr]
        images.push(response)
        wsUploadImage(mediaType, response)
        
        setImageArr(images)
      }

    })
    // }
  }
  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        navigationBarStyle={{ backgroundColor: 'transparent' }}
        componentLeft={() => <ComponentLeft />}
        componentCenter={() => <View />}
        componentRight={() => <ComponentRight />}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginVertical: 0, width: '16.70%', height: 2 }} /></View>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 15, color:'black' }}>{t('listing')}{' '}</Text>
        <FlatList
          style={{ marginTop: 20, flexGrow: 0 }}
          data={imageArr}
          horizontal={true}
          renderItem={renderItem} />
        <TouchableWithoutFeedback onPress={() => {

          UploadMedia('photo')

        }}>
          <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Image source={require('../../assets/capture.png')}
              style={{ width: 40, height: 40, marginRight: 10 }} />
            <Text style={{ fontSize: 15, color:'black' }}>{t('upload')}{' '}</Text>

          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={[{ flex: 1, padding: 10 }]}>
        <ScrollView style={[{ flex: 1, padding: 10 }]}>

          <View style={styles.profileItem}>
            <Text style={[styles.grayText, { flex: 1 }]}>{t('name')}{' '}</Text>
            <TextInput style={[styles.blueText, { flex: 1, textAlign: 'right', }]}
              placeholder={'Name'}
              value={name}
              onChangeText={(name) => {
                setName(name)
              }} />
          </View>
          <View style={styles.profileItem}>
            <Text style={[styles.grayText, { flex: 1 }]}>{t('age')}{' '}</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{color: 'black'}}
              activeColor={"black"}
              data={age}
              maxHeight={50}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
          <View style={styles.profileItem}>
            <Text style={[styles.grayText, { flex: 1 }]}>{t('gender')}{' '}</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              activeColor={"black"}
              iconStyle={styles.iconStyle}
              data={genderArray}
              maxHeight={50}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={gender}
              onChange={item => {
                setGender(item.value);
              }}
            />
          </View>
          <View style={styles.profileItem}>
            <Text style={[styles.grayText, { flex: 1 }]}>{t('const')}{' '}</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              activeColor={"black"}
              data={constellations}
              itemTextStyle={{color: 'black'}}
              maxHeight={50}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={sign}
              onChange={item => {
                setSign(item.value);
              }}
            />
          </View>
          <View style={[styles.profileItem, Platform.OS === "android" ? { height: addressHeight } : { height: addressHeight + 20 }]}>
            <Text style={[styles.grayText, { flex: 1 }]}>{t('home')}{' '}</Text>
            <TextInput style={[styles.blueText, Platform.OS === "android" ? { flex: 1, textAlign: 'right', } : { flex: 0.5, textAlign: 'right', }]}
              placeholder={'Hometown'}
              value={address}
              multiline={true}
              onContentSizeChange={(event) => {
                setAddressHeight(event.nativeEvent.contentSize.height)
              }}
              onChangeText={(address) => {
                setAddress(address)
              }} />
          </View>
          <View style={[styles.profileItem, Platform.OS === "android" ? { height: addressHeight } : { height: addressHeight + 20 }]}>
            <Text style={[styles.grayText, { flex: 1 }]}>{t('school')}{' '}</Text>
            <TextInput style={[styles.blueText, Platform.OS === "android" ? { flex: 1, textAlign: 'right', } : { flex: 0.5, textAlign: 'right', }]}
              placeholder={'School'}
              value={school}
              multiline={true}
              onContentSizeChange={(event) => {
                setAddressHeight(event.nativeEvent.contentSize.height)
              }}
              onChangeText={(sch) => {
                setSchool(sch)
              }} />
          </View>
          <View style={[styles.profileItem, Platform.OS === "android" ? { height: addressHeight } : { height: addressHeight + 20 }]}>
            <Text style={[styles.grayText, { flex: 1 }]}>{t('occ')}{' '}</Text>
            <TextInput style={[styles.blueText, Platform.OS === "android" ? { flex: 1, textAlign: 'right', } : { flex: 0.5, textAlign: 'right', }]}
              placeholder={'Occupation'}
              value={occ}
              multiline={true}
              onContentSizeChange={(event) => {
                setAddressHeight(event.nativeEvent.contentSize.height)
              }}
              onChangeText={(occ) => {
                setOcc(occ)
              }} />
          </View>
        </ScrollView>
      </View>
      {modal ? <Modal
        animationType={"fade"}
        transparent={false}
        visible={modal}
        onRequestClose={() => { console.log("Modal has been closed.") }}>
        {/*All views of Modal*/}
        <View style={{ flex: 1 }}>

          <Button title="Click To Close Modal" onPress={() => {
            setModal(!modal)
          }} />
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#33A850' }}>
              {t('hello')}{' '}
            </Text>
            <Pressable
              onPress={() => changeLanguage('en')}
              style={{
                backgroundColor:
                  currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
                padding: 20,
              }}>
              <Text>Select English</Text>
            </Pressable>
            <Pressable
              onPress={() => changeLanguage('hi')}
              style={{
                backgroundColor:
                  currentLanguage === 'hi' ? '#33A850' : '#d3d3d3',
                padding: 20,
              }}>
              <Text>हिंदी का चयन करें</Text>
            </Pressable>
            <Pressable
              onPress={() => changeLanguage('french')}
              style={{
                backgroundColor:
                  currentLanguage === 'french' ? '#33A850' : '#d3d3d3',
                padding: 20,
              }}>
              <Text>Select French</Text>
            </Pressable>
          </View>
        </View>
      </Modal> : null}

    </View >
  )

}

const styles = StyleSheet.create({
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    height: 50
  },
  grayText: {
    color: 'grey',
    fontSize: 15,
  },
  blueText: {
    color: 'blue',
    fontSize: 15,
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: 150,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    color:'black'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})

export default Profile;
