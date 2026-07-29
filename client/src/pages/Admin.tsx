import { useAuth } from "../context/AuthContext"

const Admin = () => {
       const { user } = useAuth()
       // console.log("user from auth context",user)
       return (
              <div>
                     this is admin
              </div>
       )
}

export default Admin
