// src/pages/LoginForm.tsx
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonIcon,
} from '@ionic/react';
import { useState } from 'react';
import { login, getProfile } from '../services/authService';
import {
  personOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import './LoginForm.css';
import React from 'react';
const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [profileMessage, setProfileMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      setToken(token);
      const message = await getProfile(token);
      setProfileMessage(message);
    } catch (error) {
      console.error('Login failed:', error);
      setToken('');
      setProfileMessage('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
        <div className="login-container">
          {/* Logo và khẩu hiệu */}
          <div className="logo-container">
            <div className="logo-placeholder">Logo</div>
            <div className="app-name">
              MEBI <span>application</span>
            </div>
            <h2 className="slogan-bold">Khẩu hiệu của app</h2>
            <h3 className="slogan-mini">khẩu hiệu mini</h3>
            {token && (
              <p
                style={{
                  fontSize: '12px',
                  color: 'green',
                  textAlign: 'center',
                }}
              >
                Đăng nhập thành công! Token: {token}
              </p>
            )}
            {profileMessage && (
              <p
                style={{ fontSize: '12px', color: 'gray', textAlign: 'center' }}
              >
                {profileMessage}
              </p>
            )}
          </div>

          {/* Input - Username */}
          <IonItem className="custom-input">
            <IonIcon
              icon={personOutline}
              slot="start"
              className="icon-centered"
            />
            <IonInput
              placeholder="Tên đăng nhập"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              className="custom-ion-input"
            />
          </IonItem>

          {/* Input - Password */}
          <IonItem className="custom-input">
            <IonIcon
              icon={lockClosedOutline}
              slot="start"
              className="icon-centered"
            />
            <IonInput
              placeholder="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              className="custom-ion-input"
            />
            <IonIcon
              icon={showPassword ? eyeOffOutline : eyeOutline}
              slot="end"
              className="icon-centered eye-icon"
              onClick={togglePasswordVisibility}
            />
          </IonItem>

          {/* Nút Đăng nhập / Đăng ký */}
          <div className="button-row">
            <IonButton
              expand="block"
              className="half-button"
              onClick={handleLogin}
            >
              Đăng Nhập
            </IonButton>
            <IonButton expand="block" className="half-button">
              Đăng Ký
            </IonButton>
          </div>
        </div>

        {/* "Quên mật khẩu?" */}
        <div className="forgot-password">
          <span>Quên mật khẩu?</span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginForm;
