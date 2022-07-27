/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';

const signUpTemplate = {
  name: {value: '', error: ''},
  email: {value: '', error: ''},
  phone: {value: '', error: ''},
  password: {value: '', error: ''},
  confirmPassword: {value: '', error: ''},
};

const App = () => {
  const [signUpForm, setSignUpForm] = useState({...signUpTemplate});
  const [loading, setLoading] = useState(false);

  const handleFormError = (key: string, value: string) => {
    let error = '';
    if (key === 'name') {
      if (value.length < 3) {
        error = 'Name must be atleast 3 characters long';
      }
    } else if (key === 'email') {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        error = 'Invalid Email';
      }
    } else if (key === 'phone') {
      if (value.length !== 10) {
        error = 'phone number must be 10 characters long only';
      }
    } else if (key === 'password') {
      if (value.length < 6) {
        error = ' password must be atleast 6 characters long';
      }
    } else if (key === 'confirmPassword') {
      if (value !== signUpForm.password.value) {
        error = 'password does not match';
      }
    }
    return error;
  };

  const handleForm = (key: string, value: 'string') => {
    let currentSignUpForm: any = {...signUpForm};

    currentSignUpForm[key]['value'] = value;
    currentSignUpForm[key]['error'] = handleFormError(key, value);

    setSignUpForm(currentSignUpForm);
  };

  const extractFromData = () => {
    let data: any = {};
    Object.entries(signUpForm).forEach(([key, value]) => {
      data[key] = value.value;
    });
    delete data['confirmPassword'];
    return data;
  };

  const postUser = async (data: any) => {
    try {
      const res = axios.post('http://localhost:3000/users', data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': 'dnjhwgcyhdgschjbsdhcgbjs',
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async () => {
    console.log('handleSubmit_signupForm', signUpForm);

    let data = extractFromData();
    console.log('extracted_Data', data);
    setLoading(true);
    try {
      const response: any = await postUser(data);
      // console.log('handleSubmit- response', response);
      if (response.status === 200) {
        Alert.alert('Success', 'user created successfully');
        setLoading(false);
      } else {
        throw response;
      }
    } catch (error: any) {
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Error:', error.message);
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'#000'}
          style={{marginVertical: 70, marginHorizontal: 40}}
        />
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={signUpForm.name.value}
            onChangeText={text => handleForm('name', text)}
            placeholderTextColor="#808080"
          />
          <Text style={styles.error}>{signUpForm.name.error}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={signUpForm.email.value}
            onChangeText={text => handleForm('email', text)}
            placeholderTextColor="#808080"
          />
          <Text style={styles.error}>{signUpForm.email.error}</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={signUpForm.phone.value}
            onChangeText={text => handleForm('phone', text)}
            placeholderTextColor="#808080"
          />
          <Text style={styles.error}>{signUpForm.phone.error}</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={signUpForm.password.value}
            onChangeText={text => handleForm('password', text)}
            placeholderTextColor="#808080"
          />
          <Text style={styles.error}>{signUpForm.password.error}</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={signUpForm.confirmPassword.value}
            onChangeText={text => handleForm('confirmPassword', text)}
            placeholderTextColor="#808080"
          />
          <Text style={styles.error}>{signUpForm.confirmPassword.error}</Text>

          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => handleSubmit()} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
  },
  heading: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    color: '#000',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#aaa',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  btnContainer: {
    width: 150,
    alignSelf: 'center',
    marginTop: 30,
  },
  error: {
    marginBottom: 5,
    marginHorizontal: 3,
    color: 'red',
  },
});

export default App;
