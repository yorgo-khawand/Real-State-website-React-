import { useEffect, useState } from "react";
import MDSpinner from "react-md-spinner";
const appID = "21290217e165b82d";
const region = "eu";
const AUTH_KEY = "9a02295784f643b6bcd1d103b726c5e91b573e72";
const agentUID = "12345678";
const wid = "e0cbb52d-06da-4495-a884-cac62e5451bd";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.CometChatWidget.init({
      appID: appID,
      appRegion: region,
      authKey: AUTH_KEY,
    }).then(
      (response) => {
        console.log("Initialization completed successfully");
        //You can now call login function.
        window.CometChatWidget.login({
          uid: agentUID,
        }).then(
          (response) => {
            window.CometChatWidget.launch({
              widgetID: wid,
              target: "#cometchat",
              roundedCorners: "true",
              height: "600px",
              width: "100%",
              defaultID: "user17", //default UID (user) or GUID (group) to show,
              defaultType: "user", //user or group
            });
            setLoading(false);
          },
          (error) => {
            console.log("User login failed with error:", error);
            //Check the reason for error and take appropriate action.
          }
        );
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        //Check the reason for error and take appropriate action.
      }
    );
  }, []);
  if (loading) {
    return (
      <div>
        <MDSpinner />
      </div>
    );
  }
  return <div id="cometchat" style={{ margin: "0 auto", width: "60%" }} />;
};
export default Admin;