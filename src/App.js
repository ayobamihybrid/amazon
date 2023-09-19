import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigations/StackNavigator';
import ToastManager from 'toastify-react-native';
import store from './redux/store';
import { Provider, useDispatch } from 'react-redux';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
          <ModalPortal />
          <ToastManager
            style={{
              height: 70,
              width: '100%'
            }}
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            animationStyle="rightInOut"
          />
        </UserContext>
      </Provider>
    </>
  );
}
