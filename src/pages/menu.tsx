import './menu.css';
import { useState } from "react";
import { Card } from '../components/Card/card';
import { useUserData } from '../hooks/listUserData';
import deleteUserData from '../hooks/deleteUserData';

export function MenuInitial() {
    const { data } = useUserData();
    const deleteUser = deleteUserData();
    const [search, setSearch] = useState('');

    const users = data?.filter(user => user.name.toUpperCase().includes(search.toUpperCase()))

    const handleDeleteUser = (cdUser: number) => {
        deleteUser(cdUser);
    };

    return (
        <div className='container'>
            <div className='search-space'>
                <div className='input-search'>
                    <input className='input-searchbar' type='search' placeholder='Pesquisa' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className='scrollable'>
                <div className='dashboard'>
                    <div className='card-grid'>
                        {users?.map(userData =>
                            <Card
                                birthday={userData.birthday}
                                image={userData.image}
                                name={userData.name}
                                cdUser={userData.cdUser}
                                onDelete={() => handleDeleteUser(userData.cdUser)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
