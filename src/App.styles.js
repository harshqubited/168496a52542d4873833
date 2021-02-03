import {Dimensions, StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  bg: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: '10%',
    alignItems: 'center',
  },
  btn: {
    alignSelf: 'center',
    marginVertical: '2%',
    width: Dimensions.get('window').width * 0.4,
    justifyContent: 'center',
  },
  link: {
    color: '#0000ff',
    textDecorationLine: 'underline',
  },
});

export default Styles;
