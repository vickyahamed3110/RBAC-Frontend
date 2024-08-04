const backendURL = import.meta.env.VITE_BACKEND_URL

const storeData =async (userData) => {
    const response = await fetch (`${backendURL}/register`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers: {
        "Content-Type": "application/json; charset=utf-8"
        }
    })
    return await response.json()
}

const loginData =async (userData) => {
    const response = await fetch (`${backendURL}/login`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers: {
        "Content-Type": "application/json; charset=utf-8"
        }
    })
    return await response.json()
}

// const forgetPassword =async (userData) => {
//     console.log(userData);
//     try {
//         const response = await fetch (`${backendURL}/forgetPassword`,{
//             method:"POST",
//             body:JSON.stringify(userData),
//             headers: {
//             "Content-Type": "application/json; charset=utf-8"
//             }
//         })
//         return await response.json()
//     }
     
//     catch (error) {
//       console.log(error);  
//     }}

    const getUserData = async () => {
        const response = await fetch (`${backendURL}/users`,{
         headers:{"Authorization":localStorage.getItem("role")} 
        })
        return await response.json()
    }

    const getAdminData = async () => {
        const response = await fetch (`${backendURL}/admin`,{
        headers:{"Authorization":localStorage.getItem("role")} 
        })
        return await response.json()
    }

    const deleteUserData = async (email) => {
        const response = await fetch (`${backendURL}/users/${email}`,{
        method:"DELETE",
        headers:{"Authorization":localStorage.getItem("role")}
        })
        return await response.json()
    }

    const assignRole = async(userData) =>{
        console.log( userData)
        const response = await fetch (`${backendURL}/users`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{"Authorization":localStorage.getItem("role"),
            "Content-Type":"application/json; charset=utf-8"
        }
        })
        return await response.json()
    }

    const changeForm = async(userData) =>{
        const response = await fetch (`${backendURL}/change-form`,{
            method:"PUT",
            body:JSON.stringify(userData),
            headers:{"Authorization":localStorage.getItem("role"),
                "Content-Type":"application/json; charset=utf-8"
            }
            })
            return await response.json()  
    }
    
export {storeData, loginData, getUserData, getAdminData, deleteUserData, assignRole, changeForm}