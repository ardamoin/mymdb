import React from "react";

const UserContext = React.createContext({
    id: '',
    email: '',
    username: '',
    setUser : () => {}
})

export default UserContext;