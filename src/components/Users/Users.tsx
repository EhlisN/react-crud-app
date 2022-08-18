import React, {ChangeEvent, FC, FormEvent, useMemo, useState} from "react";
import { initialUser } from "./initialUser";
import { IUser } from "./IUser";
import { USERS } from "./usersData";

const Users:FC = () => {
    const [users, setUsers] = useState(USERS);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(initialUser);
    const [showUserForm, setShowUserForm] = useState(false);

    const deleteUser = (id: number) => {
        const isDelete = window.confirm('Do you really delete this user?');
        if(isDelete) setUsers(users.filter(user => user.id !== id))
    }

    const searchedUsers = useMemo(() => {
        if(search) {
            return users.filter(user => user.last_name.toLowerCase().includes(search.toLowerCase()) || user.first_name.toLowerCase().includes(search.toLowerCase()));
        }
        return users;
    }, [users, search])

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.id;
        setUser({...user,[field]: event.target.value});
    }

    const addUser = (event: FormEvent) => {
        event.preventDefault();
        setUsers([...users, user]);
        setUser(initialUser);
    }

    return (
        <div className="container">
            <div className="input-group mb-3 mt-3">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input type="text" 
                        className="form-control" 
                        placeholder="Username" 
                        onChange={(event) => setSearch(event.target.value)} />
            </div>
            <button type="submit" 
                    className="btn btn-dark mb-5 d-flex mx-auto"
                    onClick={(event) => setShowUserForm(!showUserForm)}
                >Add new User</button>
            {showUserForm &&
                <form onSubmit={event => addUser(event)}>
                    {Object.keys(user).map(field => {
                        if(field === 'id') return;
                        return <div className="mb-3" key={field}>
                            <label htmlFor={field} className="form-label">{field}</label>
                            <input type="text" 
                                    className="form-control" 
                                    id={field} 
                                    required
                                    value={user[field as keyof Omit<IUser, 'id'>]}
                                    onChange={event => onChange(event)}
                            />
                        </div>
                    })}
                    <button type="submit" className="btn btn-info d-flex mx-auto">Submit</button>
                </form>            
            }

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {users.length 
                ?
                searchedUsers.map(user => {
                    return (
                        <div className="col mb-3 mt-3" key={user.id}>
                            <div className="card h-100">
                                <div className="h-75 img-thumbnail d-flex align-items-center">
                                    <img src={user.avatar} className="card-img-top w-50 rounded mx-auto d-block align-middle" alt="photo" />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                                    <p className="card-text">Email: {user.email}</p>
                                </div>
                                <button type="button" 
                                        className="btn btn-danger"
                                        onClick={() => deleteUser(user.id)}
                                >Delete</button>
                            </div>
                        </div>
                    )
                })
                :
                <h2 className="mx-auto">Users not exist</h2>
                }
            </div>
        </div>
    )
}

export default Users;