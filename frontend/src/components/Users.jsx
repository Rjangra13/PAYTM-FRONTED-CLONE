import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button"; 
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users based on filter
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then(response => {
                // Ensure response.data.users is correct
                setUsers(response.data.users || []); // Default to an empty array if users are undefined
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, [filter]);

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.length > 0 ? (
                    users.map(user => <User key={user._id} user={user} />)
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button
                    onClick={() => {
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    }}
                    label={"Send Money"}
                />
            </div>
        </div>
    );
}
