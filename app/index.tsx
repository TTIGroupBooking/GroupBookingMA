import {Redirect} from 'expo-router';

const StartPage = () => {
    return <Redirect href="/Home" />;
};

export default StartPage;




// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import Tabs from "../components/navigation/tabbs";


// const App = () => {
//     return(
//         <NavigationContainer independent = {true}>
//              <Tabs />
//         </NavigationContainer>
//     );
// }

// export default App;