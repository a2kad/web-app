import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Button, View, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'



const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try{
            const reponse = await signInWithEmailAndPassword(auth, email,password);
            console.log(reponse);
            
        } catch (error) {
            console.log(error);
            alert('Sign In faled : '+error.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try{
            const reponse = await createUserWithEmailAndPassword(auth, email,password);
            console.log(reponse);
            alert('Check your emails!');
        } catch (error) {
            console.log(error);
            alert('Sign Up faled : '+error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
        <View style={styles.top} >
            <Text>
            Bienvenue sur WebSolidarité App
            </Text>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
        {
            loading ? <ActivityIndicator size="large" color="#0000ff" />
            : <>
            <Button title='Login' onPress={signIn} />
            <Button title='Create Account' onPress={signUp} />
            </>
        }
        </KeyboardAvoidingView>
    </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    top: {
        marginHorizontal:20,

    },
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent:'center',
    },
    input: {
        marginVertical: 4,
        height:50,
        borderWidth:1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    }
})