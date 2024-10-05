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

const getUserData = async () => {
        const response = await fetch (`${backendURL}/users`,{
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

    const getRequestData = async () => {
        const response = await fetch (`${backendURL}/request`,{
            headers:{"Authorization":localStorage.getItem("role")}
        })
        return await response.json()
    }

    const acceptApi = async(email) =>{
        const response = await fetch (`${backendURL}/accept/${email}`,{
            method:"PUT",
            headers:{"Authorization":localStorage.getItem("role"),
                "Content-Type":"application/json; charset=utf-8"
            }
            })
            return await response.json()  
    }

    const rejectApi = async(email) =>{
        const response = await fetch (`${backendURL}/reject/${email}`,{
            method:"PUT",
            headers:{"Authorization":localStorage.getItem("role"),
                "Content-Type":"application/json; charset=utf-8"
            }
            })
            return await response.json()  
    }

    const getLoggedUserData = async(email) => {
        const response = await fetch (`${backendURL}/loguser/${email}`, {
        })
        return await response.json()
    }


    
export {storeData, loginData, getUserData, deleteUserData, assignRole, changeForm, getRequestData, acceptApi, rejectApi, getLoggedUserData}