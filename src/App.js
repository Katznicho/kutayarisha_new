import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import Settings from 'pages/Settings';
import Tables from 'pages/Tables';
import Maps from 'pages/Maps';
import Footer from 'components/Footer';
// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import Login from 'pages/Login';
import Register from 'pages/Register';
//import useEffect from 'react';
import { useEffect , useState } from 'react';
import CheckOut from 'pages/Checkout';

function App() {
    //check if uid exists in local storage
    const [uid, setUid] = useState();
    useEffect(() => {
        //check if uid exists in local storage
        const uid = localStorage.getItem("uid");
        if (uid) {
            setUid(localStorage.getItem('uid'));
        }
        else {
            setUid(null);
        }
        //setUid(localStorage.getItem('uid'));
    }, [uid]);
    return uid==null?
    (
         //create a switc
         <Switch>
        
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            
            <Redirect from="/" to="/login" />
            {/* <Redirect from="*" to="/" /> */}
         </Switch>

    ):
    (
        <>
           
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/tables" component={Tables} />
                    <Route exact path="/maps" component={Maps} />
                    <Route exact path="/checkout" component={CheckOut} />
                    
                    <Redirect from="/" to="/dashboard" />
                </Switch>
                {/* <Footer /> */}
            </div>
        </>
    );
}

export default App;
