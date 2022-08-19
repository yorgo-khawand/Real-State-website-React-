import { useEffect, useState } from "react";
import MDSpinner from "react-md-spinner";
const appID = "21290217e165b82d";
const region = "eu";
const AUTH_KEY = "9a02295784f643b6bcd1d103b726c5e91b573e72";
const wid = "2657bf0c-139d-4da6-bb68-aba5783e74fc";

const Client = () => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(true);
    window.CometChatWidget.init({
      appID: appID,
      appRegion: region,
      authKey: AUTH_KEY,
    }).then((response) => {
      console.log("Initialization completed successfully");
      //You can now call login function.
      let uid = localStorage.getItem("cc-uid");
      if (uid === null) {
        // create new user
        const uid = "user" + new Date().getSeconds().toString();
        const user = new window.CometChatWidget.CometChat.User(uid);
        user.setName(uid);
        window.CometChatWidget.createOrUpdateUser(user).then((user) => {
          // Proceed with user login
          window.CometChatWidget.login({
            uid: uid,
          }).then((loggedInUser) => {
            localStorage.setItem("cc-uid", loggedInUser.uid);
            // Proceed with launching your Chat Widget
            window.CometChatWidget.launch({
              widgetID: wid,
              roundedCorners: "true",
              docked: "true",
              height: "300px",
              width: "400px",
              
              defaultID: "12345678",
              defaultType: "user", //user or group
            });
            setLoad(false);
          });
        });
      } else {
        window.CometChatWidget.login({
          uid: uid,
        }).then((user) => {
          window.CometChatWidget.launch({
            widgetID: wid,
            roundedCorners: "true",
            docked: "true",
            height: "300px",
            width: "400px",
            defaultID: "12345678",
            defaultType: "user", //user or group
          });
          setLoad(false);
        });
      }
    });
  }, []);
  if (load) {
    return (
      <div className="container">
        <MDSpinner />
      </div>
    );
  }
  return <div className="App"></div>;
};
export default Client;