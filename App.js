// import Register from './components/Register';
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import Home from './screens/HomeScreen';
import Users from './screens/User/UsersScreen';
import User from './screens/User/UserScreen';
import Horses from './screens/Horse/HorsesScreen';
import Horse from './screens/Horse/HorseScreen';
import Reports from './screens/Reports/ReportsScreen';
import UserSettings from './screens/SettingsScreen';
import Layout from './screens/Layout';
// import Editor from './components/Editor';
// import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
// import LinkPage from './components/LinkPage';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit'




const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/" element={<Layout />}>

        {/* protected */}
        <Route path="/" element={<RequireAuth loginPath={'/login'}><Home /></RequireAuth>} />
        <Route path="/users" element={<RequireAuth loginPath={'/login'}><Users /></RequireAuth>} />
        <Route path="/user/:id" element={<RequireAuth loginPath={'/login'}><User /></RequireAuth>} />
        <Route path="/user/settings" element={<RequireAuth loginPath={'/login'}><UserSettings /></RequireAuth>} />

        <Route path="/horses" element={<RequireAuth loginPath={'/login'}><Horses /></RequireAuth>} />
        <Route path="/horse/:id" element={<RequireAuth loginPath={'/login'}><Horse /></RequireAuth>} />


        <Route path="/reports" element={<RequireAuth loginPath={'/login'}><Reports /></RequireAuth>} />

      </Route>

      <Route path="*" element={<Missing />} />

    </Routes>
  );
}

export default App;