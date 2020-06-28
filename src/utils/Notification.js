
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import "animate.css"


let Notification = (title, message, type ) => {
    store.addNotification({
        title: title,
        message: message,
        type: type,
        container: "top-left",
        insert: "top",
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],

        dismiss: {
            duration: 1500,
            showIcon: true
        },
        width: 400
    });
}

export default Notification;