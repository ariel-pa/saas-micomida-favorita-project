import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import { auth } from '../config/firebase';
import { validateEmail } from '../helpers/validators/email'
import { validatePassword, validateConfirmPassword } from '../helpers/validators/password'

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleRegister = async () => {
        validateForm();
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            Toast.show({
                type: 'success',
                text1: 'Registro exitoso',
                text2: 'Bienvenido',
                position: 'top'
            });
            navigation.replace('Home');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error al registrarse',
                // text2: error.message,
                position: 'top'
            });
            // setError('Error al registrarse: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

        setFormErrors({
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
        });

        if (emailError || passwordError || confirmPasswordError) {
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Registro</Text>
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
            <Input
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text);
                    setFormErrors((prev) => ({
                        ...prev,
                        confirmPassword: validateConfirmPassword(text, password),
                    }));
                }}
                secureTextEntry
                errorMessage={formErrors.confirmPassword}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (<Button
                title="Registrarse"
                onPress={handleRegister}
                containerStyle={styles.button}
                disabled={isLoading}
            />)}

            <Button
                title="Volver al Login"
                type="outline"
                onPress={() => navigation.navigate('Login')}
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