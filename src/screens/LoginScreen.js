import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';


import { auth } from '../config/firebase';
import { validateEmail } from '../helpers/validators/email'
import { validatePassword } from '../helpers/validators/password'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async () => {
        if (validateLoginForm()) {
            setIsLoading(true);
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                navigation.replace('Home');
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error de acceso.',
                    text2: error.message,
                    position: 'top'
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const validateLoginForm = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setFormErrors({
            email: emailError,
            password: passwordError,
        });

        if (emailError || passwordError) {
            return false;
        }

        return true;
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Mi Comida Favorita</Text>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    setFormErrors((prev) => ({ ...prev, email: validateEmail(text) }));
                }}
                autoCapitalize="none"
                errorMessage={formErrors.email}
            />
            <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setFormErrors((prev) => ({ ...prev, password: validatePassword(text) }));
                }}
                secureTextEntry
                errorMessage={formErrors.password}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button
                    title="Iniciar Sesión"
                    onPress={handleLogin}
                    containerStyle={styles.button}
                    // disabled={!email || !password}
                    disabled={isLoading}
                />
            )}
            <Button
                title="Registrarse"
                type="outline"
                onPress={() => navigation.navigate('Register')}
                containerStyle={styles.button}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        marginVertical: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});
