import React, { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import "./userprofile.css";
import { storage } from "../../utils/constants/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import MenuBar from "../../layout/MenuBar";
export const UserContext = createContext();
const { Title, Text } = Typography;
const UserProfile = (props) => {
  const imageListRef = ref(storage, "images/");
  const [isOpen, setIsOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
          alert("Image uploaded");
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("Image upload failed");
      });
  };
  return (
    <>
      {/* <UserContext.Provider value={props.name} >
        <MenuBar name={props.name} />
      </UserContext.Provider> */}
      <section>
        <nav>
          <Link className="user-link" to={"/dashboard"}>
            Dashboard
          </Link>
        </nav>
        <div className="user-data">
          <Title className="hero-title typography">{props.title}</Title>
          {imageList ? (
            <div className="img-conatainer">
              <img
                className="img"
                onClick={openModal}
                src={imageList}
                alt={props.img}
              />
              {isOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <span onClick={closeModal} className="close-button">
                      &times;
                    </span>
                    <input
                      type="file"
                      className="file-container"
                      onChange={(e) => {
                        setImageUpload(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="img-conatainer">
              <img
                className="img"
                src={props.defaultImage}
                alt={props.img}
                onClick={openModal}
              />
              {isOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <span onClick={closeModal} className="close-button">
                      &times;
                    </span>
                    <input
                      type="file"
                      className="file-container"
                      onChange={(e) => {
                        setImageUpload(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          <Title className="hero-name typography">{props.name}</Title>
          <div className="hero-status">
            <div className="status-tasks typograhy">
              <Text className="user-status">{props.tasks}</Text>
              <Text className="status-name">Tasks</Text>
            </div>
            <div className="status-tasks rect typograhy">
              <Text className="user-status">{props.team}</Text>
              <Text className="status-name">Team</Text>
            </div>
            <div className="status-tasks rect typograhy">
              <Text className="user-status">{props.completedTasks}</Text>
              <Text className="status-name">Completed Tasks</Text>
            </div>
          </div>
          <Button className="hero-button" onClick={uploadImage}>
            Upload new avatar
          </Button>
        </div>
      </section>
    </>
  );
};
UserProfile.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  tasks: PropTypes.number,
  team: PropTypes.number,
  completedTasks: PropTypes.number
};

UserProfile.defaultProps = {
  title: "Profile",
  img: "image",
  name: "Khusan Akhmedov",
  tasks: 21,
  team: 238,
  completedTasks: 101
  // defaultImage:
  //   "https://cdn.iconscout.com/icon/free/png-512/avatar-380-456332.png", // Provide a default image path
};
export default UserProfile;
