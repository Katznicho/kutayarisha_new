import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import DefaultNavbar from "components/DefaultNavbar";
import SimpleFooter from "components/SimpleFooter";
import Page from "components/login/Page";
import Container from "components/login/Container";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Register() {
  //email state
  const [email, setEmail] = useState("");
  //password state
  const [password, setPassword] = useState("");
  //confirm password state
  const [confirmPassword, setConfirmPassword] = useState("");
  //name state
  const [names, setNames] = useState("");
  //phone state
  const [phone, setPhone] = useState("");
  //loading
  const [loading, setLoading] = useState(false);
  //use history hook
  const history = useHistory();

  const handleSubmit = async () => {
    //alert the email and password
    //alert(`Email: ${email} Password: ${password} Confirm Password: ${confirmPassword} Names: ${names} Phone: ${phone}`);
    //check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    //check if email is valid
    // if(!validateEmail(email)){
    //   dispatch(createMessage("Email is not valid", "invalid_email"));
    //   return;
    // }
    //check for empty fields
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      names === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    //check if phone number is 10 digits
    if (phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }
    if (email && password && confirmPassword && names && phone) {
      setLoading(true);

      const userInfo = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        names: names,
        phone: phone,
      };
      //dispatch(create_user(userInfo));
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        //

        if (userCredential) {
          //user is logged in
          //get the user id
          const user = userCredential.user;
          //create a user document
          const userRef = doc(db, "users", user.uid);
          //set the user document
          await setDoc(userRef, {
            names: names,
            email: email,
            phone: phone,
            createdAt: serverTimestamp(),
            photoURL: user.photoURL,
            verified: false,
            isAdmin: false,
            subcriptionPlan: "free",
            password: password,
          });
          //redirect to dashboard
          //store the uid in localstorage
          localStorage.setItem("uid", user.uid);
          //store the email in localstorage
          localStorage.setItem("email", email);
          //store the name in localstorage
          localStorage.setItem("name", names);
          //store the user phone number in localstorage
          localStorage.setItem("phone", phone);
          //store isAdmin in localstorage
          localStorage.setItem("isAdmin", false);
          history.push("/dashboard");
          setLoading(false);
          window.location.href = "/dashboard";
        }
      } catch (error) {}
    } else {
      alert("Please fill in all fields");
    }
  };
  return (
    <Page>
      <Container>
        <Card>
          <CardHeader color="lightBlue">
            <H5 color="white" style={{ marginBottom: 0 }}>
              Register
            </H5>
          </CardHeader>

          <CardBody>
            <div className="mb-10 px-4">
              <InputIcon
                type="text"
                color="lightBlue"
                placeholder="Full Name"
                iconName="account_circle"
                value={names}
                onChange={(e) => setNames(e.target.value)}
              />
            </div>
            <div className="mb-10 px-4">
              <InputIcon
                type="email"
                color="lightBlue"
                placeholder="Email Address"
                iconName="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-10 px-4">
              <InputIcon
                type="text"
                color="lightBlue"
                placeholder="Phone Number"
                iconName="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4 px-4">
              <InputIcon
                type="password"
                color="lightBlue"
                placeholder="Password"
                iconName="lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 px-4">
              <InputIcon
                type="password"
                color="lightBlue"
                placeholder="Confirm Password"
                iconName="lock"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex justify-center">
              <Button
                color="lightBlue"
                buttonType="link"
                size="lg"
                ripple="dark"
                onClick={handleSubmit}
              >
                {loading ? <Loader /> : "Register"}
              </Button>
            </div>
          </CardFooter>
          <CardFooter>
            <NavLink
              to="/login"
              exact
              className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
            >
              Already Have An account? Login
            </NavLink>
          </CardFooter>
        </Card>
      </Container>
    </Page>
  );
}
