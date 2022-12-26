import './Profile.css'
import background from '../../images/waves-profile.svg'
import { useUserInfo } from '../../hooks/useUserInfo'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export const Profile = () => {
    const [fullUserInfo, setfullUserInfo] = useUserInfo({})
    const {auth} = useContext(AuthContext);
    return (
        <div style = {{backgroundImage: `url(${background})`}}  className="backgound-layer-profile">
            {/* Profile page */}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h1 className="card-title text-center fw-bold">
                                    Profile information
                                </h1>
                                <div className="text-center">
                                    <img
                                        className="img-fluid rounded-circle"
                                        style={{ width: 300, height: 300 }}
                                        src={fullUserInfo.profilePicture}
                                        alt="Profile Pic"
                                    />
                                </div>
                                <hr className="my-4" />
                                <h3 className="card-title text-center ">Username: {fullUserInfo.username}</h3>
                                <h3 className="card-title text-center ">
                                    Email: {fullUserInfo.email}
                                </h3>
                                <h3 className="card-title text-center ">KBPoints: {auth.kbpoints}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}