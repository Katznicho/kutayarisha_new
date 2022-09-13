import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Checkbox from "@material-tailwind/react/Checkbox";
import Button from "@material-tailwind/react/Button";
import DefaultNavbar from "components/DefaultNavbar";
import SimpleFooter from "components/SimpleFooter";
import Page from "components/login/Page";
import Container from "components/login/Container";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase";
import Loader from "components/Loading";

export default function Login() {
  const history = useHistory();
  //email and password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //loading state
    const [loading, setLoading] = useState(false);
  //login function
  const login_user = async () => {
    //check if email and password are empty
    try {
      if (email === "" || password === "") {
        alert("Please fill in all fields");
      } else {
         setLoading(true);

        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        //console.log("userCredential", userCredential);
        const colRef = doc(db, "users", userCredential.user.uid);
        const results = await getDoc(colRef);
        //store the uid in localstorage
        localStorage.setItem("uid", userCredential.user.uid);
        //store the email in localstorage
        localStorage.setItem("email", email);
        //store the name in localstorage
        localStorage.setItem("name", results.data().name);
        //store the user phone number in localstorage
        localStorage.setItem("phone", results.data().phone);
        //store isAdmin in localstorage
        localStorage.setItem("isAdmin", results.data().isAdmin);
        history.push("/dashboard");
        setLoading(false);
        window.location.href = "/dashboard";
        //alert("Login successful");
      }
    } catch (error) {
        setLoading(false);
      alert(error.message);
    }
  };

  //send request to server

  return (
    <Page>
      <Container>
        <Card>
          <CardHeader color="lightBlue">
            <H5 color="white" style={{ marginBottom: 0 }}>
              Login
            </H5>
          </CardHeader>

          <CardBody>
            <div className="mb-12 px-4 bg-bb">
              <InputIcon
                type="email"
                color="lightBlue"
                placeholder="Email Address"
                iconName="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-8 px-4">
              <InputIcon
                type="password"
                color="lightBlue"
                placeholder="Password"
                iconName="lock"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 px-4">
              <Checkbox color="lightBlue" text="Remember Me" id="remember" />
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex justify-center bg-bb">
              <Button
                color="lightBlue"
                buttonType="link"
                size="lg"
                ripple="dark"
                onClick={login_user}
              >
                        {loading ? <Loader /> : "login"}
              </Button>
            </div>
          </CardFooter>
          <CardFooter>
            <div className="flex justify-center bg-bb">
              <NavLink
                to="/register"
                exact
                className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
              >
                Dont Have an Account? Register
              </NavLink>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </Page>
  );
}
